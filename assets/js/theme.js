// Has to be in the head tag, otherwise a flicker effect will occur.

// Toggle through light, dark, and system theme settings.
// This function is no longer used since the toggle button is removed.
// let toggleThemeSetting = () => {
//   let themeSetting = determineThemeSetting();
//   if (themeSetting == "system") {
//     setThemeSetting("light");
//   } else if (themeSetting == "light") {
//     setThemeSetting("dark");
//   } else {
//     setThemeSetting("system");
//   }
// };

// Change the theme setting and apply the theme.
let setThemeSetting = (themeSetting) => {
  // localStorage.setItem("theme", themeSetting); // No longer needed to store user preference
  document.documentElement.setAttribute("data-theme-setting", themeSetting); // Keep for CSS if it uses this
  applyTheme();
};

// Apply the computed dark or light theme to the website.
let applyTheme = () => {
  let theme = determineComputedTheme(); // Will always be "dark"

  transTheme();
  setHighlight(theme);
  setGiscusTheme(theme);

  // if mermaid is not defined, do nothing
  if (typeof mermaid !== "undefined") {
    setMermaidTheme(theme);
  }

  // if diff2html is not defined, do nothing
  if (typeof Diff2HtmlUI !== "undefined") {
    setDiff2htmlTheme(theme);
  }

  // if echarts is not defined, do nothing
  if (typeof echarts !== "undefined") {
    setEchartsTheme(theme);
  }

  // if vegaEmbed is not defined, do nothing
  if (typeof vegaEmbed !== "undefined") {
    setVegaLiteTheme(theme);
  }

  document.documentElement.setAttribute("data-theme", theme);

  // Add class to tables.
  let tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    if (theme == "dark") {
      tables[i].classList.add("table-dark");
    } else {
      tables[i].classList.remove("table-dark");
    }
  }

  // Set jupyter notebooks themes.
  let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
  for (let i = 0; i < jupyterNotebooks.length; i++) {
    let bodyElement = jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow.document.body;
    if (theme == "dark") {
      bodyElement.setAttribute("data-jp-theme-light", "false");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Dark");
    } else {
      bodyElement.setAttribute("data-jp-theme-light", "true");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Light");
    }
  }

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== "undefined") {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
    });
  }
};

let setHighlight = (theme) => {
  // Ensure highlight_theme_light and highlight_theme_dark elements exist before accessing them
  const lightThemeElement = document.getElementById("highlight_theme_light");
  const darkThemeElement = document.getElementById("highlight_theme_dark");

  if (lightThemeElement && darkThemeElement) {
    if (theme == "dark") {
      lightThemeElement.media = "none";
      darkThemeElement.media = "";
    } else { // Should not happen if theme is forced to dark
      darkThemeElement.media = "none";
      lightThemeElement.media = "";
    }
  }
};

let setGiscusTheme = (theme) => {
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme, // Will be "dark"
    },
  });
};

let addMermaidZoom = (records, observer) => {
  var svgs = d3.selectAll(".mermaid svg");
  svgs.each(function () {
    var svg = d3.select(this);
    svg.html("<g>" + svg.html() + "</g>");
    var inner = svg.select("g");
    var zoom = d3.zoom().on("zoom", function (event) {
      inner.attr("transform", event.transform);
    });
    svg.call(zoom);
  });
  if (observer && typeof observer.disconnect === 'function') { // Check if observer and disconnect exist
    observer.disconnect();
  }
};

let setMermaidTheme = (theme) => {
  if (theme == "light") { // This condition will likely not be met
    theme = "default";
  }

  document.querySelectorAll(".mermaid").forEach((elem) => {
    if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
      let svgCode = elem.previousSibling.childNodes[0].innerHTML;
      elem.removeAttribute("data-processed");
      elem.innerHTML = svgCode;
    }
  });

  if (typeof mermaid !== "undefined") {
      mermaid.initialize({ theme: theme }); // Theme will be "dark"
      window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
  }


  const observable = document.querySelector(".mermaid svg");
  if (observable !== null && typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(addMermaidZoom);
    const observerOptions = { childList: true };
    observer.observe(observable, observerOptions);
  }
};

let setDiff2htmlTheme = (theme) => {
  document.querySelectorAll(".diff2html").forEach((elem) => {
    if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
      let textData = elem.previousSibling.childNodes[0].innerHTML;
      elem.innerHTML = "";
      const configuration = { colorScheme: theme, drawFileList: true, highlight: true, matching: "lines" }; // theme will be "dark"
      const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
      diff2htmlUi.draw();
    }
  });
};

let setEchartsTheme = (theme) => {
  document.querySelectorAll(".echarts").forEach((elem) => {
     if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
        let jsonData = elem.previousSibling.childNodes[0].innerHTML;
        echarts.dispose(elem);

        // Theme will be "dark"
        var chart = echarts.init(elem, "dark-fresh-cut");
        chart.setOption(JSON.parse(jsonData));
     }
  });
};

let setVegaLiteTheme = (theme) => {
  document.querySelectorAll(".vega-lite").forEach((elem) => {
    if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
        let jsonData = elem.previousSibling.childNodes[0].innerHTML;
        elem.innerHTML = "";
        // Theme will be "dark"
        vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
    }
  });
};

let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500);
};

// MODIFIED: Determine the expected state of the theme toggle.
let determineThemeSetting = () => {
  // localStorage.removeItem("theme"); // Optionally clear any stored preference
  return "dark"; // Force dark theme setting
};

// MODIFIED: Determine the computed theme.
let determineComputedTheme = () => {
  return "dark"; // Force dark computed theme
};

let initTheme = () => {
  // Force dark theme setting directly.
  // The 'theme' item in localStorage is no longer primary.
  // We ensure data-theme-setting and data-theme are set to "dark".
  localStorage.setItem("theme", "dark"); // Set localStorage to dark to prevent flicker on reload if other parts rely on it.
  document.documentElement.setAttribute("data-theme-setting", "dark");
  applyTheme(); // This will use determineComputedTheme which returns "dark"

  // REMOVED: Event listener for the theme toggle button as it's gone.
  // document.addEventListener("DOMContentLoaded", function () {
  //   const mode_toggle = document.getElementById("light-toggle");
  //   if (mode_toggle) { // Check if element exists
  //      mode_toggle.addEventListener("click", function () {
  //        toggleThemeSetting();
  //      });
  //   }
  // });

  // REMOVED: Event listener for system theme preference change as we force dark mode.
  // window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
  //   applyTheme();
  // });
};

// Initialize the theme when the script loads.
initTheme();
