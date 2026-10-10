
const express = require("express");
const router = express.Router();

const Slot = require("../models/Slot");
const protect = require("../middleware/authMiddleware");

// Get bookings of the logged-in user
router.get("/me", protect, async (req, res) => {
    try {
        const bookings = await Slot.find({
            bookedBy: req.user.id
        });

        res.status(200).json(bookings);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching your bookings"
        });
    }
});

module.exports = router;
