const express = require("express");
const { validateFormData, saveFormDataToDB } = require("../controllers/formController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer(); // Middleware untuk file upload
const router = express.Router();

router.post(
  "/validation/:category", 
  authMiddleware, 
  roleMiddleware("PENDETA"), 
  upload.single("image"), 
  validateFormData()
);

// Endpoint untuk menyimpan ke database jika semua validasi sukses
router.post("/save", authMiddleware, roleMiddleware("PENDETA"), saveFormDataToDB);

module.exports = router;
