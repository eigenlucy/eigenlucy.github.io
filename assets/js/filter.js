//assets/filter.js
document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-filter');
  const cardsContainer = document.querySelector('.cards-container');
  // Updated selector to match col-md-3, which is what gallery.md should be using for cards
  const cards = Array.from(document.querySelectorAll('.col-md-3.card-item')); 

  // References to showMoreBtn and extraTags removed as the button doesn't exist

  if (cardsContainer && cards.length > 0) { // Only proceed if cards and container exist
    tagButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tag = button.getAttribute('data-tag');

        tagButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const matchedCards = [];
        const unmatchedCards = [];

        cards.forEach(card => {
          const cardTagsString = card.getAttribute('data-tags');
          if (cardTagsString) { // Check if data-tags attribute exists
            const cardTags = cardTagsString.split(', ');
            if (tag === 'all' || cardTags.includes(tag)) {
              matchedCards.push(card);
            } else {
              unmatchedCards.push(card);
            }
          } else {
            // If a card has no tags, it won't match any specific tag other than 'all'
            if (tag === 'all') {
                matchedCards.push(card);
            } else {
                unmatchedCards.push(card);
            }
          }
        });

        cardsContainer.innerHTML = ''; // Clear existing cards
        matchedCards.forEach(card => cardsContainer.appendChild(card));
        unmatchedCards.forEach(card => cardsContainer.appendChild(card));
        
        // Trigger masonry relayout after filtering
        if (window.jQuery && jQuery('.grid').data('masonry')) {
          setTimeout(function() {
            jQuery('.grid').masonry('layout');
          }, 100);
        }
      });
    });

    // Initialize with 'featured' tag selected, or 'all' if 'featured' not found, or first tag
    const featuredButton = document.querySelector('.tag-filter[data-tag="featured"]');
    if (featuredButton) {
      featuredButton.click();
    } else {
      const allButton = document.querySelector('.tag-filter[data-tag="all"]');
      if (allButton) {
        allButton.click();
      } else if (tagButtons.length > 0) {
        tagButtons[0].click(); // Fallback to clicking the first available tag button
      }
    }
  } else {
    if (!cardsContainer) console.warn("filter.js: Element with class '.cards-container' not found.");
    if (cards.length === 0) console.warn("filter.js: No elements with class '.col-md-3.card-item' found.");
  }

  // Show More/Show Less functionality has been removed.
});
