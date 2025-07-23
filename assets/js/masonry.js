$(document).ready(function () {
  // Init Masonry
  var $grid = $(".grid").masonry({
    gutter: 10,
    horizontalOrder: true,
    itemSelector: ".grid-item",
    columnWidth: 250,
    fitWidth: true
  });
  
  // Handle video loading specifically
  $grid.find('video').on('loadedmetadata', function() {
    console.log('Video metadata loaded, re-laying out masonry');
    $grid.masonry("layout");
  });
  
  // Handle video dimension changes (important for responsive videos)
  $grid.find('video').on('loadeddata', function() {
    console.log('Video data loaded, re-laying out masonry');
    $grid.masonry("layout");
  });
  
  // Layout Masonry after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.masonry("layout");
  });
  
  // Force a layout after all images are loaded
  $grid.imagesLoaded(function() {
    $grid.masonry("layout");
  });
  
  // Additional layout triggers for video edge cases
  setTimeout(function() {
    $grid.masonry("layout");
  }, 1000);
  
  setTimeout(function() {
    $grid.masonry("layout");
  }, 3000);
  
  // Re-layout on window resize (helps with responsive videos)
  $(window).on('resize', function() {
    $grid.masonry("layout");
  });
  
  // Add a manual trigger for debugging
  window.fixMasonry = function() {
    $grid.masonry("layout");
    console.log('Manual masonry layout triggered');
  };
});
