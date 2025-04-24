const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./js/routes/events');
const favoriteRoutes = require('./js/routes/favorites');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/favorites', favoriteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
