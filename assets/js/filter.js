//assets/filter.js
document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-filter');
  const cardsContainer = document.querySelector('.cards-container');
  const cards = Array.from(document.querySelectorAll('.col-md-4.card-item'));
  const showMoreBtn = document.getElementById('show-more-btn');
  const extraTags = document.querySelector('.extra-tags');

  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tag = button.getAttribute('data-tag');

      // Highlight the selected tag button
      tagButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter and reorder cards based on the selected tag
      const matchedCards = [];
      const unmatchedCards = [];

      cards.forEach(card => {
        const cardTags = card.getAttribute('data-tags').split(', ');
        if (tag === 'all' || cardTags.includes(tag)) {
          matchedCards.push(card);
        } else {
          unmatchedCards.push(card);
        }
      });

      // Clear the container and append matched and unmatched cards
      cardsContainer.innerHTML = '';
      matchedCards.forEach(card => cardsContainer.appendChild(card));
      unmatchedCards.forEach(card => cardsContainer.appendChild(card));
    });
  });

  // Initialize with 'all' tag selected
  document.querySelector('.tag-filter[data-tag="featured"]').click();

  // Show More/Show Less functionality
  showMoreBtn.addEventListener('click', function() {
    if (extraTags.style.display === 'none' || extraTags.style.display === '') {
      extraTags.style.display = 'block';
      showMoreBtn.textContent = 'Show Less';
    } else {
      extraTags.style.display = 'none';
      showMoreBtn.textContent = 'Show More';
    }
  });
});
