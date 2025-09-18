import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: "Citizen", required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["road", "garbage", "water", "other"],
      default: "other",
      required: true,
    },
    photoUrl: { type: String },
    audioUrl: { type: String },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" }, // [lng, lat]
      address: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Authority" },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
