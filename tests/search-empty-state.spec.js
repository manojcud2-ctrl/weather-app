const { setupDashboardDOM } = require('./helpers/dom-fixtures');

function createCard(city) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3>${city}</h3>`;
  return card;
}

function filterCards({ searchInput, container, noResults }) {
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

  const shouldShowNoResults = cards.length > 0 && query.length > 0 && visibleCount === 0;
  noResults.classList.toggle('hidden', !shouldShowNoResults);

  return { visibleCount, total: cards.length, shouldShowNoResults };
}

describe('Search empty-state behavior', () => {
  let container;
  let searchInput;
  let noResults;
  let clearSearchButton;

  beforeEach(() => {
    setupDashboardDOM();

    container = document.getElementById('weather-container');
    searchInput = document.getElementById('search');
    noResults = document.getElementById('no-results');
    clearSearchButton = document.getElementById('clear-search');

    ['Amaravati', 'Itanagar', 'Mumbai'].forEach((city) => container.appendChild(createCard(city)));

    clearSearchButton.addEventListener('click', () => {
      searchInput.value = '';
      filterCards({ searchInput, container, noResults });
    });
  });

  test('zero matches shows empty-state and hides all cards', () => {
    searchInput.value = 'zzzz';
    const result = filterCards({ searchInput, container, noResults });

    expect(result.visibleCount).toBe(0);
    expect(noResults.classList.contains('hidden')).toBe(false);
    expect(container.querySelectorAll('.card.hidden')).toHaveLength(result.total);
  });

  test('one or more matches hides empty-state', () => {
    searchInput.value = 'mum';
    const result = filterCards({ searchInput, container, noResults });

    expect(result.visibleCount).toBe(1);
    expect(noResults.classList.contains('hidden')).toBe(true);
  });

  test('clear/reset restores default view', () => {
    searchInput.value = 'zzzz';
    filterCards({ searchInput, container, noResults });

    clearSearchButton.click();

    expect(searchInput.value).toBe('');
    expect(noResults.classList.contains('hidden')).toBe(true);
    expect(container.querySelectorAll('.card.hidden')).toHaveLength(0);
  });

  test('trims whitespace and matches case-insensitively', () => {
    searchInput.value = '  MUM  ';
    const result = filterCards({ searchInput, container, noResults });

    expect(result.visibleCount).toBe(1);
    expect(noResults.classList.contains('hidden')).toBe(true);
  });
});
