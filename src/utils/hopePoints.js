const HOPE_POINTS_KEY = "hopePoints";
import { getCurrentUser, updateCurrentUser } from "./auth.js";
import { createNotification } from "./notificationStorage";
import { REWARD_MILESTONE } from "./rewardClaims";

export const HOPE_POINTS_UPDATED = "hopePointsUpdated";

const readHopePoints = () => {
  try {
    const records = JSON.parse(localStorage.getItem(HOPE_POINTS_KEY));
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error("Unable to read hope points.", error);
    return [];
  }
};

const saveHopePoints = (records) => {
  localStorage.setItem(HOPE_POINTS_KEY, JSON.stringify(records));
};

const dispatchHopePointsUpdated = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(HOPE_POINTS_UPDATED));
};

export const getHopePoints = (userId) =>
  readHopePoints().find((record) => String(record.userId) === String(userId)) || {
    userId,
    points: 0,
    activities: [],
  };

export const addHopePoints = (userId, points, reason, activityKey) => {
  const records = readHopePoints();
  const recordIndex = records.findIndex((record) => String(record.userId) === String(userId));
  const currentRecord = recordIndex === -1
    ? { userId, points: 0, activities: [] }
    : records[recordIndex];

  if (activityKey && currentRecord.activities.some((activity) => activity.activityKey === activityKey)) {
    return currentRecord;
  }

  const updatedRecord = {
    ...currentRecord,
    points: currentRecord.points + points,
    activities: [
      {
        action: reason,
        points,
        date: new Date().toISOString(),
        ...(activityKey ? { activityKey } : {}),
      },
      ...(currentRecord.activities || []),
    ],
  };

  if (recordIndex === -1) {
    records.push(updatedRecord);
  } else {
    records[recordIndex] = updatedRecord;
  }

  saveHopePoints(records);
  if (currentRecord.points < REWARD_MILESTONE && updatedRecord.points >= REWARD_MILESTONE) {
    createNotification({ userId, title: "Eligible for Reward", message: `You reached ${REWARD_MILESTONE} Hope Points and can claim your ₹20 reward.`, type: "reward", priority: "high" });
  }
  const currentUser = getCurrentUser();
  if (currentUser && String(currentUser.id) === String(userId)) {
    updateCurrentUser({ ...currentUser, hopePoints: updatedRecord.points });
  }
  dispatchHopePointsUpdated();
  return updatedRecord;
};

export const calculateRank = (points) => {
  if (points >= 500) return "Community Hero";
  if (points >= 300) return "Hope Champion";
  if (points >= 150) return "Community Friend";
  if (points >= 50) return "Kind Supporter";
  return "New Helper";
};
