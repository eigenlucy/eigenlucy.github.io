// Hard-coded to always apply and maintain dark theme.

// This function now directly applies "dark" settings.
let applyDarkTheme = () => {
  const theme = "dark"; // Force dark

  // document.documentElement.classList.add("transition"); // Keep transitions if desired
  // window.setTimeout(() => {
  //   document.documentElement.classList.remove("transition");
  // }, 500);
  // ^ transTheme logic moved here if needed, or removed if transitions are problematic.
  // Forcing theme, transitions might be less critical or could be simplified.

  // Set main data attributes
  document.documentElement.setAttribute("data-theme-setting", theme);
  document.documentElement.setAttribute("data-theme", theme);

  // Highlight.js themes
  const lightThemeElement = document.getElementById("highlight_theme_light");
  const darkThemeElement = document.getElementById("highlight_theme_dark");
  if (lightThemeElement && darkThemeElement) {
    lightThemeElement.media = "none";
    darkThemeElement.media = "";
  }

  // Giscus
  function sendGiscusMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }
  sendGiscusMessage({ setConfig: { theme: theme } });

  // Mermaid
  if (typeof mermaid !== "undefined") {
    document.querySelectorAll(".mermaid").forEach((elem) => {
      if (elem.previousSibling && elem.previousSibling.childNodes && elem.previousSibling.childNodes.length > 0) {
        let svgCode = elem.previousSibling.childNodes[0].innerHTML;
        elem.removeAttribute("data-processed");
        elem.innerHTML = svgCode;
      }
    });
    mermaid.initialize({ theme: "dark" }); // Force dark for mermaid
    window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
    // Mermaid zoom logic (addMermaidZoom) can be called here if needed, or kept separate
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
        var chart = echarts.init(elem, "dark-fresh-cut"); // Force dark theme for echarts
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
        vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" }); // Force dark for vega
      }
    });
  }
  
  // Tables
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

  // Medium-zoom
  if (typeof medium_zoom !== "undefined") {
    // Ensure --global-bg-color is from the dark theme context
    // This might need a more robust way to get dark theme's bg color if it's not yet applied
    // or simply hardcode a dark transparent color.
    // Forcing dark theme, so --global-bg-color should resolve to the dark version.
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color");
    if (!bgColor || bgColor === "transparent" || bgColor.trim() === "") { // Fallback if not resolved or transparent
        bgColor = "#1c1c1d"; // Default dark theme bg from _themes.scss
    }
    medium_zoom.update({
      background: bgColor + "ee", 
    });
  }
  console.log("Forced dark theme applied.");
};

// Initialize and force dark theme.
let initForcedDarkTheme = () => {
  localStorage.setItem("theme", "dark"); // Ensure localStorage is set to dark.
  applyDarkTheme(); // Apply dark theme immediately.

  // Optional: Add a listener for DOMContentLoaded if some elements are not ready when this script runs
  // document.addEventListener("DOMContentLoaded", applyDarkTheme);

  // No listeners for theme toggle or system preference change needed.
  // We could even add a MutationObserver on documentElement attributes to revert any unwanted changes
  // but that might be overkill for now. Let's see if this simplification works.
};

initForcedDarkTheme();
