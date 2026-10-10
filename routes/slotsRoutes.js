const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");
const protect = require("../middleware/authMiddleware");

router.use(express.json());


router.get("/", async (req, res) => {
    try {
        let slots;

        if (req.query.available === "true") {
            slots = await Slot.find({ isBooked: false });
        } else {
            slots = await Slot.find();
        }

        res.status(200).json(slots);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching slots"
        });
    }
});



router.get("/", async (req, res) => {
    try {
        let slots;

        if (req.query.available === "true") {
            slots = await Slot.find({ isBooked: false });
        } else {
            slots = await Slot.find();
        }

        res.status(200).json(slots);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching slots"
        });
    }
});



router.post("/", protect, async (req, res) => {
    try {
        const { date, time, duration } = req.body;

        if (!date || !time || !duration) {
            return res.status(400).json({
                message: "date, time and duration are required"
            });
        }

        if (
            !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
            !/^\d{2}:\d{2}$/.test(time) ||
            !Number.isFinite(Number(duration)) ||
            Number(duration) <= 0
        ) {
            return res.status(400).json({
                message: "Use date YYYY-MM-DD, time HH:mm, and a positive duration"
            });
        }

        const newStart = new Date(`${date}T${time}:00`);

        if (Number.isNaN(newStart.getTime())) {
            return res.status(400).json({
                message: "Invalid date or time"
            });
        }

        const newEnd = new Date(
            newStart.getTime() + Number(duration) * 60000
        );

        const existingSlots = await Slot.find({ date });

        for (const existing of existingSlots) {
            const existingStart = new Date(`${existing.date}T${existing.time}:00`);
            const existingEnd = new Date(
                existingStart.getTime() + Number(existing.duration) * 60000
            );

            if (newStart < existingEnd && newEnd > existingStart) {
                return res.status(409).json({
                    message: "This slot overlaps with an existing slot"
                });
            }
        }

        const slot = await Slot.create({
            date,
            time,
            duration: Number(duration)
        });

        res.status(201).json(slot);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating slot"
        });
    }
});


router.delete("/:id", protect, async (req, res) => {
    try {
        const deletedSlot = await Slot.findByIdAndDelete(req.params.id);

        if (!deletedSlot) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        res.json({
            message: "Slot deleted successfully",
            slot: deletedSlot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting slot"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedSlot = await Slot.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSlot) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        res.json(updatedSlot);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating slot"
        });
    }
});

// Book a slot
router.post("/:id/book", protect, async (req, res) => {
    try {
        const slot = await Slot.findOneAndUpdate(
            {
                _id: req.params.id,
                isBooked: false
            },
            {
                $set: {
                    isBooked: true,
                    bookedBy: req.user.id
                }
            },
            {
                new: true
            }
        );

        if (!slot) {
            const existingSlot = await Slot.findById(req.params.id);

            if (!existingSlot) {
                return res.status(404).json({
                    message: "Slot not found"
                });
            }

            return res.status(409).json({
                message: "Slot is already booked"
            });
        }

        res.status(200).json({
            message: "Slot booked successfully",
            slot: slot
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error booking slot"
        });
    }
});

// Cancel a booking
router.post("/:id/cancel", protect, async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        if (!slot.isBooked) {
            return res.status(400).json({
                message: "Slot is not booked"
            });
        }

        if (String(slot.bookedBy) !== String(req.user.id)) {
            return res.status(403).json({
                message: "Only the user who booked this slot can cancel it"
            });
        }

        slot.isBooked = false;
        slot.bookedBy = null;

        await slot.save();

        res.status(200).json({
            message: "Booking cancelled successfully",
            slot: slot
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error cancelling booking"
        });
    }
});

module.exports = router;