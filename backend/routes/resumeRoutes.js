const express = require("express");

const multer = require("multer");

const uploadFileToAzure = require("../services/blobService");

const Resume = require("../models/Resume");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

// Upload Resume API
router.post(
  "/upload",

  authMiddleware,

  upload.single("resume"),

  async (req, res) => {

    try {

      // Upload To Azure
      const fileUrl =
        await uploadFileToAzure(req.file);

      // Save Metadata To MongoDB
      const newResume = new Resume({

        userId: req.user.id,

        fileName: req.file.originalname,

        fileUrl,

      });

      await newResume.save();

      res.json({

        message: "Resume Uploaded Successfully",

        fileUrl,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload Failed",
      });

    }

  }
);

// Get User Resumes API
router.get(
  "/my-resumes",

  authMiddleware,

  async (req, res) => {

    try {

      // Find resumes for logged-in user
      const resumes = await Resume.find({

        userId: req.user.id,

      });

      res.json(resumes);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);

// Get All Resumes (Admin Only)
router.get(
  "/all",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {

    try {

      const resumes = await Resume.find();

      res.json(resumes);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);

// Verify Resume API
router.put(
  "/verify/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {

    try {

      const { status } = req.body;

      const updatedResume =
        await Resume.findByIdAndUpdate(

          req.params.id,

          { status },

          { new: true }

        );

      res.json({

        message: "Resume Updated",

        updatedResume,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);

module.exports = router;