class Notification {
  constructor(id, userId, title, message, type, channel) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.message = message;
    this.type = type || "info";
    this.channel = channel || "in-app";
    this.isRead = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Notification;

