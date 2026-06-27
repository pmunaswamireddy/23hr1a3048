# Notification System Architecture Design

This document details the architecture design and implementation of the Notification and Vehicle Scheduling backend systems, including the custom logging middleware integration.

---

## 🏗️ 1. High-Level Architecture Overview

The system is designed following the **Layered (N-Tier) Architecture** to ensure clean separation of concerns, high maintainability, and testing flexibility.

```
       [ Client / API Requests (Postman / Frontend) ]
                            │
                            ▼
     [ Routes Layer (Express Router / Endpoint Mapping) ]
                            │
                            ▼
     [ Handlers / Controllers (Validation & HTTP Mapping) ]
                            │
                            ▼
     [ Services Layer (Core Business & Validation Logic) ]
             │                                     │
             ▼                                     ▼
 [ Repository Layer (Data CRUD) ]      [ Logging Middleware ]
             │                                     │
             ▼                                     ▼
    [ In-Memory Map Store ]             [ Central Log Server ]
```

### Layer Definitions:
1. **Routes**: Maps URL paths to specific controller handlers.
2. **Handlers/Controllers**: Parses request inputs, validates parameters, catches errors, and returns JSON responses.
3. **Services**: Contains core business rules (e.g., verifying vehicle availability status before booking).
4. **Repositories**: Abstracts database access. Currently implemented as an in-memory array data store.
5. **Domain/Models**: Standardized entities defining property fields for `Vehicle`, `Schedule`, and `Notification`.

---

## 📋 2. Database & Data Models

### 🔔 Notification Model
Represents a notification sent to a specific user:
* `id` (UUID): Unique identifier.
* `userId` (String): Owner of the notification.
* `title` (String): Subject/Title of notification.
* `message` (String): Content description.
* `type` (String): `info` | `warning` | `alert` | `success`.
* `channel` (String): `in-app` | `email` | `sms`.
* `isRead` (Boolean): Read status tracker.
* `createdAt` / `updatedAt` (ISODate).

### 🚗 Vehicle Model
Represents a vehicle registered on the platform:
* `id` (UUID): Unique vehicle identifier.
* `registrationNo` (String): Vehicle license plate.
* `type` (String): `car` | `bus` | `truck` | `van`.
* `capacity` (Number): Max load capacity.
* `driverName` (String): Assigned driver.
* `driverContact` (String): Driver's phone.
* `status` (String): `available` | `booked` | `maintenance`.

---

## 🪵 3. Logging & Observability Middleware

Every inbound request and critical lifecycle event triggers structured logging through a reusable logging library. 

### Flow:
1. Client requests an endpoint.
2. Express Middleware captures start-time.
3. Once response is complete, log level is chosen (`info` for 2xx/3xx, `warn` for 4xx, `error` for 5xx).
4. Middleware formats log schema and sends it via **POST** to the centralized Central Log Server.

---

## 🚀 4. Production Scalability Plan (Future Scope)

To transition from this prototype to a system handling millions of notifications, the following components would be added:

1. **Persistent Database**: Replace arrays with PostgreSQL (for relation mapping between vehicles and schedules) and MongoDB (for flexible, high-volume notification logs).
2. **Message Broker (MQ)**: Integrate **RabbitMQ** or **Apache Kafka** to handle notifications asynchronously. Instead of blocking the request thread, messages are queued and dispatched by background workers.
3. **Caching Layer**: Implement **Redis** to cache user notification counts and vehicle availability statuses, reducing database queries.
4. **Gateway Providers**: Integrate standard external service providers (e.g., **Twilio** for SMS, **Nodemailer/SendGrid** for emails, **Firebase Cloud Messaging (FCM)** for push notifications).
