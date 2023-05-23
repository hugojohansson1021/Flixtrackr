// Get all elements with the class "article-content"
const articleContents = document.querySelectorAll('.article-content');

// Apply margin to each article content element
articleContents.forEach(content => {
  content.style.margin = '20px 0'; // Adds 20 pixels of margin at the top and bottom
});


// Hämta alla artiklar
const articles = document.querySelectorAll('.news-article');

// Loopa igenom varje artikel
articles.forEach(article => {
  // Ställ in önskad storlek och centrering
  article.style.width = '600px'; // Ange önskad bredd
  article.style.margin = '0 auto'; // Centrera horisontellt
});

function resizeArticles() {
  const articles = document.querySelectorAll('.news-article');
  const windowWidth = window.innerWidth;

  articles.forEach(article => {
    // Justera storlek beroende på fönsterbredd
    if (windowWidth >= 1200) {
      article.style.width = '600px'; // Önskad bredd för stora skärmar
    } else if (windowWidth >= 768) {
      article.style.width = '400px'; // Önskad bredd för mellanstora skärmar
    } else {
      article.style.width = '300px'; // Önskad bredd för små skärmar
    }

    // Centrera horisontellt
    article.style.margin = '0 auto';
  });
}

// Anropa resizeArticles() vid sidans inläsning och vid ändring av fönsterstorlek
window.addEventListener('load', resizeArticles);
window.addEventListener('resize', resizeArticles);
