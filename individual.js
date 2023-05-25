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
    const availResult = await fetchAvailability(netflixId);
    const availData = await availResult.json();
    displayMovieDetails(result.results[0], availData);
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

  const yearElement = document.createElement('p');
  yearElement.textContent = `Year: ${movie.year}`;

  const categoryElement = document.createElement('p');
  categoryElement.textContent = `Category: ${movie.category}`;

  const imdbratingElement = document.createElement('p');
  imdbratingElement.textContent = `IMDb Rating: ${movie.imdbrating}`;

  const directorElement = document.createElement('p');
  directorElement.textContent = `Director: ${movie.director}`;

  const castElement = document.createElement('p');
  castElement.textContent = `Cast: ${movie.cast}`;

  const clistElement = document.createElement('p');
  const availableCountries = availData.results.map(country => country.country);
  clistElement.textContent = `Available in:-> ${availableCountries.join(', ')}`;

  const emptySpaceElement = document.createElement('p');
  emptySpaceElement.innerHTML = '&nbsp;'; // Add an empty space using HTML entity

  const emptySpaceElements = document.createElement('p');
  emptySpaceElement.innerHTML = '&nbsp;'; // Add an empty space using HTML entity



  movieDetails.appendChild(imgElement);
  movieDetails.appendChild(titleElement);
  movieDetails.appendChild(yearElement);
  movieDetails.appendChild(categoryElement);
  movieDetails.appendChild(imdbratingElement);
  movieDetails.appendChild(directorElement);
  movieDetails.appendChild(castElement);
  movieDetails.appendChild(clistElement);
  movieDetails.appendChild(emptySpaceElement); 
  movieDetails.appendChild(emptySpaceElements); //

  // Center the content
  movieDetails.style.display = 'flex';
  movieDetails.style.flexDirection = 'column';
  movieDetails.style.alignItems = 'center';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchMovieDetails(netflixId);
});
