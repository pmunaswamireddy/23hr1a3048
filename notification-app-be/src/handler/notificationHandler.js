const service = require("../service/notificationService");
const { Log } = require("../config/logger");

const notificationHandler = {
  // Create notification
  async create(req, res) {
    try {
      await Log("backend", "info", "handler", "POST /notifications request received");
      const notification = await service.createNotification(req.body);
      res.status(201).json({ success: true, data: notification });
    } catch (err) {
      await Log("backend", "error", "handler", "Create notification failed: " + err.message);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Get notifications (all or by userId)
  async getAll(req, res) {
    try {
      await Log("backend", "info", "handler", "GET /notifications request received");
      const userId = req.query.userId;
      
      let notifications;
      if (userId) {
        notifications = await service.getUserNotifications(userId);
      } else {
        notifications = await service.getAllNotifications();
      }
      
      res.status(200).json({ success: true, count: notifications.length, data: notifications });
    } catch (err) {
      await Log("backend", "error", "handler", "Get notifications failed: " + err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get notification by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "GET /notifications/" + id);
      const notification = await service.getNotificationById(id);
      res.status(200).json({ success: true, data: notification });
    } catch (err) {
      await Log("backend", "warn", "handler", "Get notification by ID failed: " + err.message);
      res.status(404).json({ success: false, error: err.message });
    }
  },

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "PATCH /notifications/" + id + "/read");
      const notification = await service.markAsRead(id);
      res.status(200).json({ success: true, data: notification });
    } catch (err) {
      await Log("backend", "error", "handler", "Mark read failed: " + err.message);
      res.status(404).json({ success: false, error: err.message });
    }
  },

  // Mark all read for user
  async markAllAsRead(req, res) {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ success: false, error: "userId is required" });
      }
      
      await Log("backend", "info", "handler", "PATCH /notifications/read-all for user: " + userId);
      const count = await service.markAllAsRead(userId);
      res.status(200).json({ success: true, message: count + " notifications marked as read" });
    } catch (err) {
      await Log("backend", "error", "handler", "Mark all read failed: " + err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Delete notification
  async remove(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "DELETE /notifications/" + id);
      await service.deleteNotification(id);
      res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (err) {
      await Log("backend", "error", "handler", "Delete notification failed: " + err.message);
      res.status(404).json({ success: false, error: err.message });
    }
  }
};

module.exports = notificationHandler;

