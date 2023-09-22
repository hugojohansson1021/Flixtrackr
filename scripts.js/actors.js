// Add event listener to the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
  await fetchActorData();
});

// Add event listener to the search input for pressing Enter key
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    await fetchActorData();
  }
});

// API function to fetch actor data
// API function to fetch actor data
async function fetchActorData() {
  try {
    const actorName = searchInput.value;
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';

    const response = await fetch(`https://unogsng.p.rapidapi.com/people?name=${actorName}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
        'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
      }
    });

    loadingAnimation.style.display = 'none'; // Stop the loading animation

    const data = await response.json();

    console.log(data); // Log the response data to check the structure

    if (data.results) {
      // Display the search results
      displayResults(data.results);
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error(error);
  }
}


let startIndex = 0; // Start index for displaying movie titles
const resultsPerPage = 10; // Number of movie titles to display per page

async function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const heading = document.createElement('h3');
  heading.textContent = `Found ${results.length} movies for actor: ${searchInput.value}`;
  resultsDiv.appendChild(heading);

  const ul = document.createElement('ul');
  ul.classList.add('movie-list'); // Add a CSS class to the unordered list
  resultsDiv.appendChild(ul);

  const endIndex = Math.min(startIndex + resultsPerPage, results.length); // Calculate the end index based on the current page

  for (let i = startIndex; i < endIndex; i++) {
    const result = results[i];

    const li = document.createElement('li');
    li.classList.add('movie-card'); // Add a CSS class to the list item

    const link = document.createElement('a');
    link.textContent = result.title;
    link.href = `https://flixtrackr.com/individual.html?id=${result.netflixid}`;
    link.target = "_blank"; // Open link in a new tab
    li.appendChild(link);

    const actorName = document.createElement('p');
    actorName.textContent = result.actor; // Display the actor's name
    li.appendChild(actorName);

    const imageUrl = await fetchImage(result.netflixid); // Fetch the image URL for the movie

    if (imageUrl) {
      const imageLink = document.createElement('a');
      imageLink.href = `https://flixtrackr.com/individual.html?id=${result.netflixid}`;
      imageLink.target = "_blank"; // Open link in a new tab

      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = result.title;
      image.width = 150; // Set a fixed width for the image
      image.height = 225; // Set a fixed height for the image

      imageLink.appendChild(image);
      li.appendChild(imageLink);
    }

    ul.appendChild(li);
  }

  if (endIndex < results.length) {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.classList.add('load-more-button'); // Add a CSS class to the button
    loadMoreButton.addEventListener('click', () => {
      startIndex += resultsPerPage; // Increment the start index
      displayResults(results); // Redisplay the results with the new start index
    });

    resultsDiv.appendChild(loadMoreButton);
  }
}


// Rest of the code remains the same

async function fetchImage(netflixId) {
  const url = `https://unogsng.p.rapidapi.com/images?netflixid=${netflixId}&offset=3&limit=2`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
      'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data); // Check the response data

    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].url;
      return imageUrl;
    } else {
      return null; // Return null if no image URL is available
    }
  } catch (error) {
    console.error(error);
    return null; // Return null if fetching the image fails
  }
}



document.getElementById('searchButton').addEventListener('click', function() {
  // Skapa en XMLHttpRequest för att skicka data till Discord-webhook.
  var xhr = new XMLHttpRequest();
  var webhookURL = 'https://discord.com/api/webhooks/1154913740853088337/2U0DhYpkSA6GRlTdcAA9mIryedS6yPcF6-jvJEeH2v0IhM4RudYF9qDeFXuXYR7MYIYb';


  xhr.open('POST', webhookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  var message = {
      content: 'Användare har sökt efter en skådespelare '
  };

  xhr.send(JSON.stringify(message));

  //alert('Meddelande skickat till Discord!');
});