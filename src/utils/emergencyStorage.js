const EMERGENCY_REQUESTS_KEY = "emergencyRequests";

const getStoredRequests = () => {
  try {
    const requests = JSON.parse(
      localStorage.getItem(EMERGENCY_REQUESTS_KEY)
    );

    return Array.isArray(requests) ? requests : [];
  } catch (error) {
    console.error("Unable to read emergency requests.", error);
    return [];
  }
};

const saveEmergencyRequests = (requests) => {
  localStorage.setItem(
    EMERGENCY_REQUESTS_KEY,
    JSON.stringify(requests)
  );
};

export const createEmergencyRequest = (requestData) => {
  const emergencyRequest = {
    id: `emergency-${Date.now()}`,
    ...requestData,
    status: "pending",
    supporters: [],
    timeline: [
      {
        action: "Emergency request created",
        date: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  };

  const requests = getStoredRequests();
  requests.push(emergencyRequest);
  saveEmergencyRequests(requests);

  return emergencyRequest;
};

export const getEmergencyRequests = () => getStoredRequests();

export const getEmergencyById = (id) =>
  getStoredRequests().find((request) => request.id === id) || null;

export const updateEmergencyRequest = (id, updates) => {
  const requests = getStoredRequests();
  const requestIndex = requests.findIndex((request) => request.id === id);

  if (requestIndex === -1) {
    return null;
  }

  const updatedRequest = {
    ...requests[requestIndex],
    ...updates,
    id: requests[requestIndex].id,
  };

  requests[requestIndex] = updatedRequest;
  saveEmergencyRequests(requests);

  return updatedRequest;
};

export const deleteEmergencyRequest = (id) => {
  const requests = getStoredRequests();
  const updatedRequests = requests.filter((request) => request.id !== id);

  if (updatedRequests.length === requests.length) {
    return false;
  }

  saveEmergencyRequests(updatedRequests);
  return true;
};

export const addSupportToEmergencyRequest = (id, supportData) => {
  const requests = getStoredRequests();
  const requestIndex = requests.findIndex((request) => request.id === id);

  if (requestIndex === -1) {
    return null;
  }

  const supporter = {
    userId: supportData.userId,
    userName: supportData.userName,
    supportType: supportData.supportType,
    amount: supportData.amount || null,
    items: supportData.items || null,
    message: supportData.message || "",
    createdAt: new Date().toISOString(),
  };

  const supportLabel = {
    money: "money",
    item: "item",
    volunteer: "volunteer",
  }[supporter.supportType] || "community";

  const updatedRequest = {
    ...requests[requestIndex],
    supporters: [
      ...(requests[requestIndex].supporters || []),
      supporter,
    ],
    timeline: [
      ...(requests[requestIndex].timeline || [
        {
          action: "Emergency request created",
          date: requests[requestIndex].createdAt,
        },
      ]),
      {
        action: `${supporter.userName} offered ${supportLabel} support`,
        date: supporter.createdAt,
      },
    ],
  };

  requests[requestIndex] = updatedRequest;
  saveEmergencyRequests(requests);

  return updatedRequest;
};
