const Game = require('../models/gameModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// GET /api/v1/games
exports.getAllGames = catchAsync(async (req, res) => {
  const features = new APIFeatures(Game.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const games = await features.query;

  res.status(200).json({
    status: 'success',
    results: games.length,
    data: { games },
  });
});

// GET /api/v1/games/:id
exports.getGame = catchAsync(async (req, res, next) => {
  const game = await Game.findById(req.params.id);

  if (!game) return next(new AppError('No game found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { game },
  });
});

// POST /api/v1/games
exports.createGame = catchAsync(async (req, res) => {
  const newGame = await Game.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { game: newGame },
  });
});

// PATCH /api/v1/games/:id
exports.updateGame = catchAsync(async (req, res, next) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!game) return next(new AppError('No game found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { game },
  });
});

// DELETE /api/v1/games/:id
exports.deleteGame = catchAsync(async (req, res, next) => {
  const game = await Game.findByIdAndDelete(req.params.id);

  if (!game) return next(new AppError('No game found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//GET /api/v1/games/top-5
exports.getTop5Games = catchAsync(async (req, res) => {
  const games = await Game.find()
    .sort('-rating,-releaseYear')
    .limit(5)
    .select('title rating price releaseYear type company');

  res.status(200).json({
    status: 'success',
    results: games.length,
    data: { games },
  });
});

//GET /api/v1/games/stats (aggregation)
exports.getGameStats = catchAsync(async (req, res) => {
  const stats = await Game.aggregate([
    {
      $group: {
        _id: '$type',
        numGames: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgRating: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
exports.getGamesByCompany = catchAsync(async (req, res) => {
  const data = await Game.aggregate([
    {
      $group: {
        _id: '$company',
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
    { $sort: { count: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: { data },
  });
});

exports.getGamesByYear = catchAsync(async (req, res) => {
  const data = await Game.aggregate([
    {
      $group: {
        _id: '$releaseYear',
        numGames: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgPrice: { $avg: '$price' },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: { data },
  });
});
