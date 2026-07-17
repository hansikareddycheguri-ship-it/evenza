import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("Evenza Backend RunAning");
});

const PORT = process.env.PORT || 5000;

