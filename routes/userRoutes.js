const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// Optional (admin only)
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers,
);

module.exports = router;
