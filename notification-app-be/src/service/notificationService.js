const repo = require("../repository/notificationRepository");
const { Log } = require("../config/logger");

const allowedTypes = ["info", "warning", "alert", "success"];
const allowedChannels = ["in-app", "email", "sms"];

const notificationService = {
  async createNotification(data) {
    const userId = data.userId;
    const title = data.title;
    const message = data.message;
    const type = data.type || "info";
    const channel = data.channel || "in-app";

    // Basic validation checks
    if (!userId || !title || !message) {
      throw new Error("Missing required fields: userId, title, or message");
    }
    
    if (!allowedTypes.includes(type)) {
      throw new Error("Invalid notification type");
    }
    
    if (!allowedChannels.includes(channel)) {
      throw new Error("Invalid notification channel");
    }

    const notification = repo.create({ userId, title, message, type, channel });
    
    // Log to test server
    await Log("backend", "info", "service", "Notification created: " + notification.id);
    return notification;
  },

  async getUserNotifications(userId) {
    await Log("backend", "info", "service", "Get notifications for user: " + userId);
    return repo.findAll(userId);
  },

  async getAllNotifications() {
    await Log("backend", "info", "service", "Get all notifications");
    return repo.findAll();
  },

  async getNotificationById(id) {
    const notification = repo.findById(id);
    if (!notification) {
      await Log("backend", "warn", "service", "Notification not found: " + id);
      throw new Error("Notification not found");
    }
    return notification;
  },

  async markAsRead(id) {
    const notification = repo.markAsRead(id);
    if (!notification) {
      throw new Error("Notification not found");
    }
    await Log("backend", "info", "service", "Notification read: " + id);
    return notification;
  },

  async markAllAsRead(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const count = repo.markAllAsRead(userId);
    await Log("backend", "info", "service", "Marked all read for user: " + userId);
    return count;
  },

  async deleteNotification(id) {
    const found = repo.findById(id);
    if (!found) {
      await Log("backend", "warn", "service", "Cannot delete. Notification not found: " + id);
      throw new Error("Notification not found");
    }
    repo.delete(id);
    await Log("backend", "info", "service", "Notification deleted: " + id);
    return true;
  }
};

module.exports = notificationService;

