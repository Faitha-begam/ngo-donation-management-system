import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Bell, HeartHandshake, MapPin } from "lucide-react";

import { getCurrentUser } from "../utils/auth";
import {
  getUserNotifications,
  markAllNotificationsRead,
  markNotificationAsRead,
  NOTIFICATIONS_UPDATED,
} from "../utils/notificationStorage";

const priorityStyles = {
  critical: "border-red-200 bg-red-50 text-red-800",
  high: "border-amber-200 bg-amber-50 text-amber-800",
  medium: "border-[#DCCFC0] bg-[#F8F6F1] text-[#2E332B]",
};

const relativeTime = (date) => {
  const difference = Math.max(0, Date.now() - new Date(date).getTime());
  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

export default function NotificationBell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const refreshNotifications = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setNotifications(currentUser ? getUserNotifications(currentUser.id) : []);
  };

  useEffect(() => {
    refreshNotifications();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener(NOTIFICATIONS_UPDATED, refreshNotifications);
    window.addEventListener("storage", refreshNotifications);

    return () => {
      window.removeEventListener(NOTIFICATIONS_UPDATED, refreshNotifications);
      window.removeEventListener("storage", refreshNotifications);
    };
  }, []);

  if (!user) {
    return null;
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }

    setIsOpen(false);
    navigate(`/emergency-request/${notification.requestId}`);
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead(user.id);
  };

  return (
    <div className="relative ml-auto md:ml-3">
      <button
        type="button"
        aria-label="Open notifications"
        onClick={() => setIsOpen((open) => !open)}
        className="relative rounded-full p-2 text-[#F5F1E8] transition hover:bg-white/10"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/50 bg-white/85 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#DCCFC0] px-4 py-3">
              <div className="flex items-center gap-2 text-[#2E332B]">
                <HeartHandshake className="h-5 w-5 text-[#66785F]" />
                <span className="font-bold">Emergency Alerts</span>
              </div>
              {unreadCount > 0 && (
                <button type="button" onClick={handleMarkAllRead} className="text-xs font-semibold text-[#66785F] hover:text-[#2E332B]">
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-600">
                  You have no emergency alerts yet.
                </div>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleNotificationClick(notification)}
                    className={`mb-2 w-full rounded-xl border p-3 text-left transition hover:brightness-95 ${priorityStyles[notification.priority] || priorityStyles.medium} ${notification.read ? "opacity-70" : "shadow-sm"}`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold">{notification.title}</p>
                          {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-current" />}
                        </div>
                        <p className="mt-1 text-sm leading-5">{notification.message}</p>
                        <p className="mt-2 flex items-center gap-1 text-xs opacity-75"><MapPin className="h-3.5 w-3.5" />{relativeTime(notification.createdAt)}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
