const express = require("express");

const router = express.Router();

const slots = require("../data/slots");

router.get("/", (req, res) => {
    res.json(slots);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const slot = slots.find(slot => slot.id === id);

    if (!slot) {
        return res.status(404).json({
            message: "Slot not found"
        });
    }

    res.json(slot);
});

router.post("/", (req, res) => {
    if (!req.body.date || !req.body.time || !req.body.duration) {
    return res.status(400).json({
        message: "Date, time and duration are required"
    });
}
    const newSlot = {
        id: slots.length + 1,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        isBooked: false
    };

    slots.push(newSlot);

    res.status(201).json(newSlot);
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = slots.findIndex(slot => slot.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Slot not found"
        });
    }

    const deletedSlot = slots.splice(index, 1);

    res.json({
        message: "Slot deleted successfully",
        slot: deletedSlot[0]
    });
});

module.exports = router;