const { v4: uuidv4 } = require("uuid");
const Notification = require("../domain/notification");

// Simple array to store notifications in memory
let notifications = [];

const notificationRepository = {
  // Create a new notification
  create(data) {
    const id = uuidv4();
    const newNotification = new Notification(
      id,
      data.userId,
      data.title,
      data.message,
      data.type,
      data.channel
    );
    notifications.push(newNotification);
    return newNotification;
  },

  // Get all notifications, or filter by userId if provided
  findAll(userId) {
    if (userId) {
      return notifications.filter(n => n.userId === userId);
    }
    return notifications;
  },

  // Find a notification by id
  findById(id) {
    const found = notifications.find(n => n.id === id);
    return found || null;
  },

  // Update notification fields
  update(id, fields) {
    const notification = notifications.find(n => n.id === id);
    if (!notification) {
      return null;
    }
    
    // Copy new fields over
    Object.assign(notification, fields);
    notification.updatedAt = new Date().toISOString();
    return notification;
  },

  // Delete notification by id
  delete(id) {
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
      return true;
    }
    return false;
  },

  // Mark a single notification as read
  markAsRead(id) {
    return this.update(id, { isRead: true });
  },

  // Mark all notifications for a specific user as read
  markAllAsRead(userId) {
    let count = 0;
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].userId === userId && !notifications[i].isRead) {
        notifications[i].isRead = true;
        notifications[i].updatedAt = new Date().toISOString();
        count++;
      }
    }
    return count;
  }
};

module.exports = notificationRepository;

