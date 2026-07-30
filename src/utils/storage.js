// ================================
// Local Storage Helper
// ================================

// ---------- Keys ----------
export const STORAGE_KEYS = {
  USERS: "users",
  CURRENT_USER: "currentUser",
  DONATIONS: "donations",
  VOLUNTEERS: "volunteers",
  CONTACTS: "contactMessages",
  CAMPAIGNS: "campaigns",
};

// ================================
// Generic Functions
// ================================

export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key}`, error);
    return [];
  }
};

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ================================
// Users
// ================================

export const getUsers = () => {
  return getData(STORAGE_KEYS.USERS);
};

export const saveUsers = (users) => {
  saveData(STORAGE_KEYS.USERS, users);
};

// ================================
// Current User
// ================================

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(user)
  );
};

export const logoutCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// ================================
// Donations
// ================================

export const getDonations = () => {
  return getData(STORAGE_KEYS.DONATIONS);
};

export const saveDonation = (donation) => {
  const donations = getDonations();

  donations.unshift({
    id: Date.now(),
    ...donation,
    createdAt: new Date().toISOString(),
  });

  saveData(STORAGE_KEYS.DONATIONS, donations);
};

// ================================
// Volunteers
// ================================

export const getVolunteers = () => {
  return getData(STORAGE_KEYS.VOLUNTEERS);
};

export const saveVolunteer = (volunteer) => {
  const volunteers = getVolunteers();

  volunteers.unshift({
    id: Date.now(),
    status: "Pending",
    ...volunteer,
    createdAt: new Date().toISOString(),
  });

  saveData(STORAGE_KEYS.VOLUNTEERS, volunteers);
};

// ================================
// Contact Messages
// ================================

export const getMessages = () => {
  return getData(STORAGE_KEYS.CONTACTS);
};

export const saveMessage = (message) => {
  const messages = getMessages();

  messages.unshift({
    id: Date.now(),
    ...message,
    createdAt: new Date().toISOString(),
  });

  saveData(STORAGE_KEYS.CONTACTS, messages);
};

// ================================
// Campaigns
// ================================

export const getCampaigns = () => {
  return getData(STORAGE_KEYS.CAMPAIGNS);
};

export const saveCampaigns = (campaigns) => {
  saveData(STORAGE_KEYS.CAMPAIGNS, campaigns);
};

// ================================
// Dashboard Statistics
// ================================

export const getDashboardStats = () => {
  const users = getUsers();
  const donations = getDonations();
  const volunteers = getVolunteers();
  const campaigns = getCampaigns();

  const totalAmount = donations.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return {
    totalUsers: users.length,
    totalDonations: donations.length,
    totalDonationAmount: totalAmount,
    totalVolunteers: volunteers.length,
    totalCampaigns: campaigns.length,
  };
};