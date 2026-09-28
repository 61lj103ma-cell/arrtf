const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);

router.post("/chat", async (req, res) => {
  const prompt = String(req.body.prompt || "").trim();
  if (!prompt) return res.status(400).json({ message: "Prompt is required." });

  // Demo response. Replace this function with your preferred AI provider API.
  const response =
    `FlowPilot analyzed your request: "${prompt}". ` +
    `This demo endpoint is ready to be connected to a production AI model.`;

  res.json({
    response,
    provider: "demo",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
