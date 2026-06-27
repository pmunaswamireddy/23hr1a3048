const axios = require("axios");

// Valid stacks and levels
const validStacks = ["backend", "frontend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];

// Valid packages for backend, frontend and shared
const backendPackages = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
const frontendPackages = ["api", "component", "hook", "page", "state", "style"];
const sharedPackages = ["auth", "config", "middleware", "utils"];

const LOG_URL = "http://4.224.186.213/evaluation-service/logs";

let accessToken = "";

// Function to set the access token
function configure(token) {
  if (!token) {
    console.error("Token is required");
    return;
  }
  accessToken = token;
}

// Main log function
async function Log(stack, level, pkg, message) {
  // Validate stack
  if (!validStacks.includes(stack)) {
    console.error("Invalid stack name: " + stack);
    return null;
  }

  // Validate level
  if (!validLevels.includes(level)) {
    console.error("Invalid log level: " + level);
    return null;
  }

  // Validate package based on stack
  let allowedPackages = [...sharedPackages];
  if (stack === "backend") {
    allowedPackages = allowedPackages.concat(backendPackages);
  } else if (stack === "frontend") {
    allowedPackages = allowedPackages.concat(frontendPackages);
  }

  if (!allowedPackages.includes(pkg)) {
    console.error("Invalid package: " + pkg + " for stack: " + stack);
    return null;
  }

  // Validate message
  if (!message || typeof message !== "string") {
    console.error("Message must be a string");
    return null;
  }

  // Check if token is configured
  if (!accessToken) {
    console.error("Logger not configured. Please call configure(token) first.");
    return null;
  }

  // Send request to server
  try {
    const response = await axios.post(
      LOG_URL,
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to send log to server:", error.message);
    return null;
  }
}

module.exports = {
  Log,
  configure
};

