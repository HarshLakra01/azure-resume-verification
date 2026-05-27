const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },

  fileName: {
    type: String,
    required: true,
  },

  fileUrl: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Resume", ResumeSchema);