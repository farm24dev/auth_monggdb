const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const verifyToken = require('../middlewares/authMiddleware');


// Get Profile (ตรวจสอบ token ก่อน)
router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;