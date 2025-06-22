import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js"; // ✅ Import your route file
const app = express();

app.use('/api/courses', courseRoutes);


// Load environment variables
dotenv.config();


const PORT = process.env.PORT || 4000;
const URI = process.env.MongoURI;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Enable JSON parsing

// MongoDB Connection
mongoose.connect(URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/courses", courseRoutes); // ✅ Connect course API

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("🎉 Vibe Education Backend Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`);
});
