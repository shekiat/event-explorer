const express = require('express');
const Favorite = require('../server/models/Favorite');
const router = express.Router();

// Add a favorite
router.post('/', async (req, res) => {
  try {
    const favoriteData = { ...req.body };
    delete favoriteData._id; // Remove the _id field to avoid duplicate key errors

    // Check if the favorite already exists
    const existing = await Favorite.findOne({ id: favoriteData.id });
    if (existing) {
      return res.status(400).json({ error: 'Event is already in favorites' });
    }

    const favorite = new Favorite(favoriteData);
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding favorite' });
  }
});

// Get all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    console.log('Retrieved Favorites:', favorites); // Log the retrieved favorites
    
    res.json(favorites);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

module.exports = router;