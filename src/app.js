const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//routes

const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB blog database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", contactRoutes);

// Routes

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
