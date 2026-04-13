const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Hardcoded weather data for Indian state capitals
const weatherData = [
  { city: "Amaravati", temp: 32, condition: "Sunny", humidity: 45 },
  { city: "Itanagar", temp: 25, condition: "Cloudy", humidity: 70 },
  { city: "Dispur", temp: 28, condition: "Rainy", humidity: 80 },
  { city: "Patna", temp: 35, condition: "Clear", humidity: 40 },
  { city: "Raipur", temp: 30, condition: "Sunny", humidity: 50 },
  { city: "Panaji", temp: 29, condition: "Clear", humidity: 65 },
  { city: "Gandhinagar", temp: 34, condition: "Sunny", humidity: 35 },
  { city: "Chandigarh", temp: 27, condition: "Cloudy", humidity: 55 },
  { city: "Shimla", temp: 18, condition: "Rainy", humidity: 75 },
  { city: "Ranchi", temp: 26, condition: "Cloudy", humidity: 60 },
  { city: "Bengaluru", temp: 24, condition: "Clear", humidity: 50 },
  { city: "Thiruvananthapuram", temp: 31, condition: "Sunny", humidity: 70 },
  { city: "Bhopal", temp: 33, condition: "Clear", humidity: 40 },
  { city: "Mumbai", temp: 30, condition: "Humid", humidity: 75 },
  { city: "Imphal", temp: 22, condition: "Rainy", humidity: 85 },
  { city: "Shillong", temp: 20, condition: "Cloudy", humidity: 80 },
  { city: "Aizawl", temp: 23, condition: "Rainy", humidity: 78 },
  { city: "Kohima", temp: 21, condition: "Cloudy", humidity: 72 },
  { city: "Bhubaneswar", temp: 32, condition: "Sunny", humidity: 55 },
  { city: "Chandigarh", temp: 27, condition: "Cloudy", humidity: 55 }, // Duplicate for Punjab
  { city: "Jaipur", temp: 36, condition: "Clear", humidity: 30 },
  { city: "Gangtok", temp: 19, condition: "Rainy", humidity: 85 },
  { city: "Chennai", temp: 33, condition: "Sunny", humidity: 60 },
  { city: "Hyderabad", temp: 31, condition: "Clear", humidity: 45 },
  { city: "Agartala", temp: 29, condition: "Cloudy", humidity: 75 },
  { city: "Lucknow", temp: 34, condition: "Clear", humidity: 35 },
  { city: "Dehradun", temp: 26, condition: "Rainy", humidity: 65 },
  { city: "Kolkata", temp: 30, condition: "Humid", humidity: 70 }
];

// API endpoint to get weather data
app.get('/api/weather', (req, res) => {
  res.json(weatherData);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});