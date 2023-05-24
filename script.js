const url = 'https://unogsng.p.rapidapi.com/search';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
    'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
  }
};

async function fetchData(title) {
  try {
    const searchUrl = `${url}?query=${encodeURIComponent(title)}`; // Include the query parameter
    const response = await fetch(searchUrl, options);
    const result = await response.json();
    displayResults(result.results);
  } catch (error) {
    console.error(error);
  }
}

function calculateCardsPerRow() {
  return 1; // Always show one card per row
}

// Function to create a movie card
function createMovieCard(result) {
  const { title, img, vtype, synopsis, clist, nfid } = result;

  const resultContainer = document.createElement('div');
  resultContainer.classList.add('movie-item');

  // Create a link for the movie image
  const imgLink = document.createElement('a');
  imgLink.href = `individual.html?id=${nfid}`; // Add Netflix ID as a parameter in the link
  resultContainer.appendChild(imgLink);

  const imgElement = document.createElement('img');
  imgElement.src = img;
  imgLink.appendChild(imgElement);

  // Create a link for the movie title
  const titleLink = document.createElement('a');
  titleLink.href = `individual.html?id=${nfid}`; // Add Netflix ID as a parameter in the link
  titleLink.textContent = title;

  const titleElement = document.createElement('h2');
  titleElement.appendChild(titleLink);

  const vtypeElement = document.createElement('p');
  vtypeElement.textContent = `Type: ${vtype}`;

  const synopsisElement = document.createElement('p');
  synopsisElement.textContent = synopsis;

  const clistElement = document.createElement('p');
  clistElement.textContent = `Available in: ${clist}`;

  resultContainer.appendChild(titleElement);
  resultContainer.appendChild(vtypeElement);
  resultContainer.appendChild(synopsisElement);
  resultContainer.appendChild(clistElement);

  return resultContainer;
}

// Function to display the movie cards
function displayResults(results) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  const cardsPerRow = calculateCardsPerRow();
  const cardWidth = 100 / cardsPerRow;

  results.forEach((result) => {
    const resultContainer = createMovieCard(result);
    resultContainer.style.width = `${cardWidth}%`;
    searchResults.appendChild(resultContainer);
  });
}

function performSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value;
  fetchData(searchTerm);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', performSearch); // Call the performSearch function

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      performSearch(); // Call the performSearch function when Enter key is pressed
    }
  });
});





