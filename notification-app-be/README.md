# Notification App Backend

This is the backend service for managing notifications. It allows creating notifications, viewing them, marking them as read, and deleting them.

## Setup and Installation

1. Go to the project directory:
```bash
cd notification-app-be
```

2. Install the node modules:
```bash
npm install
```

3. Configure your details in the `.env` file (port and client credentials).

4. Start the server:
```bash
node server.js
```

The server will run on http://localhost:3001.

## API Endpoints:
* `POST /api/notifications` - Create a notification
* `GET /api/notifications` - Get all notifications (can filter with query `?userId=123`)
* `GET /api/notifications/:id` - Get a single notification
* `PATCH /api/notifications/:id/read` - Mark a notification as read
* `PATCH /api/notifications/read-all` - Mark all notifications read for a user
* `DELETE /api/notifications/:id` - Delete a notification
