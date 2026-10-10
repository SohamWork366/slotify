const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const authRoutes = require("./routes/authRoutes");
const slotsRoutes = require("./routes/slotsRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/auth", authRoutes);
app.use("/slots", slotsRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Slotify API"
    });
});

app.listen(3000, () => {
    console.log("Slotify server running on port 3000");
});