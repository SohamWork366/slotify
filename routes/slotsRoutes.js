const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");

router.use(express.json());

router.get("/", async (req, res) => {
    try {
        const slots = await Slot.find();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: "Error fetching slots" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }

        res.json(slot);
    } catch (error) {
        res.status(500).json({ message: "Error fetching slot" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { date, time, duration } = req.body;

        if (!date || !time || !duration) {
            return res.status(400).json({
                message: "date, time and duration are required"
            });
        }

        const slot = await Slot.create({
            date,
            time,
            duration
        });

        res.status(201).json(slot);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating slot" });
}
});

router.delete("/:id", async (req, res) => {
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

module.exports = router;