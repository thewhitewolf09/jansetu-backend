import Complaint from "../models/Complaint.js";

// Citizen → create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { citizenId, description, category, lat, lng, address } = req.body;

    if (!category) return res.status(400).json({ message: "Category is required" });
    if (!description && !req.files?.photo && !req.files?.audio) {
      return res.status(400).json({
        message: "Complaint must have description OR photo OR audio",
      });
    }

    const complaint = new Complaint({
      citizen: citizenId,
      description,
      category,
      photoUrl: req.files?.photo
        ? `/uploads/${req.files.photo[0].filename}`
        : null,
      audioUrl: req.files?.audio
        ? `/uploads/${req.files.audio[0].filename}`
        : null,
      location: lat && lng ? {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
        address,
      } : null,
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    console.error("Complaint save error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Citizen → get their complaints
export const getMyComplaints = async (req, res) => {
  try {
    const { citizenId } = req.query;
    const complaints = await Complaint.find({ citizen: citizenId }).populate("assignedTo");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Authority → get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("citizen")
      .populate("assignedTo");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Authority → update complaint status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    if (status) complaint.status = status;
    if (assignedTo) complaint.assignedTo = assignedTo;

    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Citizen → get nearby complaints (within X km)
export const getNearbyComplaints = async (req, res) => {
  try {
    const { lat, lng, radius = 2 } = req.query; // radius in km
    if (!lat || !lng) return res.status(400).json({ message: "lat & lng required" });

    const complaints = await Complaint.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radius * 1000,
        },
      },
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
