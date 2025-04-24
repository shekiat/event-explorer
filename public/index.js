// Function to search for events based on city
async function searchEvents() {
  const city = document.getElementById('searchInput').value;
  console.log('City entered:', city);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  try {
    const response = await fetch(`/api/events?city=${city}`);
    console.log('API Response:', response);
    const data = await response.json();
    console.log('Parsed Data:', data);

    if (data.events.length === 0) {
      resultsDiv.innerHTML = '<p>No events found for this city.</p>';
      return;
    }

    data.events.forEach((event) => {
      console.log('Event:', event);
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';

      const eventImage = event.images?.[0]?.url || 'https://via.placeholder.com/150';
      
      eventCard.innerHTML = `
      <div class="event-container">
        <img src="${eventImage}" alt="${event.name}" class="event-image" />
        <div class="event-details">
          <h3>${event.name}</h3>
          <p>${event.date} at ${event.venue}</p>
          <a href="${event.url}" target="_blank">More Info</a>
          <button onclick='saveEvent(${JSON.stringify(event)})'>Save Event</button>
        </div>
      </div>
    `;
    resultsDiv.appendChild(eventCard);
    });

  } catch (err) {
    console.error('Error fetching events:', err);
    resultsDiv.innerHTML = '<p>Error fetching events. Please try again later.</p>';
  }
}

// Function to save an event to favorites
async function saveEvent(event) {
  try {

    // Parse the event object if it's passed as a string
    if (typeof event === 'string') {
      event = JSON.parse(event);
    }

    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      alert('Event saved successfully!');
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Failed to save the event.');
    }
  } catch (err) {
    console.error('Error saving event:', err);
    alert('Error saving the event. Please try again later.');
  }
}

// Function to display saved events
async function showSavedEvents() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  try {
    const response = await fetch('/api/favorites');
    const data = await response.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p>No saved events found.</p>';
      return;
    }

    data.forEach((event) => {
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';

      // Define the eventImage variable
      const eventImage = event.images?.[0]?.url || 'https://via.placeholder.com/150';

      eventCard.innerHTML = `
        <div class="event-container">
          <img src="${eventImage}" alt="${event.name}" class="event-image" />
          <div class="event-details">
            <h3>${event.name}</h3>
            <p>${event.date} at ${event.venue}</p>
            <a href="${event.url}" target="_blank">More Info</a>
            <button onclick='saveEvent(${JSON.stringify(event)})'>Save Event</button>
          </div>
      </div>
      `;
      resultsDiv.appendChild(eventCard);
    });
  } catch (err) {
    console.error('Error fetching saved events:', err);
    resultsDiv.innerHTML = '<p>Error fetching saved events.</p>';
  }
}

// Function to fetch and display events in different sections
async function loadHomePageEvents() {
  try {
    const response = await fetch('/api/events?city=detroit'); // Replace 'defaultCity' with a default city
    const data = await response.json();

    // Populate Featured Events
    const featuredContainer = document.querySelector('#featuredEvents .event-container');
    data.events.slice(0, 5).forEach((event) => {
      const eventCard = createEventCard(event);
      featuredContainer.appendChild(eventCard);
    });

    // Populate Concerts
    const concertsContainer = document.querySelector('#concerts .event-container');

    console.log("Categories found:", data.events.map(e => e.category));
    console.log(JSON.stringify(eventsRaw[0], null, 2));

    data.events
      .filter((event) => event.category === 'Concerts') 
      .slice(0, 5)
      .forEach((event) => {
        const eventCard = createEventCard(event);
        concertsContainer.appendChild(eventCard);
      });

    // Populate Sports
    const sportsContainer = document.querySelector('#sports .event-container');
    data.events
      .filter((event) => event.category === 'Sports') 
      .slice(0, 5)
      .forEach((event) => {
        const eventCard = createEventCard(event);
        sportsContainer.appendChild(eventCard);
      });

    // Populate Theater
    const theaterContainer = document.querySelector('#theater .event-container');
    data.events
      .filter((event) => event.category === 'Theater') 
      .slice(0, 5)
      .forEach((event) => {
        const eventCard = createEventCard(event);
        theaterContainer.appendChild(eventCard);
      });
  } catch (err) {
    console.error('Error loading events:', err);
  }
}

// Helper function to create an event card
function createEventCard(event) {
  const eventCard = document.createElement('div');
  eventCard.className = 'event-card';

  const eventImage = event.images?.[0]?.url || 'https://via.placeholder.com/150';
  eventCard.innerHTML = `
    <div class="event-container">
      <img src="${eventImage}" alt="${event.name}" class="event-image" />
      <div class="event-details">
        <h3>${event.name}</h3>
        <p>${event.date} at ${event.venue}</p>
        <a href="${event.url}" target="_blank">More Info</a>
        <button onclick='saveEvent(${JSON.stringify(event)})'>Save Event</button>
      </div>
    </div>
  `;
  return eventCard;
}

// Load events when the page loads
window.onload = loadHomePageEvents;