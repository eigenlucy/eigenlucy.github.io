// add bootstrap classes to tables
$(document).ready(function () {
  $("table").each(function () {
    // Always apply table-dark class as the theme is hardcoded to dark
    $(this).addClass("table-dark");

    // only select tables that are not inside an element with "news" (about page) or "card" (cv page) class
    if (
      $(this).parents('[class*="news"]').length == 0 &&
      $(this).parents('[class*="card"]').length == 0 &&
      $(this).parents('[class*="archive"]').length == 0 &&
      $(this).parents("code").length == 0
    ) {
      // make table use bootstrap-table
      $(this).attr("data-toggle", "table");
      $(this).addClass("table-hover");
    }
  });
});
