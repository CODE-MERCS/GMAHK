const express = require("express");
const { validateFormData, 
  saveFormDataToDB,  getFormDataByBulan,
  getAllFormData,getFormDataById, saveToDraft,
  sendDraftToForm,
  getAllDrafts,
  getDraftByBulan,
  getDraftById,  } = require("../controllers/formController");
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
router.get("/data/:bulan/:tahun", authMiddleware, getFormDataByBulan);
router.get("/data/:id", authMiddleware, getFormDataById);


// Endpoint untuk menyimpan ke database jika semua validasi sukses
router.post("/save", authMiddleware, roleMiddleware("PENDETA"), saveFormDataToDB);

// Routes Draft
router.post(
  "/draft",
  authMiddleware,
  roleMiddleware("PENDETA"),
  saveToDraft
);

router.post(
  "/draft/send/:id",
  authMiddleware,
  roleMiddleware("PENDETA"),
  sendDraftToForm
);

router.get("/draft", authMiddleware, getAllDrafts);
router.get("/draft/bulan/:bulan", authMiddleware, getDraftByBulan);
router.get("/draft/:id", authMiddleware, getDraftById);

module.exports = router;
