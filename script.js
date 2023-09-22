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
    startLoadingAnimation();
    const searchUrl = `${url}?query=${encodeURIComponent(title)}`;
    const response = await fetch(searchUrl, options);
    const result = await response.json();
    displayResults(result.results);
    stopLoadingAnimation();
  } catch (error) {
    console.error(error);
    stopLoadingAnimation();
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






document.getElementById('search-button').addEventListener('click', function() {
  // Skapa en XMLHttpRequest för att skicka data till Discord-webhook.
  var xhr = new XMLHttpRequest();
  var webhookURL = 'https://discord.com/api/webhooks/1154913740853088337/2U0DhYpkSA6GRlTdcAA9mIryedS6yPcF6-jvJEeH2v0IhM4RudYF9qDeFXuXYR7MYIYb';

  xhr.open('POST', webhookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  var message = {
      content: 'Användare har sökt efter en film Titel'
  };

  xhr.send(JSON.stringify(message));

  //alert('Meddelande skickat till Discord!');
});





document.getElementById('search-button').addEventListener('click', function() {
  // Hämta användarens IP-adress med ipify API.
  $.getJSON('https://api64.ipify.org?format=json', function(data) {
      var userIP = data.ip;

      // Anropa IP Geolocation API för att hämta geolokalisering.
      $.getJSON(`https://ipgeolocation.abstractapi.com/v1/?api_key=9F952A55E59F6E07B1262C326072F079&ip_address=${userIP}`, function(geoData) {
          // Hämta information från geolokaliseringssvaret.
          var country = geoData.country;
          var region = geoData.region;
          var city = geoData.city;
          var lat = geoData.latitude;
          var lon = geoData.longitude;

          // Skapa meddelande för Discord.
          var message = {
              content: `Användarens geolokalisering:\nLand: ${country}\nRegion: ${region}\nStad: ${city}\nLatitud: ${lat}\nLongitud: ${lon}`
          };

          // Skicka meddelandet till Discord via en Discord-webhook.
          var webhookURL = 'https://discord.com/api/webhooks/1154913740853088337/2U0DhYpkSA6GRlTdcAA9mIryedS6yPcF6-jvJEeH2v0IhM4RudYF9qDeFXuXYR7MYIYb';
          
          $.post(webhookURL, JSON.stringify(message));
      });
  });
});