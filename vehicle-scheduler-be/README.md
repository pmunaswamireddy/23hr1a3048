# Vehicle Scheduler Backend

This is the backend service for scheduling and booking vehicles.

## Setup and Installation

1. Go to the project directory:
```bash
cd vehicle-scheduler-be
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

The server will run on http://localhost:3002.

## API Endpoints:

### Vehicle Endpoints
* `POST /api/vehicles` - Add a vehicle
* `GET /api/vehicles` - Get all vehicles (can filter with `?status=available`)
* `GET /api/vehicles/:id` - Get a single vehicle details
* `PUT /api/vehicles/:id` - Update vehicle details
* `DELETE /api/vehicles/:id` - Remove a vehicle

### Booking/Schedule Endpoints
* `POST /api/vehicles/schedules` - Create a booking
* `GET /api/vehicles/schedules` - Get all booking schedules
* `GET /api/vehicles/schedules/:id` - Get a booking details
* `PATCH /api/vehicles/schedules/:id/cancel` - Cancel a booking
* `PATCH /api/vehicles/schedules/:id/complete` - Mark a booking as completed
