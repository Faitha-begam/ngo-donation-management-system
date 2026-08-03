const EMERGENCY_REQUESTS_KEY = "emergencyRequests";

const getStoredRequests = () => {
  try {
    const requests = JSON.parse(localStorage.getItem(EMERGENCY_REQUESTS_KEY));
    return Array.isArray(requests) ? requests : [];
  } catch (error) {
    console.error("Unable to read emergency requests.", error);
    return [];
  }
};

const saveEmergencyRequests = (requests) => {
  localStorage.setItem(EMERGENCY_REQUESTS_KEY, JSON.stringify(requests));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("emergencyRequestsUpdated"));
};

export const createEmergencyRequest = (requestData) => {
  const createdAt = new Date().toISOString();
  const emergencyRequest = {
    id: `emergency-${Date.now()}`,
    ...requestData,
    status: "pending",
    supporters: [],
    timeline: [{ action: "Emergency request created", date: createdAt }],
    createdAt,
  };
  const requests = getStoredRequests();
  requests.push(emergencyRequest);
  saveEmergencyRequests(requests);
  return emergencyRequest;
};

export const getEmergencyRequests = () => getStoredRequests();
export const getEmergencyById = (id) => getStoredRequests().find((request) => request.id === id) || null;
export const getPendingEmergencyRequests = () => getStoredRequests().filter((request) => request.status === "pending");

export const updateEmergencyRequest = (id, updates) => {
  const requests = getStoredRequests();
  const requestIndex = requests.findIndex((request) => request.id === id);
  if (requestIndex === -1) return null;
  const updatedRequest = { ...requests[requestIndex], ...updates, id: requests[requestIndex].id };
  requests[requestIndex] = updatedRequest;
  saveEmergencyRequests(requests);
  return updatedRequest;
};

export const deleteEmergencyRequest = (id) => {
  const requests = getStoredRequests();
  const updatedRequests = requests.filter((request) => request.id !== id);
  if (updatedRequests.length === requests.length) return false;
  saveEmergencyRequests(updatedRequests);
  return true;
};

export const addSupportToEmergencyRequest = (id, supportData) => {
  const request = getEmergencyById(id);
  if (!request) return null;

  const supportId = supportData.id || `support-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const existingSupport = (request.supporters || []).find(
    (supporter) =>
      String(supporter.userId) === String(supportData.userId) &&
      supporter.supportType === supportData.supportType &&
      supporter.id === supportId
  );
  if (existingSupport) return request;

  const createdAt = new Date().toISOString();
  const supporter = {
    id: supportId,
    userId: supportData.userId,
    userName: supportData.userName,
    supportType: supportData.supportType,
    amount: supportData.supportType === "money" ? Number(supportData.amount || 0) : null,
    items: supportData.supportType === "item" ? supportData.items || null : null,
    message: supportData.message || "",
    createdAt,
  };
  const contribution = supporter.supportType === "money"
    ? `₹${supporter.amount.toLocaleString("en-IN")} contributed`
    : supporter.supportType === "item"
      ? `${supporter.items?.quantity || 0} ${supporter.items?.name || "items"} offered`
      : "Volunteer help offered";

  return updateEmergencyRequest(id, {
    supporters: [...(request.supporters || []), supporter],
    timeline: [
      ...(request.timeline || []),
      { action: `${supporter.userName} supported this emergency`, date: createdAt },
      { action: contribution, date: createdAt },
    ],
  });
};

const updateEmergencyStatus = (id, status, action) => {
  const request = getEmergencyById(id);
  if (!request) return null;
  return updateEmergencyRequest(id, { status, timeline: [...(request.timeline || []), { action, date: new Date().toISOString() }] });
};

export const verifyEmergencyRequest = (id) => updateEmergencyStatus(id, "verified", "Emergency request verified by admin");
export const rejectEmergencyRequest = (id) => updateEmergencyStatus(id, "rejected", "Emergency request rejected by admin");
export const completeEmergencyRequest = (id) => updateEmergencyStatus(id, "completed", "Emergency request marked as completed by admin");
