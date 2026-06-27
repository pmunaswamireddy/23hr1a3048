const express = require("express");
const handler = require("../handler/vehicleHandler");

const router = express.Router();

// Vehicle endpoints
router.post("/", handler.addVehicle);
router.get("/", handler.getVehicles);
router.get("/:id", handler.getVehicleById);
router.put("/:id", handler.updateVehicle);
router.delete("/:id", handler.deleteVehicle);

// Booking endpoints
router.post("/schedules", handler.createSchedule);
router.get("/schedules", handler.getSchedules);
router.get("/schedules/:id", handler.getScheduleById);
router.patch("/schedules/:id/cancel", handler.cancelSchedule);
router.patch("/schedules/:id/complete", handler.completeSchedule);

module.exports = router;

