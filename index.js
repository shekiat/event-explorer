// Button functionality to search for events
async function searchEvents() {
    const city = document.getElementById("searchInput").value;
    const res = await fetch(`/api/events?city=${city}`);
    const data = await res.json();
  
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = '';
  
    data.events.forEach(event => {
      const div = document.createElement("div");
      div.className = "event-card";
      div.innerHTML = `
        <h3>${event.name}</h3>
        <p>${event.date}</p>
        <p>${event.venue}</p>
        <button onclick='saveEvent(${JSON.stringify(event)})'>Save</button>
      `;
      resultsDiv.appendChild(div);
    });
  }
  
  async function saveEvent(eventData) {
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    alert("Saved!");
  }
  