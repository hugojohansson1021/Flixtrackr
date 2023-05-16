
// Get all elements with the class "article-content"
const articleContents = document.querySelectorAll('.article-content');

// Apply margin to each article content element
articleContents.forEach(content => {
  content.style.margin = '20px 0'; // Adds 20 pixels of margin at the top and bottom
});
