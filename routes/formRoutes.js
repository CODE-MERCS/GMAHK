const express = require("express");
const { validateFormData, saveFormDataToDB,getAllFormData, getFormDataByBulan, getFormDataById  } = require("../controllers/formController");
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

router.get("/data", authMiddleware, getAllFormData);
router.get("/data/bulan/:bulan", authMiddleware, getFormDataByBulan);
router.get("/data/:id", authMiddleware, getFormDataById);


// Endpoint untuk menyimpan ke database jika semua validasi sukses
router.post("/save", authMiddleware, roleMiddleware("PENDETA"), saveFormDataToDB);

module.exports = router;
