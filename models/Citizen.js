import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        aadhaar: { type: String, required: true, unique: true },
        mobile: { type: String, required: true },
        email: { type: String },
        rewards: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Citizen", citizenSchema);
