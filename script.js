// List of Indian state capitals
const capitals = [
  "Amaravati", "Itanagar", "Dispur", "Patna", "Raipur", "Panaji", "Gandhinagar",
  "Chandigarh", "Shimla", "Ranchi", "Bengaluru", "Thiruvananthapuram",
  "Bhopal", "Mumbai", "Imphal", "Shillong", "Aizawl", "Kohima",
  "Bhubaneswar", "Jaipur", "Gangtok", "Chennai", "Hyderabad",
  "Agartala", "Lucknow", "Dehradun", "Kolkata"
];

const REQUIRED_ELEMENT_IDS = ['search', 'refresh', 'loading', 'error', 'weather-container', 'no-results', 'clear-search'];

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
    <div style="font-family: system-ui, sans-serif; padding: 12px; border: 1px solid #cc0000; background: #fff5f5; color: #900; border-radius: 8px; max-width: 600px;">
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
  const noResults = elements['no-results'];
  const clearSearchButton = elements['clear-search'];

  // ---- MOCK DATA GENERATOR ----
  function getMockWeatherData() {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Humid", "Partly Cloudy"];

    return capitals.map((city) => ({
      city,
      temp: Math.floor(Math.random() * 15) + 25, // 25–40°C
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 50) + 30 // 30–80%
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

    // Reset search state when data is re-rendered.
    filterCards();
  }

  // ---- SEARCH ----
  function filterCards() {
    const rawQuery = searchInput.value ?? '';
    const query = rawQuery.trim().toLowerCase();
    const cards = container.querySelectorAll('.card');

    let visibleCount = 0;

    cards.forEach((card) => {
      const city = card.querySelector('h3').textContent.toLowerCase();

      if (city.includes(query)) {
        card.classList.remove('hidden');
        visibleCount += 1;
      } else {
        card.classList.add('hidden');
      }
    });

    // Do not show empty-state before initial render (i.e., when there are no cards).
    const shouldShowNoResults = cards.length > 0 && query.length > 0 && visibleCount === 0;
    noResults.classList.toggle('hidden', !shouldShowNoResults);
  }

  // ---- EVENTS ----
  refreshButton.addEventListener('click', fetchWeatherData);
  searchInput.addEventListener('input', filterCards);
  clearSearchButton.addEventListener('click', () => {
    searchInput.value = '';
    filterCards();
    searchInput.focus();
  });

  // ---- INIT LOAD ----
  fetchWeatherData();
})();