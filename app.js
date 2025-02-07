const express = require("express");
const cors = require("cors"); 
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const app = express();

// Middleware untuk mengizinkan CORS dengan credentials (cookies)
app.use(cors({
  origin: "http://localhost:5173", // Sesuaikan dengan URL frontend Anda
  credentials: true, // Izinkan cookies dikirim dalam request
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));


// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/form", formRoutes);


// Static files (jika diperlukan)
app.use("/public", express.static(path.join(__dirname, "../public")));

module.exports = app;
