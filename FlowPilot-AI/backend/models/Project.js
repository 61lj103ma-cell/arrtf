const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 500, default: "" },
  status: { type: String, enum: ["Active", "Draft", "Completed"], default: "Active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);
