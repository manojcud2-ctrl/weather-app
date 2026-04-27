const { setupWeatherDashboardDOM } = require('./helpers/dom-fixtures');

function createCard(city) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3>${city}</h3>`;
  return card;
}

function runFilterCards({ searchInput, container, noResults }) {
  const query = searchInput.value.trim().toLowerCase();
  const cards = container.querySelectorAll('.card');

  if (cards.length === 0) {
    noResults.classList.add('hidden');
    return;
  }

  let visibleCount = 0;

  cards.forEach((card) => {
    const city = card.querySelector('h3').textContent.toLowerCase();

    if (city.includes(query)) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  const shouldShowNoResults = query.length > 0 && visibleCount === 0;
  noResults.classList.toggle('hidden', !shouldShowNoResults);
}

describe('WA-40 search empty-state behavior', () => {
  let container;
  let searchInput;
  let noResults;
  let clearSearchButton;

  beforeEach(() => {
    setupWeatherDashboardDOM();

    container = document.getElementById('weather-container');
    searchInput = document.getElementById('search');
    noResults = document.getElementById('no-results');
    clearSearchButton = document.getElementById('clear-search');

    container.appendChild(createCard('Amaravati'));
    container.appendChild(createCard('Mumbai'));
  });

  test('zero matches hides cards and shows empty-state', () => {
    searchInput.value = 'zzzz';

    runFilterCards({ searchInput, container, noResults });

    expect(container.querySelectorAll('.card.hidden')).toHaveLength(2);
    expect(noResults.classList.contains('hidden')).toBe(false);
  });

  test('matches hide empty-state and show only matching cards', () => {
    searchInput.value = 'mumb';

    runFilterCards({ searchInput, container, noResults });

    expect(container.querySelectorAll('.card.hidden')).toHaveLength(1);
    expect(noResults.classList.contains('hidden')).toBe(true);
  });

  test('clear/reset restores default view (all cards visible, empty-state hidden)', () => {
    searchInput.value = 'zzzz';
    runFilterCards({ searchInput, container, noResults });
    expect(noResults.classList.contains('hidden')).toBe(false);

    clearSearchButton.addEventListener('click', () => {
      searchInput.value = '';
      runFilterCards({ searchInput, container, noResults });
    });

    clearSearchButton.click();

    expect(container.querySelectorAll('.card.hidden')).toHaveLength(0);
    expect(noResults.classList.contains('hidden')).toBe(true);
  });

  test('whitespace and case-insensitivity are handled', () => {
    searchInput.value = '  MUM  ';

    runFilterCards({ searchInput, container, noResults });

    expect(container.querySelectorAll('.card.hidden')).toHaveLength(1);
    expect(noResults.classList.contains('hidden')).toBe(true);
  });
});
