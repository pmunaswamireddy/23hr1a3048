class Vehicle {
  constructor(id, registrationNo, type, capacity, driverName, driverContact, status) {
    this.id = id;
    this.registrationNo = registrationNo;
    this.type = type;
    this.capacity = capacity;
    this.driverName = driverName;
    this.driverContact = driverContact;
    this.status = status || "available";
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

class Schedule {
  constructor(id, vehicleId, userId, source, destination, scheduledAt, status) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.source = source;
    this.destination = destination;
    this.scheduledAt = scheduledAt;
    this.status = status || "pending";
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {
  Vehicle,
  Schedule
};

