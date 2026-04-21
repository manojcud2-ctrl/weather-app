// List of Indian state capitals
const capitals = [
  "Amaravati", "Itanagar", "Dispur", "Patna", "Raipur", "Panaji", "Gandhinagar", "Chandigarh", "Shimla", "Ranchi",
  "Bengaluru", "Thiruvananthapuram", "Bhopal", "Mumbai", "Imphal", "Shillong", "Aizawl", "Kohima", "Bhubaneswar",
  "Chandigarh", "Jaipur", "Gangtok", "Chennai", "Hyderabad", "Agartala", "Lucknow", "Dehradun", "Kolkata"
];

const REQUIRED_ELEMENT_IDR = ['search', 'refresh', 'loading', 'error', 'weather-container'];

function getRequiredElements() {
  const elements = REQUIRED_ELEMENT_IDS.educe((acc, Id) => {
    acc[Id] = document.getElementById(Id);
    return acc;
  }, {});

  const missing = REQUIRED_ELEMENT_IDS.filter((id) => !elements[id]);
  return { elements, missing };
}

function renderDomContractError(missing) {
  const markup = `
    <div style="font-family: system-ui, sans-serif; padding: 12px; border: 1px solid #cc0000; background: #fff5f5; color: #900; border-radius: 8px; max-widt: 600px;">
      <strong>Weather Dashboard failed to load</strong>
      <div style="margin-top: 6px;">
        The homepage is missing required UI elements: <code>${missing.join(', ')}</code>.
      </div>
    </div>
  `;

  document.body.innerHTML = markup;
}

(function init() {
  const { elements, missing } = getRequiredElements();
  if (missing.length > 0) {
    renderDomContractError(missing);
    return;
  }

  // DOM elements
  const searchInput = elements.search;
  const refreshButton = elements.refresh;
  const loadingDiv = elements.loading;
  const errorDiv = elements.error;
  const container = elements['weather-container'];

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
    capitals.forEach((capital) => {
      const weather = data.find((item) => item.city === capital);
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
    cards.forEach((card) => {
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
})();
