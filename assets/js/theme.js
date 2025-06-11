// Theme script: Hardcoded to Dark Mode

// Determine the theme setting - always dark
let determineThemeSetting = () => {
  localStorage.setItem("theme", "dark"); // Ensure localStorage reflects dark
  return "dark";
};

// Determine the computed theme - always dark
let determineComputedTheme = () => {
  return "dark";
};

// Apply the computed dark theme to the website.
let applyTheme = () => {
  const theme = "dark"; // Forced

  // Optional: Re-add transition logic if flicker is minimal and desired
  // document.documentElement.classList.add("transition");
  // window.setTimeout(() => {
  //   document.documentElement.classList.remove("transition");
  // }, 500);

  document.documentElement.setAttribute("data-theme-setting", theme);
  document.documentElement.setAttribute("data-theme", theme);

  // Apply dark theme to specific components
  // Highlight.js
  const lightThemeElement = document.getElementById("highlight_theme_light");
  const darkThemeElement = document.getElementById("highlight_theme_dark");
  if (lightThemeElement && darkThemeElement) {
    lightThemeElement.media = "none";
    darkThemeElement.media = "";
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
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color");
    if (!bgColor || bgColor === "transparent" || bgColor.trim() === "") {
        bgColor = "#1c1c1d"; // Fallback dark theme bg
    }
    medium_zoom.update({
      background: bgColor + "ee",
    });
  }

  // Diff2Html, Echarts, Vega-Lite would need similar hardcoding to dark if they were used and themed
  // For example, for Echarts:
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
  console.log("THEME.JS: Dark theme applied.");
};

// Change the theme setting and apply the theme.
let setThemeSetting = (themeSetting) => {
  // We are forcing dark, so themeSetting parameter is ignored but kept for compatibility if called elsewhere.
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme-setting", "dark");
  applyTheme();
};

// Initialize and force dark theme.
let initTheme = () => {
  setThemeSetting("dark"); // This will set localStorage, attributes, and call applyTheme.
  // No event listeners for toggle button or system preference needed.
  console.log("THEME.JS: initTheme() called, forced dark.");
};

// Initialize the theme when the script loads.
initTheme();
