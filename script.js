// List of Indian state capitals
const capitals = [
  "Amaravati", "Itanagar", "Dispur", "Patna", "Raipur", "Panaji", "Gandhinagar", "Chandigarh", "Shimla", "Ranchi",
  "Bengaluru", "Thiruvananthapuram", "Bhopal", "Mumbai", "Imphal", "Shillong", "Aizawl", "Kohima", "Bhubaneswar",
  "Chandigarh", "Jaipur", "Gangtok", "Chennai", "Hyderabad", "Agartala", "Lucknow", "Dehradun", "Kolkata"
];

// DOM elements
const searchInput = document.getElementById('search');
const refreshButton = document.getElementById('refresh');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const container = document.getElementById('weather-container');

// Function to fetch weather data
async function fetchWeatherData() {
  try {
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    const response = await fetch('/api/weather');
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorDiv.textContent = 'Error loading weather data: ' + error.message;
    errorDiv.style.display = 'block';
  } finally {
    loadingDiv.style.display = 'none';
  }
}

// Function to display weather data
function displayWeather(data) {
  container.innerHTML = ''; // Clear previous content
  capitals.forEach(capital => {
    const weather = data.find(item => item.city === capital);
    if (weather) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${capital}</h3>
        <p><strong>Temperature:</strong> ${weather.temp}°C</p>
        <p><strong>Condition:</strong> ${weather.condition}</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      `;
      container.appendChild(card);
    }
  });
}

// Function to filter cards based on search
function filterCards() {
  const query = searchInput.value.toLowerCase();
  const cards = container.querySelectorAll('.card');
  cards.forEach(card => {
    const city = card.querySelector('h3').textContent.toLowerCase();
    if (city.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Event listeners
refreshButton.addEventListener('click', fetchWeatherData);
searchInput.addEventListener('input', filterCards);

// Load data on page load
fetchWeatherData();