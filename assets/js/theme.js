// Theme script: Hardcoded to Dark Mode, ensuring global functions.

// Globally available function, defined immediately
window.determineComputedTheme = function() {
  // console.log("WINDOW.determineComputedTheme: returning dark.");
  return "dark";
};

// Main function to apply dark theme settings to various components
window.applyDarkThemeToComponents = function() {
  const theme = "dark"; // Ensure theme is always dark for component styling
  // console.log("THEME.JS: applyDarkThemeToComponents() running for theme: " + theme);

  // Set main data attributes on <html> - this is crucial for CSS variable scoping
  document.documentElement.setAttribute('data-theme-setting', theme);
  document.documentElement.setAttribute('data-theme', theme);

  // Highlight.js syntax highlighting themes
  const lightThemeElement = document.getElementById("highlight_theme_light");
  const darkThemeElement = document.getElementById("highlight_theme_dark");
  if (lightThemeElement) {
    lightThemeElement.media = "none"; // Disable light syntax highlight stylesheet
  }
  if (darkThemeElement) {
    darkThemeElement.media = "";     // Enable dark syntax highlight stylesheet
  }

  // Giscus comments theme
  const giscusFrame = document.querySelector("iframe.giscus-frame");
  if (giscusFrame && giscusFrame.contentWindow) {
    try {
        giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: "dark" } } }, "https://giscus.app");
    } catch (e) {
        console.warn("THEME.JS: Giscus postMessage failed (iframe might not be ready or from different origin if sandboxed too strictly):", e);
    }
  }

  // Mermaid diagrams theme
  if (typeof mermaid !== "undefined") {
    document.querySelectorAll(".mermaid").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0 && typeof elem.previousSibling.childNodes[0].innerHTML === 'string') {
        let svgCode = elem.previousSibling.childNodes[0].innerHTML;
        elem.removeAttribute("data-processed");
        elem.innerHTML = svgCode;
      }
    });
    try {
      mermaid.initialize({ theme: "dark" });
      window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
    } catch (e) {
      console.warn("THEME.JS: Mermaid re-init error:", e);
    }
  }

  // Bootstrap Tables - ensure .table-dark class is present
  let tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    if (!tables[i].classList.contains("table-dark")) {
        tables[i].classList.add("table-dark");
    }
  }

  // Jupyter notebooks theme
  let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
  for (let i = 0; i < jupyterNotebooks.length; i++) {
    const iframe = jupyterNotebooks[i].getElementsByTagName("iframe")[0];
    if (iframe && iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body) {
      let bodyElement = iframe.contentWindow.document.body;
      bodyElement.setAttribute("data-jp-theme-light", "false");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Dark");
    }
  }

  // Medium-zoom overlay background
  if (typeof medium_zoom !== "undefined") {
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color");
    if (!bgColor || bgColor === "transparent" || bgColor.trim() === "") {
        bgColor = "#1c1c1d"; // Fallback: your dark theme bg from _sass/_themes.scss
    }
    medium_zoom.update({
      background: bgColor + "ee", // Add alpha for transparency
    });
  }

  // Diff2Html theme
  if (typeof Diff2HtmlUI !== "undefined") {
    document.querySelectorAll(".diff2html").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0 && typeof elem.previousSibling.childNodes[0].innerHTML === 'string') {
        let textData = elem.previousSibling.childNodes[0].innerHTML;
        elem.innerHTML = "";
        const configuration = { colorScheme: "dark", drawFileList: true, highlight: true, matching: "lines" };
        const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
        diff2htmlUi.draw();
      }
    });
  }
  
  // Echarts theme
  if (typeof echarts !== "undefined") {
    document.querySelectorAll(".echarts").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0 && typeof elem.previousSibling.childNodes[0].innerHTML === 'string') {
        let jsonData = elem.previousSibling.childNodes[0].innerHTML;
        echarts.dispose(elem); // Dispose existing instance before re-init
        var chart = echarts.init(elem, "dark-fresh-cut"); 
        try {
            chart.setOption(JSON.parse(jsonData));
        } catch (e) {
            console.warn("THEME.JS: ECharts JSON.parse or setOption error:", e);
        }
      }
    });
  }

  // Vega-Lite theme
  if (typeof vegaEmbed !== "undefined") {
    document.querySelectorAll(".vega-lite").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0 && typeof elem.previousSibling.childNodes[0].innerHTML === 'string') {
        let jsonData = elem.previousSibling.childNodes[0].innerHTML;
        elem.innerHTML = ""; // Clear previous render
        try {
            vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
        } catch (e) {
            console.warn("THEME.JS: Vega-Lite JSON.parse or embed error:", e);
        }
      }
    });
  }
  // console.log("THEME.JS: Dark theme components updated by applyDarkThemeToComponents.");
}

// Globally available function
window.setThemeSetting = function(themeSetting) { // themeSetting arg is ignored, always dark
  // console.log("Global setThemeSetting(), forcing dark.");
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme-setting", "dark"); // Ensure this is set too
  window.applyDarkThemeToComponents(); // Call the global version
};

// Globally available function, called from head.liquid and end of this script
window.initTheme = function() {
  // console.log("Global initTheme() called.");
  window.setThemeSetting("dark"); // Ensure it calls the global setThemeSetting
};

// Initial setup when this script itself is parsed and executed.
// This ensures functions are defined. The actual application to components
// that might not exist yet is handled by DOMContentLoaded or the inline call in head.
localStorage.setItem('theme', 'dark'); // Set early
document.documentElement.setAttribute('data-theme-setting', 'dark');
document.documentElement.setAttribute('data-theme', 'dark');

// Call initTheme when the DOM is fully loaded to ensure all elements are available for styling.
if (document.readyState === 'loading') {  // Or use 'interactive' or 'complete' if issues persist
  document.addEventListener('DOMContentLoaded', function() {
    // console.log("THEME.JS (DOMContentLoaded): Calling window.initTheme().");
    window.initTheme();
  });
} else {
  // console.log("THEME.JS (DOM already loaded): Calling window.initTheme().");
  window.initTheme();
}

console.log("THEME.JS: Loaded and configured for permanent dark theme. Global functions are available.");
