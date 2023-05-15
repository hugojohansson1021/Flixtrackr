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
    if (window.innerWidth < 768) {
      return 1; // For small screens, show one card per row
    } else if (window.innerWidth < 992) {
      return 2; // For medium screens, show two cards per row
    } else if (window.innerWidth < 1200) {
      return 3; // For large screens, show three cards per row
    } else {
      return 4; // For extra-large screens, show four cards per row
    }
  }



// Function to display the movie cards
function displayResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
  
    const cardsPerRow = calculateCardsPerRow();
    const cardWidth = 100 / cardsPerRow;
  
    results.forEach((result) => {
      const { title, img, vtype, synopsis, clist } = result;
  
      const resultContainer = document.createElement('div');
      resultContainer.classList.add('movie-item');
      resultContainer.style.width = `${cardWidth}%`;
  
      const imgElement = document.createElement('img');
      imgElement.src = img;
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
  
      const vtypeElement = document.createElement('p');
      vtypeElement.textContent = `Type: ${vtype}`;
  
      const synopsisElement = document.createElement('p');
      synopsisElement.textContent = synopsis;
  
      const clistElement = document.createElement('p');
      clistElement.textContent = `Available in: ${clist}`;
  
      resultContainer.appendChild(imgElement);
      resultContainer.appendChild(titleElement);
      resultContainer.appendChild(vtypeElement);
      resultContainer.appendChild(synopsisElement);
      resultContainer.appendChild(clistElement);
  
      searchResults.appendChild(resultContainer);
    });
  }
  

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value;
        fetchData(searchTerm);
    });
});
