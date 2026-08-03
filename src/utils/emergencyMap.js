export const INDIA_CENTER = [20.5937, 78.9629];

export const getEmergencyProgress = (request) => {
  const required = Number(request.amountRequired || 0);
  const collected = (request.supporters || []).reduce(
    (total, support) => total + (support.supportType === "money" ? Number(support.amount || 0) : 0),
    0
  );
  return { required, collected, percent: required ? Math.min((collected / required) * 100, 100) : 0 };
};

export const hasCoordinates = (request) => Number.isFinite(Number(request.latitude)) && Number.isFinite(Number(request.longitude));

export const isPublicEmergency = (request) => ["verified", "active"].includes(request.status);

export const distanceInKm = (from, to) => {
  if (!from || !to) return null;
  const rad = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = rad(to.latitude - from.latitude);
  const dLng = rad(to.longitude - from.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(from.latitude)) * Math.cos(rad(to.latitude)) * Math.sin(dLng / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const estimateTravel = (kilometers) => {
  if (kilometers == null) return "Location unavailable";
  const minutes = Math.max(2, Math.round((kilometers / 30) * 60));
  return minutes >= 60 ? `~${Math.floor(minutes / 60)}h ${minutes % 60}m by road` : `~${minutes} min by road`;
};
