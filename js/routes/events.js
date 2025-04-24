const express = require('express');
const axios = require('axios');
const router = express.Router();
const Event = require('../server/models/Event');

router.get('/', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(

      `https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          city,
          size: 10
        }
      }
    );

    const embedded = response.data._embedded;
    const eventsRaw = embedded?.events || [];
    const events = [];

    

    for (let e of eventsRaw) {
      // Fetch images for the specific event using its ID
      
      const eventData = {
        id: e.id,
        name: e.name,
        date: e.dates.start.localDate,
        venue: e._embedded?.venues?.[0]?.name || 'Unknown Venue',
        url: e.url,
        images: e.images || [],
        category
      };

      // Save if it doesn't already exist
      const existing = await Event.findOne({ id: eventData.id });
      if (!existing) {
        await Event.create(eventData);
      }

      events.push(eventData);
    }

    res.json({ events });

  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

module.exports = router;