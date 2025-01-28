const express = require("express");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/form", formRoutes);


// Static files (jika diperlukan)
app.use("/public", express.static(path.join(__dirname, "../public")));

module.exports = app;
