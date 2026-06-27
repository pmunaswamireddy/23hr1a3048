const { v4: uuidv4 } = require("uuid");
const { Vehicle, Schedule } = require("../domain/vehicle");

// In-memory data store using simple arrays
let vehicles = [];
let schedules = [];

const vehicleRepository = {
  // Create a new vehicle
  createVehicle(data) {
    const id = uuidv4();
    const vehicle = new Vehicle(
      id,
      data.registrationNo,
      data.type,
      data.capacity,
      data.driverName,
      data.driverContact,
      data.status
    );
    vehicles.push(vehicle);
    return vehicle;
  },

  // Get all vehicles, optionally filtered by status
  getAllVehicles(status) {
    if (status) {
      return vehicles.filter(v => v.status === status);
    }
    return vehicles;
  },

  // Find vehicle by ID
  getVehicleById(id) {
    const found = vehicles.find(v => v.id === id);
    return found || null;
  },

  // Update vehicle details
  updateVehicle(id, fields) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) {
      return null;
    }
    Object.assign(vehicle, fields);
    vehicle.updatedAt = new Date().toISOString();
    return vehicle;
  },

  // Delete vehicle by ID
  deleteVehicle(id) {
    const index = vehicles.findIndex(v => v.id === id);
    if (index !== -1) {
      vehicles.splice(index, 1);
      return true;
    }
    return false;
  },

  // Create a new booking/schedule
  createSchedule(data) {
    const id = uuidv4();
    const schedule = new Schedule(
      id,
      data.vehicleId,
      data.userId,
      data.source,
      data.destination,
      data.scheduledAt,
      data.status
    );
    schedules.push(schedule);
    return schedule;
  },

  // Get all schedules, optionally filtered by vehicleId
  getAllSchedules(vehicleId) {
    if (vehicleId) {
      return schedules.filter(s => s.vehicleId === vehicleId);
    }
    return schedules;
  },

  // Find schedule by ID
  getScheduleById(id) {
    const found = schedules.find(s => s.id === id);
    return found || null;
  },

  // Update schedule details
  updateSchedule(id, fields) {
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) {
      return null;
    }
    Object.assign(schedule, fields);
    schedule.updatedAt = new Date().toISOString();
    return schedule;
  },

  // Delete schedule by ID
  deleteSchedule(id) {
    const index = schedules.findIndex(s => s.id === id);
    if (index !== -1) {
      schedules.splice(index, 1);
      return true;
    }
    return false;
  }
};

module.exports = vehicleRepository;

