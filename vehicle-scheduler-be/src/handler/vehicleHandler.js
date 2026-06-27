"use strict";
const service = require("../service/vehicleService");
const { Log } = require("../config/logger");

const vehicleHandler = {
  // Add new vehicle
  async addVehicle(req, res) {
    try {
      await Log("backend", "info", "handler", "POST /vehicles request received");
      const data = await service.addVehicle(req.body);
      res.status(201).json({ success: true, data: data });
    } catch (err) {
      await Log("backend", "error", "handler", "Add vehicle failed: " + err.message);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Get all vehicles
  async getVehicles(req, res) {
    try {
      const status = req.query.status;
      const data = await service.getVehicles(status);
      res.status(200).json({ success: true, count: data.length, data: data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get vehicle by id
  async getVehicleById(req, res) {
    try {
      const id = req.params.id;
      const data = await service.getVehicleById(id);
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  // Update vehicle details
  async updateVehicle(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "PUT /vehicles/" + id);
      const data = await service.updateVehicle(id, req.body);
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      await Log("backend", "error", "handler", "Update vehicle failed: " + err.message);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Delete vehicle
  async deleteVehicle(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "DELETE /vehicles/" + id);
      await service.deleteVehicle(id);
      res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  // Book a vehicle schedule
  async createSchedule(req, res) {
    try {
      await Log("backend", "info", "handler", "POST /schedules request received");
      const data = await service.createSchedule(req.body);
      res.status(201).json({ success: true, data: data });
    } catch (err) {
      await Log("backend", "error", "handler", "Create schedule failed: " + err.message);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Get all schedules
  async getSchedules(req, res) {
    try {
      const vehicleId = req.query.vehicleId;
      const data = await service.getSchedules(vehicleId);
      res.status(200).json({ success: true, count: data.length, data: data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // Get schedule by id
  async getScheduleById(req, res) {
    try {
      const id = req.params.id;
      const data = await service.getScheduleById(id);
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },

  // Cancel booking
  async cancelSchedule(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "PATCH /schedules/" + id + "/cancel");
      const data = await service.cancelSchedule(id);
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // Complete booking
  async completeSchedule(req, res) {
    try {
      const id = req.params.id;
      await Log("backend", "info", "handler", "PATCH /schedules/" + id + "/complete");
      const data = await service.completeSchedule(id);
      res.status(200).json({ success: true, data: data });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
};

module.exports = vehicleHandler;
