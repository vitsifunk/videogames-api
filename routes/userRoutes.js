const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

// Public auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Logged-in user routes
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// Admin-only route

router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers,
);

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

module.exports = router;
