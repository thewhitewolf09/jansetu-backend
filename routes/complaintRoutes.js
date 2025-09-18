import express from "express";
import multer from "multer";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus,
  getNearbyComplaints,
} from "../controllers/complaintController.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Citizen routes
router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  createComplaint
);

router.get("/mine", getMyComplaints);
router.get("/nearby", getNearbyComplaints);

// Authority routes
router.patch("/:id/status", updateStatus);
router.get("/", getAllComplaints);


export default router;
