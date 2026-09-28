const express = require("express");
const auth = require("../middleware/auth");
const Project = require("../models/Project");

const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  const projects = await Project.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json({ projects });
});

router.post("/", async (req, res) => {
  const { name, description, status } = req.body;
  if (!name) return res.status(400).json({ message: "Project name is required." });

  const project = await Project.create({
    userId: req.userId,
    name,
    description: description || "",
    status: status || "Active"
  });
  res.status(201).json({ project });
});

router.delete("/:id", async (req, res) => {
  const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!deleted) return res.status(404).json({ message: "Project not found." });
  res.json({ message: "Project deleted." });
});

module.exports = router;
