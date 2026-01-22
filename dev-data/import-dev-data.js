const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Game = require('../models/gameModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const games = JSON.parse(
  fs.readFileSync(`${__dirname}/data/video_games_dataset.json`, 'utf-8'),
);

// IMPORT DATA
const importData = async () => {
  try {
    await Game.create(games);
    console.log('✅ Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA
const deleteData = async () => {
  try {
    await Game.deleteMany();
    console.log('🗑️ Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
