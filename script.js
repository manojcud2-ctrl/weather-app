// List of Indian state capitals
const capitals = [
  \"Amaravati\", \"Itanagar\", \"Dispur\", \"Patna\", \"Raipur\", \"Panaji\", \"Gandhinagar\",
  \"Chandigarh\", \"Shimla\", \"Ranchi\", \"Bengaluru\", \"Thiruvananthapuram\",
  \"Bhopal\", \"Mumbai\", \"Imphal\", \"Shillong\", \"Aizawl\", \"Kohima\",
  \"Bhubaneswar\", \"Jaipur\", \"Gangtok\", \"Chennai\", \"Hyderabad\",
  \"Agartala\", \"Lucknow\", \"Dehradun\", \"Kolkata\"
];

const { filterCards } = require('./src/filterCards');

const REQUIRED_ELEMENT_IDS = [
  'search',
  'refresh',
  'loading',
  'error',
  'weather-container',
  'no-results',
  'clear-search'
];

function getRequiredElements() {
  const elements = REQUIRED_ELEMENT_IDS.reduce((acc, id) => {
    acc[id] = document.getElementById(id);
    return acc;
  }, {});

  const missing = REQUIRED_ELEMENT_IDS.filter((id) => !elements[id]);
  return { elements, missing };
}

function renderDomContractError(missing) {
  const markup = `
    <div style=\"font-family: system-ui, sans-serif; padding: 12px; border: 1px solid #cc0000; background: #fff5f5; color: #900; border-radius: 8px; max-width: 600px;\">
      <strong>Weather Dashboard failed to load</strong>
      <div style=\"margin-top: 6px;\">
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
  const container = elements[ 'weather-container' ];
  const noResultsDiv = elements[ 'no-results' ];
  const clearSearchButton = elements[ 'clear-search' ];

  // ---- MOCK DATA GENERATOR ----
  function getMockWeatherData() {
    const conditions = [\"Sunny\", \"Cloudy\", \"Rainy\", \"Humid\", \"Partly Cloudy\"];

    return capitals.map((city) => ({
      city,
      temp: Math.floor(Math.random() * 15) + 25, // 25–40ðC
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 50) + 30 // 30�M80%
    }));
  }

  // ---- FETCH (MOCKED) ----
  async function fetchWeatherData() {
    try {
      loadingDiv.style.display = 'block';
      errorDiv.style.display = 'none';

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const data = getMockWeatherData();
      displayWeather(data);
    } catch (error) {
      errorDiv.textContent = 'Error loading weather data: ' + error.message;
      errorDiv.style.display = 'block';
    } finally {
      loadingDiv.style.display = 'none';
    }
  }

  // ---- RENDER ----
  function displayWeather(data) {
    container.innerHTML = '';

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

    // Re-apply current filter after refresh/re-render and ensure empty-state is correct.
    filterCards({ searchInput, container, noResultsDiv });
  }

  // ---- SEARCH ----
  function onFilter() {
    filterCards({ searchInput, container, noResultsDiv });
  }

  // ---- EVENTS ----
  function clearSearch() {
    searchInput.value = '';
    onFilter();
    searchInput.focus();
  }

  refreshButton.addEventListener('click', fetchWeatherData);
  searchInput.addEventListener('input', onFilter);
  clearSearchButton.addEventListener('click', clearSearch);

  // ---- INIT LOAD ----
  // Ensure empty-state never shows before any user input.
  noResultsDiv.classList.add('hidden');
  fetchWeatherData();
})();
