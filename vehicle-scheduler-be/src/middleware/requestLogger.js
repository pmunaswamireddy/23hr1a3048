const { Log } = require("../config/logger");

async function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on("finish", async () => {
    const duration = Date.now() - start;
    
    let level = "info";
    if (res.statusCode >= 500) {
      level = "error";
    } else if (res.statusCode >= 400) {
      level = "warn";
    }
    
    const message = req.method + " " + req.originalUrl + " - Status: " + res.statusCode + " (" + duration + "ms)";
    await Log("backend", level, "middleware", message);
  });
  
  next();
}

async function errorHandler(err, req, res, next) {
  await Log("backend", "fatal", "middleware", "Server error: " + err.message);
  res.status(500).json({ success: false, error: "Something went wrong on the server" });
}

module.exports = {
  requestLogger,
  errorHandler
};

