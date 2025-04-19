// !! Incomplete code !!
const express = require('express');
const axios = require('axios');
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Server is running!');
});


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

    const events = response.data._embedded?.events.map(e => ({
      id: e.id,
      name: e.name,
      date: e.dates.start.localDate,
      venue: e._embedded.venues[0].name,
      url: e.url
    })) || [];

    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

module.exports = router;

