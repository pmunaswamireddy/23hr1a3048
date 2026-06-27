const express = require("express");
const handler = require("../handler/notificationHandler");

const router = express.Router();

// Define notification endpoints
router.post("/", handler.create);
router.get("/", handler.getAll);
router.get("/:id", handler.getById);
router.patch("/read-all", handler.markAllAsRead);
router.patch("/:id/read", handler.markAsRead);
router.delete("/:id", handler.remove);

module.exports = router;

