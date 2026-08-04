import { createNotification } from "./notificationStorage";

// Temporary testing threshold. Change this back to 1000 for production.
export const REWARD_THRESHOLD = 50;
export const REWARD_MILESTONE = REWARD_THRESHOLD;
export const REWARD_AMOUNT = 20;
const KEY = "rewardClaims";
const UPDATED = "rewardClaimsUpdated";
const read = () => { try { const value = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(value) ? value : []; } catch { return []; } };
export const initializeRewardClaims = () => {
  if (typeof window !== "undefined" && localStorage.getItem(KEY) === null) localStorage.setItem(KEY, "[]");
};
const save = (claims) => { localStorage.setItem(KEY, JSON.stringify(claims)); window.dispatchEvent(new Event(UPDATED)); };
export const REWARD_CLAIMS_UPDATED = UPDATED;
export const getRewardClaims = () => read().map((claim) => ({ rewardAmount: REWARD_AMOUNT, status: "Pending Approval", adminNotes: "", reviewedAt: null, ...claim }));
export const getUserRewardClaims = (userId) => getRewardClaims().filter((claim) => String(claim.userId) === String(userId)).sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
export const getActiveRewardClaim = (userId) => getUserRewardClaims(userId).find((claim) => ["Pending Approval", "Approved"].includes(claim.status));
export const isRewardEligible = (points) => Number(points || 0) >= REWARD_MILESTONE;
export const submitRewardClaim = ({ userId, userName, hopePoints }) => {
  if (!isRewardEligible(hopePoints) || getActiveRewardClaim(userId)) return null;
  const claim = { id: `reward-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, userId, userName, hopePoints: Number(hopePoints), rewardAmount: REWARD_AMOUNT, status: "Pending Approval", requestedAt: new Date().toISOString(), reviewedAt: null, adminNotes: "" };
  const claims = getRewardClaims(); claims.push(claim); save(claims);
  createNotification({ userId, title: "Reward claim submitted", message: `Your ₹${REWARD_AMOUNT} Hope Points reward claim is awaiting review.`, type: "reward", priority: "medium" });
  return claim;
};
export const reviewRewardClaim = (id, status, adminNotes = "") => {
  const claims = getRewardClaims(); const index = claims.findIndex((claim) => claim.id === id); if (index < 0) return null;
  const claim = { ...claims[index], status, adminNotes: adminNotes.trim(), reviewedAt: new Date().toISOString() }; claims[index] = claim; save(claims);
  const messages = { Approved: "Your reward claim has been approved.", Rejected: "Your reward claim was rejected.", "Reward Granted": "Your ₹20 reward has been manually marked as granted." };
  createNotification({ userId: claim.userId, title: `Reward ${status.toLowerCase()}`, message: messages[status], type: "reward", priority: status === "Rejected" ? "medium" : "high" });
  return claim;
};

initializeRewardClaims();
