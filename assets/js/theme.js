// Hard-coded to always apply and maintain dark theme, with MutationObserver.

function applyAndEnforceDarkTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const currentSetting = document.documentElement.getAttribute("data-theme-setting");

    // Only re-apply if not already dark, to avoid infinite loops with the observer
    if (currentTheme !== "dark" || currentSetting !== "dark") {
        console.log("THEME.JS: Detected theme deviation. Re-forcing dark theme.");
        document.documentElement.setAttribute("data-theme-setting", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    }

    // Ensure localStorage is also dark (might be redundant if nothing else reads it)
    if (localStorage.getItem("theme") !== "dark") {
        localStorage.setItem("theme", "dark");
    }

    // --- Apply specific dark theme stylings for components ---
    // (This part is condensed from your previous theme.js, ensure all necessary components are covered)

    // Highlight.js
    const lightThemeElement = document.getElementById("highlight_theme_light");
    const darkThemeElement = document.getElementById("highlight_theme_dark");
    if (lightThemeElement && darkThemeElement) {
        lightThemeElement.media = "none";
        darkThemeElement.media = "";
    }

    // Giscus
    const giscusFrame = document.querySelector("iframe.giscus-frame");
    if (giscusFrame && giscusFrame.contentWindow) { // Added check for contentWindow
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
        try { // Mermaid can error if not ready
            mermaid.initialize({ theme: "dark" });
            window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
        } catch (e) {
            console.warn("THEME.JS: Mermaid re-init error (might be ok on first load):", e);
        }
    }
    
    // Tables (ensure they have .table-dark)
    let tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
        if (!tables[i].classList.contains("table-dark")) {
            tables[i].classList.add("table-dark");
        }
    }

    // Other components like Diff2Html, Echarts, Vega-Lite would be similar:
    // Ensure their themes are set to dark.
    // Example for Echarts:
    if (typeof echarts !== "undefined") {
        document.querySelectorAll(".echarts").forEach((elem) => {
            // Simplified - assumes chart re-init with dark theme is needed
            // Actual re-initialization logic from your original theme.js might be more robust
            // This is a placeholder - you may need to adapt your specific Echarts theme update logic here.
            if (elem.dataset.echartsInstance) { 
                 // Consider re-init or theme update for echarts if applicable.
            }
        });
    }
    // console.log("THEME.JS: Dark theme enforcement applied/checked.");
}


// Initial application
applyAndEnforceDarkTheme();
document.addEventListener("DOMContentLoaded", applyAndEnforceDarkTheme);
window.addEventListener("load", applyAndEnforceDarkTheme);


// Setup MutationObserver to watch for changes on <html> attributes
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutationsList, observerInstance) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-theme-setting')) {
                const newTheme = document.documentElement.getAttribute("data-theme");
                const newSetting = document.documentElement.getAttribute("data-theme-setting");
                if (newTheme !== "dark" || newSetting !== "dark") {
                    console.warn("THEME.JS MutationObserver: data-theme or data-theme-setting changed away from dark! Reverting.");
                    observerInstance.disconnect(); // Temporarily disconnect to avoid self-triggering
                    applyAndEnforceDarkTheme();    // Force it back
                    observerInstance.observe(document.documentElement, { attributes: true }); // Reconnect
                }
            }
        }
    });

    observer.observe(document.documentElement, { attributes: true });
    console.log("THEME.JS: MutationObserver set up to enforce dark theme.");
} else {
    console.warn("THEME.JS: MutationObserver not supported. Theme might not be strictly enforced.");
    // Fallback: Periodically re-check and enforce, though less ideal
    // setInterval(applyAndEnforceDarkTheme, 1000); 
}
