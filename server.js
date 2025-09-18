import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jansetu-frontend.vercel.app",
      "https://jansetu.vercel.app",
      "https://jansetu-portal.vercel.app"
    ],
    credentials: true,
  })
);



// Expose uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => res.send("JanSetu API running"));

export default app;
