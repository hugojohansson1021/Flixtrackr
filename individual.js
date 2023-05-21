const urlParams = new URLSearchParams(window.location.search);
const netflixId = urlParams.get('id');

async function fetchMovieDetails(netflixId) {
  if (!netflixId) {
    console.error('Invalid Netflix ID');
    return;
  }

  const detailsUrl = `https://unogsng.p.rapidapi.com/title?netflixid=${netflixId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
      'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(detailsUrl, options);
    const result = await response.json();
    const availResult = await fetchAvailability(netflixId); // Hämta tillgänglighetsdata separat
    const availData = await availResult.json();
    displayMovieDetails(result.results[0], availData); // Skicka både filmdetaljer och tillgänglighetsdata till displayMovieDetails
  } catch (error) {
    console.error(error);
  }
}

async function fetchAvailability(netflixId) {
  const availabilityUrl = `https://unogsng.p.rapidapi.com/titlecountries?netflixid=${netflixId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
      'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
    }
  };

  return await fetch(availabilityUrl, options);
}

function displayMovieDetails(movie, availData) {
  const movieDetails = document.getElementById('movie-details');
  movieDetails.innerHTML = '';

  const imgElement = document.createElement('img');
  imgElement.src = movie.img;

  const titleElement = document.createElement('h2');
  titleElement.textContent = movie.title;

  const synopsisElement = document.createElement('p');
  synopsisElement.textContent = movie.synopsis;

  const clistElement = document.createElement('p');
  const availableCountries = availData.results.map(country => country.country);
  clistElement.textContent = `Available in: ${availableCountries.join(', ')}`;

  movieDetails.appendChild(imgElement);
  movieDetails.appendChild(titleElement);
  movieDetails.appendChild(synopsisElement);
  movieDetails.appendChild(clistElement);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchMovieDetails(netflixId);
});
