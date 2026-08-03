const NOTIFICATIONS_KEY = "notifications";
const NOTIFICATIONS_UPDATED_EVENT = "notificationsUpdated";

const notifyListeners = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(NOTIFICATIONS_UPDATED_EVENT));
  }
};

const readNotifications = () => {
  try {
    const notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY));
    return Array.isArray(notifications) ? notifications : [];
  } catch (error) {
    console.error("Unable to read notifications.", error);
    return [];
  }
};

const saveNotifications = (notifications) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  notifyListeners();
};

export const createNotification = (notificationData) => {
  const notification = {
    id: `notification-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: "emergency",
    read: false,
    createdAt: new Date().toISOString(),
    ...notificationData,
  };

  const notifications = readNotifications();
  notifications.push(notification);
  saveNotifications(notifications);

  return notification;
};

export const getNotifications = () => readNotifications();

export const getUserNotifications = (userId) =>
  readNotifications()
    .filter((notification) => String(notification.userId) === String(userId))
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));

export const markNotificationAsRead = (id) => {
  const notifications = readNotifications();
  const notificationIndex = notifications.findIndex((notification) => notification.id === id);

  if (notificationIndex === -1) {
    return null;
  }

  notifications[notificationIndex] = {
    ...notifications[notificationIndex],
    read: true,
  };
  saveNotifications(notifications);

  return notifications[notificationIndex];
};

export const markAllNotificationsRead = (userId) => {
  const notifications = readNotifications().map((notification) =>
    String(notification.userId) === String(userId)
      ? { ...notification, read: true }
      : notification
  );

  saveNotifications(notifications);
  return notifications;
};

export const deleteNotification = (id) => {
  const notifications = readNotifications();
  const updatedNotifications = notifications.filter((notification) => notification.id !== id);

  if (updatedNotifications.length === notifications.length) {
    return false;
  }

  saveNotifications(updatedNotifications);
  return true;
};

export const NOTIFICATIONS_UPDATED = NOTIFICATIONS_UPDATED_EVENT;
