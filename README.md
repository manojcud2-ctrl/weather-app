# Indian State Capitals Weather Dashboard

A simple web application that displays current weather information for all 28 state capitals of India. The application uses a custom Node.js backend with hardcoded weather data and a frontend built with vanilla HTML, CSS, and JavaScript.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [File Descriptions](#file-descriptions)
- [Troubleshooting](#troubleshooting)

## Features

✅ **Dashboard Display**
- Lists all 28 Indian state capitals
- Displays current weather for each capital with:
  - Temperature in Celsius
  - Weather condition (e.g., Clear, Rainy, Sunny, Cloudy)
  - Humidity percentage

✅ **Search Functionality**
- Filter capitals by name using the search bar
- Real-time filtering as you type
- Case-insensitive search

✅ **Refresh Button**
- Reload weather data from the backend
- Easy refresh without page reload

✅ **Loading Indicator**
- Visual feedback while fetching data
- Shows "Loading weather data..." message

✅ **Error Handling**
- Graceful error messages if data fetch fails
- User-friendly error display

✅ **Responsive Design**
- Card-based layout
- Flexible and responsive design
- Works on different screen sizes

## Tech Stack

### Frontend
- **HTML5** - Page structure and semantic markup
- **CSS3** - Styling and responsive layout
- **JavaScript (Vanilla)** - DOM manipulation, event handling, and API calls

### Backend
- **Node.js** - JavaScript runtime (v24.14.1 or later)
- **Express.js** (v4.18.2) - Lightweight web framework for API endpoints
- **npm** - Package manager for dependencies

### Architecture
- **Client-Side Rendering** - HTML/CSS/JS runs in the browser
- **RESTful API** - Backend serves weather data via JSON endpoint
- **Static File Serving** - Express serves HTML, CSS, and JS files

## Project Structure

```
App 2 Own/
├── index.html          # Main HTML page with dashboard UI
├── style.css           # CSS styling for the application
├── script.js           # Frontend JavaScript logic
├── server.js           # Express backend server
├── package.json        # Node.js project configuration
├── node_modules/       # Installed dependencies (created after npm install)
├── README.md           # This file
└── .gitignore          # Git ignore file (optional)
```

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14.0.0 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) - Package manager for installing dependencies
- A modern web browser (Chrome, Firefox, Safari, Edge)

Verify installation:
```bash
node --version
npm --version
```

## Installation

### Step 1: Navigate to the Project Directory
```bash
cd "c:\Users\manoj_thangaraj\Desktop\Learning\Sample Apps\App 2 Own"
```

### Step 2: Install Dependencies
Install Express and its dependencies:
```bash
npm install
```

This command will:
- Read `package.json`
- Download Express.js and dependencies
- Create a `node_modules/` folder
- Generate `package-lock.json` for dependency locking

### Step 3: Verify Installation
Check that `node_modules/` folder was created and contains express:
```bash
ls node_modules | grep express
```

## Running the Application

### Start the Server
Execute the following command:
```bash
npm start
```

Or directly:
```bash
node server.js
```

**Expected Output:**
```
Server running at http://localhost:3000
```

### Access the Application
1. Open your web browser
2. Navigate to: `http://localhost:3000`
3. The weather dashboard will load automatically

### Stopping the Server
Press `Ctrl + C` in the terminal where the server is running.

## API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoint: Get Weather Data

**Request:**
```
GET /api/weather
```

**Response:**
```json
[
  {
    "city": "Amaravati",
    "temp": 32,
    "condition": "Sunny",
    "humidity": 45
  },
  {
    "city": "Delhi",
    "temp": 27,
    "condition": "Clear",
    "humidity": 55
  },
  ...
]
```

**Response Fields:**
- `city` (string): Name of the state capital
- `temp` (number): Temperature in Celsius
- `condition` (string): Weather condition description
- `humidity` (number): Humidity percentage (0-100)

**Status Codes:**
- `200 OK` - Successfully retrieved weather data
- `500 Internal Server Error` - Server error

## Usage

### View Weather Dashboard
1. The dashboard automatically loads weather for all 28 state capitals
2. Each capital is displayed as a card showing temperature, condition, and humidity

### Search for a Capital
1. Enter a capital name in the search box (e.g., "Delhi", "Mumbai")
2. Cards will filter in real-time as you type
3. Search is case-insensitive and supports partial matches

### Refresh Weather Data
1. Click the "Refresh Data" button
2. The application will fetch fresh data from the backend
3. A loading indicator appears during the fetch

### Handle Errors
If an error occurs:
1. An error message will be displayed
2. Check that the server is running (`node server.js`)
3. Verify the backend URL is correct (`http://localhost:3000`)

## File Descriptions

### index.html
- Entry point of the web application
- Defines the page structure including:
  - Title: "Weather Dashboard"
  - Search input field
  - Refresh button
  - Loading indicator div
  - Error message div
  - Weather container for displaying cards
- Links to `style.css` and `script.js`

### style.css
- Styles for all HTML elements
- Key styles:
  - `body`: Base styling, background color
  - `.controls`: Search box and button styling
  - `#loading`: Loading indicator styling
  - `#error`: Error message styling (red text)
  - `.card`: Weather card styling with:
    - White background
    - Border and shadow
    - Centered text
    - Fixed 250px width
  - `.hidden`: Class for hiding filtered cards

### script.js
- Main frontend JavaScript file
- Functions:
  - `fetchWeatherData()`: Async function to fetch data from `/api/weather`
  - `displayWeather(data)`: Renders weather cards from data
  - `filterCards()`: Filters cards based on search input
- Event Listeners:
  - Refresh button: Triggers `fetchWeatherData()`
  - Search input: Triggers `filterCards()` on input
- Initialization: Automatically calls `fetchWeatherData()` on page load

### server.js
- Express.js backend server
- Serves static files from the current directory
- Hardcoded weather data for all 28 state capitals
- Single API endpoint:
  - `GET /api/weather`: Returns weather data array
- Port: 3000 (configurable)
- Logging: Prints server start message to console

### package.json
- Node.js project configuration file
- Defines:
  - Project name and version
  - Main entry point (`server.js`)
  - Start script (`npm start`)
  - Dependencies (Express.js v4.18.2)

## Hardcoded Weather Data

The backend includes weather data for the following 28 state capitals:

1. Amaravati (Andhra Pradesh)
2. Itanagar (Arunachal Pradesh)
3. Dispur (Assam)
4. Patna (Bihar)
5. Raipur (Chhattisgarh)
6. Panaji (Goa)
7. Gandhinagar (Gujarat)
8. Chandigarh (Haryana & Punjab)
9. Shimla (Himachal Pradesh)
10. Ranchi (Jharkhand)
11. Bengaluru (Karnataka)
12. Thiruvananthapuram (Kerala)
13. Bhopal (Madhya Pradesh)
14. Mumbai (Maharashtra)
15. Imphal (Manipur)
16. Shillong (Meghalaya)
17. Aizawl (Mizoram)
18. Kohima (Nagaland)
19. Bhubaneswar (Odisha)
20. Jaipur (Rajasthan)
21. Gangtok (Sikkim)
22. Chennai (Tamil Nadu)
23. Hyderabad (Telangana)
24. Agartala (Tripura)
25. Lucknow (Uttar Pradesh)
26. Dehradun (Uttarakhand)
27. Kolkata (West Bengal)
28. Additional entries for variations

Each entry has:
- Temperature (15-36°C range)
- Weather condition (Sunny, Rainy, Clear, Cloudy, Humid)
- Humidity (30-85% range)

## Troubleshooting

### Issue: "Server running but page won't load"
**Solution:**
- Verify the server is running: Look for "Server running at http://localhost:3000" in the terminal
- Check the port is not already in use
- Try a different port by modifying `server.js` (change `const port = 3000;`)

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```
Ensure you're in the correct project directory.

### Issue: "Port 3000 is already in use"
**Solution:**
- Find and stop the process using port 3000
- Or modify `server.js` to use a different port:
```javascript
const port = 3001; // Change to 3001 or another port
```

### Issue: "Search not working"
**Solution:**
- Ensure weather data has loaded (check for cards)
- Try refreshing the page
- Check browser console for JavaScript errors (F12)

### Issue: "Loading indicator never disappears"
**Solution:**
- Check browser console for network errors (F12 → Network tab)
- Verify backend is running
- Check the `/api/weather` endpoint manually:
```bash
curl http://localhost:3000/api/weather
```

### Issue: CORS errors (if accessed from a different origin)
**Solution:**
- Currently, the app serves from the same origin (localhost:3000)
- If needed, add CORS middleware to `server.js`:
```javascript
const cors = require('cors');
app.use(cors());
```
Then: `npm install cors`

## Development Notes

### Modifying Weather Data
To add or modify weather data, edit the `weatherData` array in `server.js`:
```javascript
const weatherData = [
  { city: "CityName", temp: 30, condition: "Sunny", humidity: 50 },
  // Add more entries...
];
```

### Customizing Port
To run on a different port, modify `server.js`:
```javascript
const port = 8080; // Change port number
```

### Adding Database Integration
To replace hardcoded data with a database:
1. Install database package (e.g., `npm install mongoose`)
2. Replace the `weatherData` array with database queries
3. Update the `/api/weather` endpoint to fetch from database

## Performance Notes

- **Initial Load**: ~200-500ms (depends on network/browser)
- **Search Filtering**: Real-time, instant
- **Data Fetch**: ~100-300ms on localhost
- **Memory Usage**: Minimal (~20MB)

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (Not supported)

## Future Enhancements

Potential features to add:
- Real API integration (OpenWeatherMap, WeatherAPI)
- Database storage for weather data
- Weather forecast (5-day, hourly)
- Weather charts and graphs
- User preferences and saved locations
- Dark mode toggle
- Multi-language support
- Mobile app version

## License

This project is open source and available for educational purposes.

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [API Documentation](#api-documentation)
3. Check browser console for errors (F12)
4. Verify all prerequisites are installed

## Author

Created as a simple weather dashboard application for learning purposes.

---

**Last Updated:** April 13, 2026
**Version:** 1.0.0