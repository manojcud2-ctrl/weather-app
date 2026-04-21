// List of Indian state capitals
const capitals = [
  "Amaravati", "Itanagar", "Dispur", "Patna", "Raipur", "Panaji", "Gandhinagar", "Chandigarh", "Shimla", "Ranchi",
  "Bengaluru", "Thiruvananthapuram", "Bhopal", "Mumbai", "Imphal", "Shillong", "Aizawl", "Kohima", "Bhubaneswar",
  "Chandigarh", "Jaipur", "Gangtok", "Chennai", "Hyderabad", "Agartala", "Lucknow", "Dehradun", "Kolkata"
];

// DOM contract validation

function getRequiredElement(id) {
  return document.getElementById(id);
}

function showDomContractError(missing) {
  const msg = `Error: The page is missing required UI element(s): ${missing.join(', ')}. Please reload or contact support.`;

  // Try to show in the designated error area first.
  const errorEl = document.getElementById('error');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    return;
  }

  // Fallback: prepend a visible message so the user sees something even if #error is missing.
  const root = document.body || document.documentElement;
  if (root) {
    const div = document.createElement('div');
    div.id = 'error';
    div.style.color = 'red';
    div.textContent = msg;
    root.prepend(div);
  } else {
    alert(msg);
  }
}

// DOM elements (validated on startup)
const searchInput = getRequiredElement('search');
const refreshButton = getRequiredElement('refresh');
const loadingDiv = getRequiredElement('loading');
const errorDiv = document.getElementById('error'); // *also* used to surface DOM contract errors
const container = getRequiredElement('weather-container');

const missingElements = [];
if (!searchInput) missingElements.push('#search');
if (!refreshButton) missingElements.push('#refresh');
if (!loadingDiv) missingElements.push('#loading');
if (!errorDiv) missingElements.push('#error');
if (!container) missingElements.push('#weather-container');

if (missingElements.length > 0) {
  showDomContractError(missingElements);
  // Bail out to avoid runtime errors in later code.
  throw new Error(`Missing required DOM node(s): ${missingElements.join(', ')}`);
}

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
