```markdown
# 📡 JanSetu Backend

Backend service for **JanSetu – Citizen to Government Bridge**  
Handles complaint submissions, file uploads (photo/audio), authority dashboards, analytics, and escalation workflows.

---

## 🚀 Tech Stack

- **Node.js + Express.js** — API framework
- **MongoDB + Mongoose** — Database & ODM
- **Multer** — File upload handling
- **dotenv** — Environment configuration
- **CORS** — Cross-origin support

---

## 📂 Project Structure

```
backend/
├── models/              # Mongoose schemas
│   └── Complaint.js
├── controllers/         # Route logic
│   └── complaintController.js
├── routes/              # Express routers
│   └── complaintRoutes.js
├── uploads/             # Uploaded photos & audio
├── server.js            # Entry point
├── .env                 # Environment variables
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-org/jansetu-backend.git
cd jansetu-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jansetu
CLIENT_URL=http://localhost:5173
```

### 4. Run the server

```bash
npm run dev   # with nodemon
# or
npm start
```

---

## 📡 API Endpoints

### Citizen APIs

- `POST /api/complaints` — Create new complaint (with optional photo/audio)
- `GET /api/complaints/mine?citizenId=123` — Get all complaints by citizen
- `GET /api/complaints/nearby?lat=28.6&lng=77.3&radius=2` — Complaints within radius (km)

### Authority APIs

- `GET /api/complaints` — Get all complaints
- `PATCH /api/complaints/:id/status` — Update complaint status (`pending → in-progress → resolved`)

---

## 🖼️ File Uploads

- Uploaded **photos** and **audio** are stored in `/uploads` directory.
- Response includes `photoUrl` and `audioUrl`:

```json
{
  "description": "Road is broken",
  "photoUrl": "/uploads/1758170056357-hero.png",
  "audioUrl": null
}
```

- On frontend, serve with base API URL:

```js
<img src={`${import.meta.env.VITE_API_URL}${complaint.photoUrl}`} />
```

---

## 📊 Complaint Schema

```js
{
  citizen: ObjectId,   // Citizen reference
  description: String,
  category: "road" | "garbage" | "water" | "other",
  photoUrl: String,
  audioUrl: String,
  location: {
    type: "Point",
    coordinates: [lng, lat],
    address: String
  },
  status: "pending" | "in-progress" | "resolved",
  assignedTo: ObjectId,  // Authority reference
  votes: Number,
  timestamps: true
}
```

---

## 📈 Next Steps

- [x] Complaint analytics (reported vs resolved, leaderboard, heatmap)
- [ ] JWT authentication for citizens & authorities
- [ ] Escalation workflow (auto-escalate unresolved issues)
- [ ] Multi-language support in APIs

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch

    ```bash
    git checkout -b feature-name
    ```

3. Commit changes

    ```bash
    git commit -m 'add feature'
    ```

4. Push branch

    ```bash
    git push origin feature-name
    ```

5. Open a Pull Request 🚀

---

## 📜 License

MIT © 2025 JanSetu
```
