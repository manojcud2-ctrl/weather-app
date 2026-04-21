const request = require('supertest');
const express = require('express');
const app = express();

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
  { city: "Chandigarh", temp: 27, condition: "Cloudy", humidity: 55 },
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

describe('Weather API', () => {
  describe('GET /api/weather', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/api/weather');
      expect(response.statusCode).toBe(200);
    });

    test('should return an array of weather objects', async () => {
      const response = await request(app).get('/api/weather');
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 28 weather entries', async () => {
      const response = await request(app).get('/api/weather');
      expect(response.body).toHaveLength(28);
    });

    test('should return objects with required fields', async () => {
      const response = await request(app).get('/api/weather');
      response.body.forEach(item => {
        expect(item).toHaveProperty('city');
        expect(item).toHaveProperty('temp');
        expect(item).toHaveProperty('condition');
        expect(item).toHaveProperty('humidity');
      });
    });

    test('should have correct data types', async () => {
      const response = await request(app).get('/api/weather');
      response.body.forEach(item => {
        expect(typeof item.city).toBe('string');
        expect(typeof item.temp).toBe('number');
        expect(typeof item.condition).toBe('string');
        expect(typeof item.humidity).toBe('number');
      });
    });

    test('should return Amaravati as first entry', async () => {
      const response = await request(app).get('/api/weather');
      expect(response.body[0].city).toBe('Amaravati');
      expect(response.body[0].temp).toBe(32);
      expect(response.body[0].condition).toBe('Sunny');
      expect(response.body[0].humidity).toBe(45);
    });

    test('should have temperature within reasonable range', async () => {
      const response = await request(app).get('/api/weather');
      response.body.forEach(item => {
        expect(item.temp).toBeGreaterThan(0);
        expect(item.temp).toBeLessThan(50);
      });
    });

    test('should have humidity between 0 and 100', async () => {
      const response = await request(app).get('/api/weather');
      response.body.forEach(item => {
        expect(item.humidity).toBeGreaterThanOrEqual(0);
        expect(item.humidity).toBeLessThanOrEqual(100);
      });
    });

    test('should return JSON content type', async () => {
      const response = await request(app).get('/api/weather');
      expect(response.type).toBe('application/json');
    });
  });
});
