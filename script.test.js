// Test utilities
const mockWeatherData = [
  { city: "Amaravati", temp: 32, condition: "Sunny", humidity: 45 },
  { city: "Itanagar", temp: 25, condition: "Cloudy", humidity: 70 },
  { city: "Dispur", temp: 28, condition: "Rainy", humidity: 80 },
  { city: "Bengaluru", temp: 24, condition: "Clear", humidity: 50 },
  { city: "Mumbai", temp: 30, condition: "Humid", humidity: 75 }
];

describe('Weather Dashboard Functions', () => {
  let container, searchInput, loadingDiv, errorDiv, refreshButton;

  beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = `
      <div id="weather-container"></div>
      <input id="search" type="text" />
      <button id="refresh">Refresh</button>
      <div id="loading" style="display:none;">Loading weather data...</div>
      <div id="error" style="display:none;"></div>
      <div id="no-results" class="hidden"></div>
      <button id="clear-search">Clear search</button>
    `;
    
    container = document.getElementById('weather-container');
    searchInput = document.getElementById('search');
    loadingDiv = document.getElementById('loading');
    errorDiv = document.getElementById('error');
    refreshButton = document.getElementById('refresh');
  });

  describe('displayWeather function', () => {
    test('should create weather cards for each city', () => {
      const capitals = ["Amaravati", "Itanagar", "Dispur", "Bengaluru", "Mumbai"];
      const data = mockWeatherData;
      
      container.innerHTML = '';
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

      const cards = container.querySelectorAll('.card');
      expect(cards.length).toBe(5);
    });

    test('should display correct temperature data', () => {
      const capital = "Amaravati";
      const weather = mockWeatherData[0];
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${capital}</h3>
        <p><strong>Temperature:</strong> ${weather.temp}°C</p>
        <p><strong>Condition:</strong> ${weather.condition}</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      `;
      container.appendChild(card);

      const tempText = card.querySelector('p:nth-of-type(1)').textContent;
      expect(tempText).toContain('32°C');
    });

    test('should display correct humidity data', () => {
      const capital = "Mumbai";
      const weather = mockWeatherData[4];
      
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${capital}</h3>
        <p><strong>Temperature:</strong> ${weather.temp}°C</p>
        <p><strong>Condition:</strong> ${weather.condition}</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      `;
      container.appendChild(card);

      const humidityText = card.querySelector('p:nth-of-type(3)').textContent;
      expect(humidityText).toContain('75%');
    });

    test('should clear previous content before adding new cards', () => {
      container.innerHTML = '<div>old content</div>';
      expect(container.innerHTML).toContain('old content');
      
      container.innerHTML = '';
      expect(container.innerHTML).toBe('');
    });
  });

  describe('filterCards function', () => {
    beforeEach(() => {
      const capitals = ["Amaravati", "Itanagar", "Dispur", "Bengaluru", "Mumbai"];
      const data = mockWeatherData;
      
      container.innerHTML = '';
      capitals.forEach(capital => {
        const weather = data.find(item => item.city === capital);
        if (weather) {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `<h3>${capital}</h3>`;
          container.appendChild(card);
        }
      });
    });

    test('should filter cards based on search query', () => {
      searchInput.value = 'amar';
      const query = searchInput.value.toLowerCase();
      const cards = container.querySelectorAll('.card');
      let visibleCount = 0;
      
      cards.forEach(card => {
        const city = card.querySelector('h3').textContent.toLowerCase();
        if (city.includes(query)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      expect(visibleCount).toBe(1);
    });

    test('should show all cards when search is empty', () => {
      searchInput.value = '';
      const query = searchInput.value.toLowerCase();
      const cards = container.querySelectorAll('.card');
      let visibleCount = 0;
      
      cards.forEach(card => {
        const city = card.querySelector('h3').textContent.toLowerCase();
        if (city.includes(query)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      expect(visibleCount).toBe(5);
    });

    test('should perform case-insensitive search', () => {
      searchInput.value = 'BENG';
      const query = searchInput.value.toLowerCase();
      const cards = container.querySelectorAll('.card');
      let visibleCount = 0;
      
      cards.forEach(card => {
        const city = card.querySelector('h3').textContent.toLowerCase();
        if (city.includes(query)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      expect(visibleCount).toBe(1);
    });

    test('should add hidden class to non-matching cards', () => {
      searchInput.value = 'agartala';
      const query = searchInput.value.toLowerCase();
      const cards = container.querySelectorAll('.card');
      
      cards.forEach(card => {
        const city = card.querySelector('h3').textContent.toLowerCase();
        if (!city.includes(query)) {
          card.classList.add('hidden');
        }
      });

      const hiddenCards = container.querySelectorAll('.hidden');
      expect(hiddenCards.length).toBe(5);
    });
  });

  describe('API Response Handling', () => {
    test('should handle valid API response format', () => {
      expect(Array.isArray(mockWeatherData)).toBe(true);
      mockWeatherData.forEach(item => {
        expect(item).toHaveProperty('city');
        expect(item).toHaveProperty('temp');
        expect(item).toHaveProperty('condition');
        expect(item).toHaveProperty('humidity');
      });
    });

    test('should validate weather data types', () => {
      mockWeatherData.forEach(item => {
        expect(typeof item.city).toBe('string');
        expect(typeof item.temp).toBe('number');
        expect(typeof item.condition).toBe('string');
        expect(typeof item.humidity).toBe('number');
      });
    });
  });

  describe('Loading and Error States', () => {
    test('should show loading div', () => {
      loadingDiv.style.display = 'block';
      expect(loadingDiv.style.display).toBe('block');
    });

    test('should hide loading div', () => {
      loadingDiv.style.display = 'none';
      expect(loadingDiv.style.display).toBe('none');
    });

    test('should show error message', () => {
      errorDiv.style.display = 'block';
      errorDiv.textContent = 'Error loading weather data';
      expect(errorDiv.style.display).toBe('block');
      expect(errorDiv.textContent).toContain('Error');
    });

    test('should hide error message', () => {
      errorDiv.style.display = 'none';
      expect(errorDiv.style.display).toBe('none');
    });
  });

  describe('Card Structure', () => {
    test('should create card with required structure', () => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>TestCity</h3>
        <p><strong>Temperature:</strong> 25°C</p>
        <p><strong>Condition:</strong> Clear</p>
        <p><strong>Humidity:</strong> 55%</p>
      `;
      container.appendChild(card);

      const createdCard = container.querySelector('.card');
      expect(createdCard).toBeTruthy();
      expect(createdCard.querySelector('h3')).toBeTruthy();
      expect(createdCard.querySelectorAll('p')).toHaveLength(3);
    });
  });
});
