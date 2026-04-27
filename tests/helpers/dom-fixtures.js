function setupWeatherDashboardDOM() {
  document.body.innerHTML = `
    <div id="weather-container"></div>
    <input id="search" type="text" />
    <button id="refresh">Refresh</button>
    <div id="loading" style="display:none;">Loading weather data...</div>
    <div id="error" style="display:none;"></div>
    <div id="no-results" class="no-results hidden"></div>
    <button id="clear-search" type="button">Clear search</button>
  `;
}

module.exports = {
  setupWeatherDashboardDOM
};
