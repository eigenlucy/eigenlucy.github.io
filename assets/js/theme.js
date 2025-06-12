// Theme script: Simplified to ONLY apply dark theme settings to components.

function applyDarkThemeToComponents() {
  const theme = "dark"; // This is now the only theme
  console.log("THEME.JS: Applying hardcoded dark theme to components.");

  // Set main data attributes on <html> - might still be useful if some CSS relies on it,
  // or for third-party components, even if _themes.scss is hardcoded.
  document.documentElement.setAttribute('data-theme-setting', theme);
  document.documentElement.setAttribute('data-theme', theme);

  // Highlight.js themes
  const lightThemeElement = document.getElementById("highlight_theme_light");
  const darkThemeElement = document.getElementById("highlight_theme_dark");
  if (lightThemeElement && darkThemeElement) {
    lightThemeElement.media = "none"; // Disable light syntax highlight stylesheet
    darkThemeElement.media = "";     // Enable dark syntax highlight stylesheet
  }

  // Giscus
  const giscusFrame = document.querySelector("iframe.giscus-frame");
  if (giscusFrame && giscusFrame.contentWindow) {
    giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: "dark" } } }, "https://giscus.app");
  }

  // Mermaid
  if (typeof mermaid !== "undefined") {
    document.querySelectorAll(".mermaid").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
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

  // Tables - ensure .table-dark class is present
  let tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    tables[i].classList.add("table-dark");
  }

  // Jupyter notebooks
  let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
  for (let i = 0; i < jupyterNotebooks.length; i++) {
    if (jupyterNotebooks[i].getElementsByTagName("iframe")[0] &&
        jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow &&
        jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow.document &&
        jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow.document.body) {
      let bodyElement = jupyterNotebooks[i].getElementsByTagName("iframe")[0].contentWindow.document.body;
      bodyElement.setAttribute("data-jp-theme-light", "false");
      bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Dark");
    }
  }

  // Medium-zoom background
  if (typeof medium_zoom !== "undefined") {
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color");
    if (!bgColor || bgColor === "transparent" || bgColor.trim() === "") {
        bgColor = "#1c1c1d"; // Fallback dark theme bg, from your _themes.scss
    }
    medium_zoom.update({
      background: bgColor + "ee", // Add alpha for transparency
    });
  }

  // Diff2Html
  if (typeof Diff2HtmlUI !== "undefined") {
    document.querySelectorAll(".diff2html").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
        let textData = elem.previousSibling.childNodes[0].innerHTML;
        elem.innerHTML = "";
        const configuration = { colorScheme: "dark", drawFileList: true, highlight: true, matching: "lines" };
        const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
        diff2htmlUi.draw();
      }
    });
  }
  
  // Echarts
  if (typeof echarts !== "undefined") {
    document.querySelectorAll(".echarts").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
        let jsonData = elem.previousSibling.childNodes[0].innerHTML;
        echarts.dispose(elem);
        var chart = echarts.init(elem, "dark-fresh-cut"); 
        chart.setOption(JSON.parse(jsonData));
      }
    });
  }

  // Vega-Lite
  if (typeof vegaEmbed !== "undefined") {
    document.querySelectorAll(".vega-lite").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
        let jsonData = elem.previousSibling.childNodes[0].innerHTML;
        elem.innerHTML = "";
        vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
      }
    });
  }
}

// Apply the dark theme settings to components once the DOM is ready.
if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', applyDarkThemeToComponents);
} else {  // `DOMContentLoaded` has already fired
  applyDarkThemeToComponents();
}

// Remove localStorage theme setting as it's no longer used for switching
// localStorage.removeItem('theme'); // Or set to dark: localStorage.setItem('theme', 'dark');
// Keeping it set to dark might be safer if any obscure part of the theme still peeks at it.
localStorage.setItem('theme', 'dark');

console.log("THEME.JS: Simplified for permanent dark theme.");
