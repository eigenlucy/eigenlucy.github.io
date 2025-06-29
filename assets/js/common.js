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
  cssLink.href = "{{ '/assets/css/jupyter.css' | relative_url }}"; // Corrected path using Liquid
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    var iframe = this;
    var applyJupyterStyles = function() {
        if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.head) {
            // Check if CSS link already exists
            if (!$(iframe.contentWindow.document.head).find('link[href="' + cssLink.href + '"]').length) {
                 $(iframe.contentWindow.document.head).append(cssLink.cloneNode(true));
            }
        }
        if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body) {
            $(iframe.contentWindow.document.body).attr({
              "data-jp-theme-light": "false",
              "data-jp-theme-name": "JupyterLab Dark",
            });
        }
    };

    if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.readyState === "complete") {
      applyJupyterStyles();
    } else {
      $(iframe).on("load", applyJupyterStyles);
    }
  });
});
