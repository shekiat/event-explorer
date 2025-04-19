// 
const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', async (req, res) => {
  const { id, name, date, venue, url } = req.body;
  try {
    const newEvent = new Event({ id, name, date, venue, url });
    await newEvent.save();
    res.json({ message: 'Event saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving event' });
  }
});

module.exports = router;
