





const url = 'https://unogsng.p.rapidapi.com/search';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
    'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
  }
};

async function fetchData(title) {
  startLoadingAnimation();
  try {
    const searchUrl = `${url}?query=${encodeURIComponent(title)}`;
    console.log('Fetching:', searchUrl); // Logga den fullständiga URL:en
    const response = await fetch(searchUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('API response:', result); // Logga svaret från API:et
    if (!result.results || result.total === 0) {
      console.log('Inga resultat hittades.');
      displayNoResultsMessage(); // Visa meddelande när inga resultat finns
    } else {
      displayResults(result.results);
    }
  } catch (error) {
    console.error('Ett fel uppstod under anropet till API:', error);
    displayNoResultsMessage(); // Visa meddelande även vid andra typer av fel
  } finally {
    stopLoadingAnimation();
  }
}

function displayNoResultsMessage() {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '<div class="no-results">Sorry, No result.</div>'; // Anpassa denna HTML till din sidas design
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


function stopLoadingAnimation() {
  document.getElementById('loading-animation').style.display = 'none';
}

function startLoadingAnimation() {
  document.getElementById('loading-animation').style.display = 'block';
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

  if (searchTerm.trim() !== '') {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';

    fetchData(searchTerm)
      .then(() => {
        loadingAnimation.style.display = 'none';
      })
      .catch((error) => {
        console.error(error);
        loadingAnimation.style.display = 'none';
      });
  }
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







// notis till discord när någon söker 
document.getElementById('search-button').addEventListener('click', function() {
  // Skapa en XMLHttpRequest för att skicka data till Discord-webhook.
  var xhr = new XMLHttpRequest();
  var webhookURL = 'https://discord.com/api/webhooks/1154913740853088337/2U0DhYpkSA6GRlTdcAA9mIryedS6yPcF6-jvJEeH2v0IhM4RudYF9qDeFXuXYR7MYIYb';

//https://discord.com/api/webhooks/1154933075734695936/FrxC0nRffQrEKVdpw0UonXkboRt5KfLxTg3ltnN_Lwy2Sb1EdMvx0fvQRr6Mrf_0hCDg

  xhr.open('POST', webhookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');


  var message = {
      content: '"Användare har sökt efter en film Titel"'
  };

  xhr.send(JSON.stringify(message));

  //alert('Meddelande skickat till Discord!');
});






