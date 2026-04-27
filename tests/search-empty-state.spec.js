describe('Search empty-state behavior (WA-40)', () => {
  let container;
  let searchInput;
  let noResultsDiv;
  let clearSearchButton;

  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
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

    const shouldShowEmptyState = query.length > 0 && visibleCount === 0;
    noResultsDiv.classList.toggle('hidden', !shouldShowEmptyState);
  }

  function clearSearch() {
    searchInput.value = '';
    filterCards();
  }

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="search" type="text" />
      <div id="no-results" class="hidden">
        <p>No results found.</p>
        <button id="clear-search" type="button">Clear search</button>
      </div>
      <div id="weather-container"></div>
    `;

    container = document.getElementById('weather-container');
    searchInput = document.getElementById('search');
    noResultsDiv = document.getElementById('no-results');
    clearSearchButton = document.getElementById('clear-search');

    // cards
    const cities = ['Amaravati', 'Mumbai', 'Bengaluru'];
    cities.forEach((city) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${city}</h3>`;
      container.appendChild(card);
    });

    clearSearchButton.addEventListener('click', clearSearch);
  });

  test('zero matches shows empty-state and hides all cards', () => {
    searchInput.value = 'zzzz';
    filterCards();

    expect(noResultsDiv.classList.contains('hidden')).toBe(false);

    const visibleCards = [...container.querySelectorAll('.card')].filter(
      (card) => !card.classList.contains('hidden')
    );
    expect(visibleCards.length).toBe(0);
  });

  test('one or more matches hides empty-state', () => {
    searchInput.value = 'mum';
    filterCards();

    expect(noResultsDiv.classList.contains('hidden')).toBe(true);

    const visibleCards = [...container.querySelectorAll('.card')].filter(
      (card) => !card.classList.contains('hidden')
    );
    expect(visibleCards.length).toBe(1);
  });

  test('clear/reset restores default view', () => {
    searchInput.value = 'zzzz';
    filterCards();

    clearSearchButton.click();

    expect(searchInput.value).toBe('');
    expect(noResultsDiv.classList.contains('hidden')).toBe(true);

    const visibleCards = [...container.querySelectorAll('.card')].filter(
      (card) => !card.classList.contains('hidden')
    );
    expect(visibleCards.length).toBe(3);
  });

  test('trims whitespace and matches case-insensitively', () => {
    searchInput.value = '  MUM  ';
    filterCards();

    expect(noResultsDiv.classList.contains('hidden')).toBe(true);

    const visibleCards = [...container.querySelectorAll('.card')].filter(
      (card) => !card.classList.contains('hidden')
    );
    expect(visibleCards.length).toBe(1);
  });
});
