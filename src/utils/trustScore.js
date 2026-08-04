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

  if (Number.isFinite(Number(request.latitude)) && Number.isFinite(Number(request.longitude))) {
    score += 12;
    factors.push("Exact map location provided");
  }
  if ((request.evidencePhotos || []).length) {
    score += Math.min(15, request.evidencePhotos.length * 5);
    factors.push("Evidence photos uploaded");
  }
  if (request.emergencyContact?.name && request.emergencyContact?.phone) {
    score += 10;
    factors.push("Emergency contact added");
  }
  if (request.landmark) {
    score += 5;
    factors.push("Nearest landmark added");
  }
  if ((request.updates || []).length) {
    score += Math.min(10, request.updates.length * 2);
    factors.push("Creator shares progress updates");
  }
  if (["verified", "active", "completed"].includes(request.status)) {
    score += 25;
    factors.push("Admin verified");
  }

  if (creatorRequests.some((emergencyRequest) => emergencyRequest.status === "completed")) {
    score += 12;
    factors.push("Previous successful help");
  }

  if (creator?.donations?.length) {
    score += 8;
    factors.push("Verified contributor through donations");
  }

  if (creator?.volunteerApplication || (creator?.volunteerStatus && creator.volunteerStatus !== "Not Applied")) {
    score += 5;
    factors.push("Volunteer activity");
  }

  if (creator?.name && creator?.email && creator?.phone) {
    score += 3;
    factors.push("Complete profile");
  }
  if ((request.supporters || []).length + (request.comments || []).filter((comment) => !comment.hidden).length >= 3) {
    score += 5;
    factors.push("Community engagement");
  }

  return {
    score: Math.min(score, 100),
    factors,
  };
};
