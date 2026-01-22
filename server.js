const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('./models/gameModel');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log('✅ DB connection successful!'))
  .catch((err) => console.log('❌ DB connection error:', err.message));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});
