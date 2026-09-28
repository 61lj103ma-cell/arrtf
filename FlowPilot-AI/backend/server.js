require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "FlowPilot AI API", time: new Date().toISOString() });
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✓ FlowPilot AI running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

start();
