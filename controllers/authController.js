import Citizen from "../models/Citizen.js";
import Authority from "../models/Authority.js";

// Citizen / Authority Signup
export const signup = async (req, res) => {
  try {
    const { type, name, aadhaar, email, department, mobile } = req.body;

    if (type === "citizen") {
      const citizen = new Citizen({ name, aadhaar, mobile });
      await citizen.save();
      return res.status(201).json(citizen);
    }

    if (type === "authority") {
      const authority = new Authority({ name, email, department });
      await authority.save();
      return res.status(201).json(authority);
    }

    return res.status(400).json({ message: "Invalid user type" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Citizen / Authority Login (mock for now, just finds by identifier)
export const login = async (req, res) => {
  try {
    const { type, aadhaar, email } = req.body;

    if (type === "citizen") {
      const citizen = await Citizen.findOne({ aadhaar });
      if (!citizen) return res.status(404).json({ message: "Citizen not found" });
      return res.json(citizen);
    }

    if (type === "authority") {
      const authority = await Authority.findOne({ email });
      if (!authority) return res.status(404).json({ message: "Authority not found" });
      return res.json(authority);
    }

    return res.status(400).json({ message: "Invalid user type" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in user (mock, normally needs auth middleware)
export const me = async (req, res) => {
  res.json({ message: "User details endpoint (to be implemented with JWT later)" });
};
