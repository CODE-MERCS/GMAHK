const express = require("express");
const { createFormData } = require("../controllers/formController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer(); // Middleware untuk file upload
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("PENDETA"),
  upload.single("image"),
  createFormData
);

module.exports = router;
