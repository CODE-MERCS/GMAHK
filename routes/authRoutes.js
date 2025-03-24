const express = require('express');
const { register, login, logout ,getPendetaNames} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/pendeta', getPendetaNames);


module.exports = router;
