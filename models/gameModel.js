const e = require('cors');
const slugify = require('slugify');
const mongoose = require('mongoose');
const validator = require('validator');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A game must have a title'],
      unique: true,
      trim: true,
      maxlength: [120, 'A title must have at most 120 characters'],
    },
    releaseYear: {
      type: Number,
      required: [true, 'A game must have a release year'],
      min: [1950, 'Release year seems too old'],
      max: [
        new Date().getFullYear() + 1,
        'Release year seems too far in the future',
      ],
    },
    rating: {
      type: Number,
      required: [true, 'A game must have a rating'],
      min: [0, 'Rating must be >= 0'],
      max: [10, 'Rating must be <= 10'],
    },
    online: {
      type: Boolean,
      required: [true, 'A game must have online field'],
    },
    company: {
      type: String,
      required: [true, 'A game must have a company'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'A game must have a type'],
      trim: true,
    },
    completionTime: {
      type: Number,
      required: [true, 'A game must have a completion time'],
      min: [0, 'Completion time must be >= 0'],
    },
    description: {
      type: String,
      required: [true, 'A game must have a description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A game must have a price'],
      min: [0, 'Price must be >= 0'],
    },
    consoles: {
      type: [String],
      required: [true, 'A game must have consoles'],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0;
        },
        message: 'A game must have at least one console',
      },
    },
    difficulty: {
      type: String,
      required: [true, 'A game must have a difficulty'],
      trim: true,
      enum: {
        values: ['Easy', 'Medium', 'Hard', 'Extreme'],
        message:
          'Difficulty must be one of the following: Easy, Medium, Hard, Extreme',
      },
    },

    images: {
      type: [String],
      required: [true, 'A game must have images'],
      validate: {
        validator: (arr) =>
          arr.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/.test(url),
          ),
        message: 'All images must be valid URLs',
      },
    },
    genreTags: {
      type: [String],
      required: [true, 'A game must have genre tags'],
    },
    multiplayerModes: {
      type: [String],
      required: [true, 'A game must have multiplayer modes'],
    },
    languages: {
      type: [String],
      required: [true, 'A game must have languages'],
    },
    metacriticURL: {
      type: String,
      required: [true, 'A game must have a metacritic URL'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/(www\.)?metacritic\.com\/.+$/.test(v);
        },
        message: 'Invalid Metacritic URL',
      },
    },
    awards: {
      type: [String],
      required: [true, 'A game must have awards'],
    },
    availableOnStore: {
      type: Boolean,
      required: [true, 'A game must have availableOnStore field'],
    },
    ageRating: {
      type: String,
      required: [true, 'A game must have an age rating'],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual property to calculate value score (rating divided by price)
gameSchema.virtual('valueScore').get(function () {
  if (!this.price) return null;
  return this.rating / this.price;
});

// Indexes for performance optimization
gameSchema.index({ rating: -1, price: 1 });
gameSchema.index({ type: 1 });
gameSchema.index({ company: 1 });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
