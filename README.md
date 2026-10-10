# Slotify API

A simple REST API for managing appointment slots.

## Features

- Get all slots
- Get slot by ID
- Create a new slot
- Delete a slot
- Request validation
- Request logging

## Run the Project

```bash
node index.js

## Week 2 - Database & Mongoose

- Connected Slotify to MongoDB Atlas using Mongoose
- Added Slot schema with date, time, duration, isBooked and createdAt
- Migrated slot CRUD operations from in-memory data to MongoDB
- Added PUT endpoint for updating slots
- Added error handling and validation for CRUD operations


## Week 3: Authentication and Authorization

### New Features
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Authentication middleware to verify tokens.
- Protected slot creation and deletion routes.
- Authenticated user profile endpoint.

### Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT token |
| GET | `/auth/me` | Get the logged-in user's profile |

### Testing
Tested registration, login, password hashing, token validation, and protected routes using Thunder Client.

---

## Week 4: Booking Logic

### New Features
- Book available slots.
- Prevent duplicate bookings.
- Cancel bookings with an ownership check.
- Filter available slots.
- Detect overlapping slots on the same date.
- View bookings made by the logged-in user.

### Booking Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/slots/:id/book` | Book a slot | Required |
| POST | `/slots/:id/cancel` | Cancel a booking | Required |
| GET | `/slots?available=true` | List available slots | Not required |
| GET | `/bookings/me` | View your bookings | Required |
| POST | `/slots` | Create a slot with overlap checking | Required |

### Error Handling
- `400 Bad Request`: Missing or invalid input.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: User is not allowed to cancel a booking.
- `404 Not Found`: Slot does not exist.
- `409 Conflict`: Slot is already booked or overlaps an existing slot.

### Testing
Tested booking, duplicate booking prevention, cancellation, available-slot filtering, user bookings, and overlap detection using Thunder Client.
