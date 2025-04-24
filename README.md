# Events Explorer

Events Explorer is a web application that allows users to search for events in their city, save favorite events, and explore featured events, concerts, sports, and theater events.

## Features

- **Search Events**: Search for events by entering a city name.
- **Save Favorites**: Save events to your favorites list for easy access later.
- **Explore Categories**: Browse events by categories such as Featured Events, Concerts, Sports, and Theater.
- **Responsive Design**: The application is designed to work seamlessly on both desktop and mobile devices.

## Project Structure
. ├── .env # Environment variables ├── .gitignore # Git ignore file ├── package.json # Node.js dependencies and scripts ├── server.js # Main server file ├── public/ # Frontend files │ ├── index.html # Main HTML file │ ├── index.js # Frontend JavaScript │ └── css/ # CSS styles │ └── styles.css # Main stylesheet ├── js/ # Backend files │ ├── routes/ # API routes │ │ ├── events.js # Events API routes │ │ └── favorites.js # Favorites API routes │ └── server/ # Models │ └── models/ │ ├── Event.js # Event model │ └── Favorite.js # Favorite model └── screenshots/ # Screenshots of the application

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- External API: Ticketmaster API

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project4

2. Install dependencies:
   npm install

3. Create a .env file in the root directory and add the following:
    PORT=3000
    MONGO_URI=<your-mongodb-uri>
    TICKETMASTER_API_KEY=<your-ticketmaster-api-key>

4. Start the server:
   npm start

## Backend Overview
The backend of Events Explorer is built using Node.js and Express.js. It handles API requests, communicates with the MongoDB database, and integrates with the Ticketmaster API to fetch event data.

### Key Components
Routes:

events.js: Handles requests to fetch events from the Ticketmaster API based on the city provided by the user.
favorites.js: Manages CRUD operations for saving and retrieving favorite events from the database.

Models:

Event.js: Defines the schema for event data fetched from the Ticketmaster API.
Favorite.js: Defines the schema for favorite events saved by users.

Database:

The application uses MongoDB as its database to store user favorites. The connection to the database is managed using the Mongoose library.

Environment Variables:

The backend uses environment variables stored in a .env file to manage sensitive information such as the MongoDB connection string and the Ticketmaster API key.

External API Integration:

The backend integrates with the Ticketmaster API to fetch real-time event data. The API key is required and must be configured in the .env file.

API Endpoints
Events API
GET /api/events?city={city}: Fetch events for a specific city using the Ticketmaster API.
Favorites API
POST /api/favorites: Save an event to the user's favorites list.
GET /api/favorites: Retrieve all saved favorite events from the database.
Error Handling
The backend includes error-handling middleware to manage issues such as invalid API requests, database connection errors, and missing data.

Security
CORS: Configured to allow requests from the frontend.
Environment Variables: Sensitive data like API keys and database URIs are stored securely in a .env file.
   ```bash
   git clone <repository-url>
   cd project4
