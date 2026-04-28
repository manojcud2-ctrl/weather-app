// Pre served as a small pure function so tests can exercise the production logic.

function filterCards({ searchInput, container, noResultsDiv }) {
  const query = (searchInput?.value ?? '').trim().toLowerCase();
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

module.exports = {
  filterCards
};
