const repo = require("../repository/vehicleRepository");
const { Log } = require("../config/logger");

const allowedTypes = ["car", "bus", "truck", "van"];
const allowedStatuses = ["available", "booked", "maintenance"];

const vehicleService = {
  // Add a new vehicle
  async addVehicle(data) {
    const registrationNo = data.registrationNo;
    const type = data.type;
    const capacity = data.capacity;
    const driverName = data.driverName;
    const driverContact = data.driverContact;

    if (!registrationNo || !type || !capacity || !driverName || !driverContact) {
      throw new Error("All fields are required");
    }

    if (!allowedTypes.includes(type)) {
      throw new Error("Invalid vehicle type");
    }

    const vehicle = repo.createVehicle(data);
    await Log("backend", "info", "service", "Vehicle added: " + registrationNo);
    return vehicle;
  },

  // Get vehicles list
  async getVehicles(status) {
    await Log("backend", "info", "service", "Get vehicles status: " + status);
    return repo.getAllVehicles(status);
  },

  // Find vehicle by ID
  async getVehicleById(id) {
    const vehicle = repo.getVehicleById(id);
    if (!vehicle) {
      await Log("backend", "warn", "service", "Vehicle not found: " + id);
      throw new Error("Vehicle not found");
    }
    return vehicle;
  },

  // Update vehicle
  async updateVehicle(id, fields) {
    if (fields.status && !allowedStatuses.includes(fields.status)) {
      throw new Error("Invalid status");
    }
    const vehicle = repo.updateVehicle(id, fields);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    await Log("backend", "info", "service", "Vehicle updated: " + id);
    return vehicle;
  },

  // Delete vehicle
  async deleteVehicle(id) {
    const exists = repo.getVehicleById(id);
    if (!exists) {
      throw new Error("Vehicle not found");
    }
    repo.deleteVehicle(id);
    await Log("backend", "info", "service", "Vehicle deleted: " + id);
    return true;
  },

  // Book a vehicle
  async createSchedule(data) {
    const vehicleId = data.vehicleId;
    const userId = data.userId;
    const source = data.source;
    const destination = data.destination;
    const scheduledAt = data.scheduledAt;

    if (!vehicleId || !userId || !source || !destination || !scheduledAt) {
      throw new Error("All schedule fields are required");
    }

    const vehicle = repo.getVehicleById(vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "available") {
      throw new Error("Vehicle is not available");
    }

    const schedule = repo.createSchedule({
      vehicleId,
      userId,
      source,
      destination,
      scheduledAt,
      status: "confirmed"
    });

    // Mark vehicle as booked
    repo.updateVehicle(vehicleId, { status: "booked" });

    await Log("backend", "info", "service", "Schedule created for vehicle: " + vehicleId);
    return schedule;
  },

  // Get schedules list
  async getSchedules(vehicleId) {
    await Log("backend", "info", "service", "Get schedules. Filter vehicle: " + vehicleId);
    return repo.getAllSchedules(vehicleId);
  },

  // Find schedule by ID
  async getScheduleById(id) {
    const schedule = repo.getScheduleById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule;
  },

  // Cancel booking
  async cancelSchedule(id) {
    const schedule = repo.getScheduleById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }

    if (schedule.status === "cancelled") {
      throw new Error("Already cancelled");
    }

    repo.updateSchedule(id, { status: "cancelled" });
    repo.updateVehicle(schedule.vehicleId, { status: "available" });

    await Log("backend", "info", "service", "Schedule cancelled: " + id);
    return repo.getScheduleById(id);
  },

  // Complete booking
  async completeSchedule(id) {
    const schedule = repo.getScheduleById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }

    repo.updateSchedule(id, { status: "completed" });
    repo.updateVehicle(schedule.vehicleId, { status: "available" });

    await Log("backend", "info", "service", "Schedule completed: " + id);
    return repo.getScheduleById(id);
  }
};

module.exports = vehicleService;

