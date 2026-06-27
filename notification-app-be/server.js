require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const notificationRoutes = require("./src/route/notificationRoutes");
const { requestLogger, errorHandler } = require("./src/middleware/requestLogger");
const { Log, configure } = require("./src/config/logger");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "notification-app-be",
    time: new Date().toISOString()
  });
});

// APIs
app.use("/api/notifications", notificationRoutes);

// Handling 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handling
app.use(errorHandler);

// Function to start server after authentication
async function startServer() {
  try {
    console.log("Authenticating with test server...");
    const credentials = {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    };

    const authRes = await axios.post("http://4.224.186.213/evaluation-service/auth", credentials);
    const token = authRes.data.access_token;
    
    // Configure logger with fresh token
    configure(token);
    console.log("Authentication successful! Token loaded.");

    app.listen(PORT, async () => {
      console.log("Server is running on port: " + PORT);
      await Log("backend", "info", "route", "Notification service started on port " + PORT);
    });
  } catch (error) {
    console.error("Failed to authenticate or start server:", error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;


