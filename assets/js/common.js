$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css"; // This path might need to be {{ "/assets/css/jupyter.css" | relative_url }} if used in different contexts
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  // let theme = determineComputedTheme(); // REMOVED: Assume dark theme

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    var iframe = this;
    // Ensure the iframe head is available before appending
    if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.head) {
        $(iframe.contentWindow.document.head).append(cssLink);
    } else {
        // Fallback or log if head isn't ready - might need to use iframe.onload
        $(iframe).on('load', function() {
            $(this.contentWindow.document.head).append(cssLink);
        });
    }
    
    // Always apply dark theme settings for Jupyter notebooks
    $(iframe).on("load", function () { // Bind to load event to ensure body exists
      if (this.contentWindow && this.contentWindow.document && this.contentWindow.document.body) {
        $(this.contentWindow.document.body).attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      }
    });
    // If iframe is already loaded (e.g. cached), try to apply styles directly too
    if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body && iframe.contentWindow.document.readyState === "complete") {
        if (iframe.contentWindow.document.head) { // Ensure head exists before appending cssLink again if not already there
            if (!$(iframe.contentWindow.document.head).find('link[href="../css/jupyter.css"]').length) {
                 $(iframe.contentWindow.document.head).append(cssLink.cloneNode(true)); // cloneNode if appending same link object
            }
        }
        $(iframe.contentWindow.document.body).attr({
            "data-jp-theme-light": "false",
            "data-jp-theme-name": "JupyterLab Dark",
        });
    }

  });
});
