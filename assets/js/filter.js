document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-filter');
  const cards = document.querySelectorAll('.card-item');

  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tag = button.getAttribute('data-tag');

      // Highlight the selected tag button
      tagButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter cards based on the selected tag
      cards.forEach(card => {
        const cardTags = card.getAttribute('data-tags').split(', ');
        if (tag === 'all' || cardTags.includes(tag)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Initialize with 'all' tag selected
  document.querySelector('.tag-filter[data-tag="all"]').click();
});