const express = require('express');
const gameController = require('../controllers/gameController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Middleware to alias top 5 games
const aliasTopGames = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating,price';
  req.query.fields = 'title,price,rating,company';
  next();
};

//Special routes

router.get('/top-5', aliasTopGames, gameController.getTop5Games);
router.get('/stats', gameController.getGameStats);
router.get('/by-company', gameController.getGamesByCompany);
router.get('/by-year/', gameController.getGamesByYear);

// CRUD
router
  .route('/')
  .get(gameController.getAllGames)
  .post(gameController.createGame);

router
  .route('/:id')
  .get(gameController.getGame)
  .patch(gameController.updateGame)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    gameController.deleteGame,
  );

module.exports = router;
