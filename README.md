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