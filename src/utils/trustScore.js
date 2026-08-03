import { getUsers } from "./auth";
import { getEmergencyRequests } from "./emergencyStorage";

export const calculateEmergencyTrustScore = (request) => {
  const creator = getUsers().find(
    (user) => String(user.id) === String(request.creatorId)
  );
  const creatorRequests = getEmergencyRequests().filter(
    (emergencyRequest) =>
      String(emergencyRequest.creatorId) === String(request.creatorId) &&
      emergencyRequest.id !== request.id
  );
  const factors = [];
  let score = 0;

  if (["verified", "completed"].includes(request.status)) {
    score += 40;
    factors.push("Admin verified");
  }

  if (creatorRequests.some((emergencyRequest) => emergencyRequest.status === "completed")) {
    score += 20;
    factors.push("Previous successful help");
  }

  if (creator?.donations?.length) {
    score += 15;
    factors.push("Verified contributor through donations");
  }

  if (creator?.volunteerApplication || (creator?.volunteerStatus && creator.volunteerStatus !== "Not Applied")) {
    score += 15;
    factors.push("Volunteer activity");
  }

  if (creator?.name && creator?.email && creator?.phone) {
    score += 10;
    factors.push("Complete profile");
  }

  return {
    score: Math.min(score, 100),
    factors,
  };
};
