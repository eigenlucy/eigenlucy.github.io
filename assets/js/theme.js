// Theme script: Defaults to dark, respects settings.js localStorage overrides.

// Globally available function, defined immediately
window.determineComputedTheme = function() {
  var stored = localStorage.getItem("setting-light-mode");
  if (stored !== null) return stored === "true" ? "light" : "dark";
  // No explicit preference — follow OS preference
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
};

// Main function to apply theme settings to various components
window.applyDarkThemeToComponents = function() {
  const theme = window.determineComputedTheme();
  // console.log("THEME.JS: applyDarkThemeToComponents() running for theme: " + theme);

  // Set main data attributes on <html> - this is crucial for CSS variable scoping
  document.documentElement.setAttribute('data-theme-setting', theme);
  document.documentElement.setAttribute('data-theme', theme);

  // Highlight.js syntax highlighting themes
  const lightThemeElement = document.getElementById("highlight_theme_light");
  const darkThemeElement = document.getElementById("highlight_theme_dark");
  if (lightThemeElement) {
    lightThemeElement.media = theme === "light" ? "" : "none";
  }
  if (darkThemeElement) {
    darkThemeElement.media = theme === "dark" ? "" : "none";
  }

  // Giscus comments theme
  const giscusFrame = document.querySelector("iframe.giscus-frame");
  if (giscusFrame && giscusFrame.contentWindow) {
    try {
        giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, "https://giscus.app");
    } catch (e) {
        console.warn("THEME.JS: Giscus postMessage failed:", e);
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
      mermaid.initialize({ theme: theme === "dark" ? "dark" : "default" });
      window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
    } catch (e) {
      console.warn("THEME.JS: Mermaid re-init error:", e);
    }
  }

  // Bootstrap Tables
  let tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    if (theme === "dark") {
      tables[i].classList.add("table-dark");
    } else {
      tables[i].classList.remove("table-dark");
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
window.setThemeSetting = function(themeSetting) {
  const theme = window.determineComputedTheme();
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme-setting", theme);
  window.applyDarkThemeToComponents();
};

// Globally available function, called from head.liquid and end of this script
window.initTheme = function() {
  // console.log("Global initTheme() called.");
  window.setThemeSetting("dark"); // Ensure it calls the global setThemeSetting
};

// Initial setup when this script itself is parsed and executed.
// Respect settings.js localStorage values.
const _initTheme = window.determineComputedTheme();
localStorage.setItem('theme', _initTheme);
document.documentElement.setAttribute('data-theme-setting', _initTheme);
document.documentElement.setAttribute('data-theme', _initTheme);

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
