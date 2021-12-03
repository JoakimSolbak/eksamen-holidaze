// Search modal
import { baseUrl } from '../settings/api.js';

const searchToggleBtn = document.querySelectorAll('.search-modal-toggle');
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const closeModalBtn = document.getElementById('search-close-modal');
const closeModalBtn2 = document.getElementById('search-footer-close-modal');

// Search modal toggle //
searchToggleBtn.forEach((btn) => {
	btn.addEventListener('click', () => {
		searchModal.classList.toggle('active');
		searchInput.focus();
	});
});

// Hide modal //
function hideModal() {
	searchModal.classList.remove('active');
}

closeModalBtn.addEventListener('click', () => {
	hideModal();
});

closeModalBtn2.addEventListener('click', () => {
	hideModal();
});

document.addEventListener('click', (event) => {
	if (event.target === searchModal) {
		hideModal();
	}
});

document.addEventListener('keydown', (event) => {
	if (event.code === 'Escape') {
		hideModal();
	}
});

// Get search results
const hotelsPostTypeSearchUrl = baseUrl + '/wp-json/hotelSearch/v1/search?term=';
const THEME_DIR = MAIN.themedir;

let typingTimer;

searchInput.addEventListener('keyup', (event) => {
	clearTimeout(typingTimer);
	searchResults.innerHTML = `<li><img src="${THEME_DIR}/assets/svg/loading-search-results.svg" alt="Loading search results"></li>`;
	typingTimer = setTimeout(() => {
		const searchBarValue = searchInput.value.trim().toLowerCase();
		getSearchResults(searchBarValue);
	}, 750);
});

async function getSearchResults(searchValue) {
	try {
		const searchPostTypes = hotelsPostTypeSearchUrl + searchValue;

		let [hotelSearch] = await Promise.all([fetch(searchPostTypes)]);

		let hotelJson = await hotelSearch.json();

		renderSearchResults(hotelJson);
	} catch (error) {
		searchResults.innerHTML = `
    <li>
      <p class="lead">Error: ${error}</p>
    </li>
    `;
	}
}

function renderSearchResults(json) {
	searchResults.innerHTML = `
  <li>
    <p class="lead">Search results:</p>
  </li>
  `;
	json.forEach((hotel) => {
		let searchItem = document.createElement('li');
		searchItem.innerHTML = `
    <li>
      <div class="hotel-search-item">
        <a href="${hotel.permalink}" title="${hotel.title}">
          <p>${hotel.title}</p>
          ${hotel.thumbnail}
        </a>
      </div>
    </li>
    `;
		searchResults.appendChild(searchItem);
	});
	if (json.length === 0) {
		searchResults.innerHTML = `
    <li>
      <p class="no-results-found">No hotels matched your search terms.</p>
    </li>
    `;
	} else {
	}
}
