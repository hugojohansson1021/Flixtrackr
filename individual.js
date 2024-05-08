const urlParams = new URLSearchParams(window.location.search);
const netflixId = urlParams.get('id');






// Visa loader
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

// Dölj loader
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}





async function fetchMovieDetails(netflixId) {
  if (!netflixId) {
    console.error('Invalid Netflix ID');
    return;
  }

  const detailsUrl = `https://unogsng.p.rapidapi.com/title?netflixid=${netflixId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '###############',
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
      'X-RapidAPI-Key': '##########################',
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

  const availableInText = document.createElement('span');
  availableInText.textContent = 'Available in : ';
  clistElement.appendChild(availableInText);


  availableCountries.forEach(country => {
    const flagElement = document.createElement('span');
    const countryCode = getCountryCode(country);
    flagElement.classList.add('flag-icon', `flag-icon-${countryCode}`);

    const countryNameElement = document.createElement('span');
    countryNameElement.textContent = country;

    const countryContainer = document.createElement('span');
    countryContainer.style.display = 'flex';
    countryContainer.style.alignItems = 'center';
    countryContainer.appendChild(flagElement);
    countryContainer.appendChild(countryNameElement);

    clistElement.appendChild(countryContainer);
  });

  movieDetails.appendChild(imgElement);
  movieDetails.appendChild(titleElement);
  movieDetails.appendChild(yearElement);
  movieDetails.appendChild(categoryElement);
  movieDetails.appendChild(imdbratingElement);
  movieDetails.appendChild(directorElement);
  movieDetails.appendChild(castElement);
  movieDetails.appendChild(clistElement);

  // Center the content
  movieDetails.style.display = 'flex';
  movieDetails.style.flexDirection = 'column';
  movieDetails.style.alignItems = 'center';
}

function getCountryCode(country) {
  const countryCodeMap = {
    // Add more country code mappings as needed
    'India ': 'IN',
    'Israel ': 'IL',
    'Lithuania ': 'LT',
    'Brazil ': 'BR',
    'Slovakia ': 'SK',
    'Spain ': 'ES',
    'United Kingdom ': 'GB',
    'Romania ': 'RO',
    'Argentina ': 'AR',
    'Canada ': 'CA',
    'Iceland ': 'IS',
    'Mexico ': 'MX',
    'Hong Kong ': 'HK',
    'Belgium ': 'BE',
    'United States ': 'US',
    'Switzerland ':'CH',
    'Greece ':'GR',
    'Czech Republic ': 'CZ',
    'Australia ': 'AU',
    'South Korea ': 'KR',
    'France ': 'FR',
    'Japan ': 'JP',
    'Poland ': 'PL',
    'Russia ': 'RU',
    'Netherlands ': 'NL',
    'Sweden ': 'SE',
    'Singapore ': 'SG',
    'Germany ': 'DE',
    'Portugal ': 'PT',
    'South Africa ': 'ZA',
    'Italy ': 'IT',
    'Thailand ': 'TH',
    'Hungary ': 'HU',
    'Turkey ': 'TR',
    'Malaysia ': 'MY',
    'Colombia ': 'CO',
    'Philippines ': 'PH',
    'Ukraine ': 'UA',
    



 
    // ...
  };

  const countryCode = countryCodeMap[country];
  if (countryCode) {
    return countryCode;
  }

  return 'unknown';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchMovieDetails(netflixId);
});


// Visa loader
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}





















