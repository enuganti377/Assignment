const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { Eventmodel } = require("../db");

// GET ALL EVENTS
router.get("/", authMiddleware, async (req, res) => {
  const events = await Eventmodel.find();
  res.json(events);
});

// CREATE EVENT
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, dateTime, location, capacity } = req.body;

  if (!title || !description || !dateTime || !location || !capacity) {
    return res.status(400).json({ message: "All fields required" });
  }

  const event = await Eventmodel.create({
    title,
    description,
    dateTime,
    location,
    capacity,
    createdBy: req.userId,
  });

  res.json(event);
});

// UPDATE EVENT
router.put("/:id", authMiddleware, async (req, res) => {
  const event = await Eventmodel.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  if (event.createdBy.toString() !== req.userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  Object.assign(event, req.body);
  await event.save();
  res.json(event);
});

// DELETE EVENT
router.delete("/:id", authMiddleware, async (req, res) => {
  const event = await Eventmodel.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  if (event.createdBy.toString() !== req.userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  await Eventmodel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
