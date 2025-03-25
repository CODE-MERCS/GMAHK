const express = require("express");
const { validateFormData, 
  saveFormDataToDB,  getFormDataByBulan,
  getAllFormData,getFormDataById, saveToDraft,
  sendDraftToForm,
  getAllDrafts,
  getDraftByBulan,
  getDraftById, validateDraftField, approveFormData, getApprovedFormData } = require("../controllers/formController");
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

// Draft-specific validation route
router.post(
  "/draft/:draftId/validate/:category", 
  authMiddleware, 
  roleMiddleware("PENDETA"), 
  upload.single("image"), 
  validateDraftField
);

// Pindahkan rute /data/approved SEBELUM rute /data/:id
router.get("/data", authMiddleware, getAllFormData);
router.get("/data/approved", authMiddleware, getApprovedFormData); // <-- Ini harus di atas
router.get("/data/:bulan/:tahun", authMiddleware, getFormDataByBulan);
router.get("/data/:id", authMiddleware, getFormDataById); // <-- Ini di bawah


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

// Approval oleh Sekretaris
router.put(
  "/data/:id/approve",
  authMiddleware,
  roleMiddleware("SEKRETARIS"),
  approveFormData
);



module.exports = router;
