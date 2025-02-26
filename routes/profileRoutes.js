const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { updateUserProfile, getUserProfile } = require('../controllers/profileController');

// GET untuk mengambil data profil
router.get('/', authMiddleware, getUserProfile);

// PATCH untuk update profil
router.patch('/', authMiddleware, updateUserProfile);

module.exports = router;
