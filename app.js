const express = require("express");
const cors = require("cors"); 
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/form", formRoutes);

// Middleware untuk mengizinkan CORS
app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));

// Static files (jika diperlukan)
app.use("/public", express.static(path.join(__dirname, "../public")));

module.exports = app;
