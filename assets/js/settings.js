// Site settings: light mode, readable fonts, low data mode
// Persists via localStorage across pages

(function () {
  // Apply settings as early as possible to avoid flicker
  function isLightMode() {
    var stored = localStorage.getItem("setting-light-mode");
    if (stored !== null) return stored === "true";
    // No explicit preference set — follow OS preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  function applySettings() {
    const lightMode = isLightMode();
    const readableFonts = localStorage.getItem("setting-readable-fonts") === "true";
    const lowData = localStorage.getItem("setting-low-data") === "true";

    // Light/dark mode
    if (lightMode) {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.setAttribute("data-theme-setting", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.setAttribute("data-theme-setting", "dark");
    }

    // Readable fonts
    if (readableFonts) {
      document.documentElement.classList.add("readable-fonts");
    } else {
      document.documentElement.classList.remove("readable-fonts");
    }

    // Low data mode
    if (lowData) {
      document.documentElement.classList.add("low-data-mode");
    } else {
      document.documentElement.classList.remove("low-data-mode");
    }
  }

  // Apply immediately (before DOM ready) to prevent flicker
  applySettings();

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("settings-toggle");
    var panel = document.getElementById("settings-panel");
    var lightModeBox = document.getElementById("setting-light-mode");
    var readableFontsBox = document.getElementById("setting-readable-fonts");
    var lowDataBox = document.getElementById("setting-low-data");
    var highEntropyBox = document.getElementById("setting-high-entropy");

    if (!toggle || !panel) return;

    // Move panel to body root so no parent stacking context can clip it
    document.body.appendChild(panel);

    // Set checkbox states from localStorage (light mode respects OS preference)
    lightModeBox.checked = isLightMode();
    readableFontsBox.checked = localStorage.getItem("setting-readable-fonts") === "true";
    lowDataBox.checked = localStorage.getItem("setting-low-data") === "true";
    highEntropyBox.checked = localStorage.getItem("setting-high-entropy") === "true";

    // Listen for OS theme changes (if user hasn't set explicit preference)
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
        if (localStorage.getItem("setting-light-mode") === null) {
          applySettings();
          lightModeBox.checked = isLightMode();
          updateThemeComponents(isLightMode() ? "light" : "dark");
        }
      });
    }

    // Toggle panel
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        var rect = toggle.getBoundingClientRect();
        panel.style.top = (rect.bottom + 4) + "px";
        panel.style.right = (window.innerWidth - rect.right) + "px";
      }
    });

    // Close panel on outside click
    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && !toggle.contains(e.target)) {
        panel.classList.remove("open");
      }
    });

    // Light mode
    lightModeBox.addEventListener("change", function () {
      localStorage.setItem("setting-light-mode", this.checked);
      applySettings();
      updateThemeComponents(this.checked ? "light" : "dark");
    });

    // Readable fonts
    readableFontsBox.addEventListener("change", function () {
      localStorage.setItem("setting-readable-fonts", this.checked);
      applySettings();
    });

    // Low data mode
    lowDataBox.addEventListener("change", function () {
      localStorage.setItem("setting-low-data", this.checked);
      applySettings();
      applyLowDataMode(this.checked);
    });

    // High entropy
    highEntropyBox.addEventListener("change", function () {
      localStorage.setItem("setting-high-entropy", this.checked);
      if (window.setPDEHighEntropy) {
        window.setPDEHighEntropy(this.checked);
      }
    });

    // Apply low data mode on page load if enabled
    if (lowDataBox.checked) {
      applyLowDataMode(true);
    }
  });

  function updateThemeComponents(theme) {
    // Syntax highlighting
    var lightHL = document.getElementById("highlight_theme_light");
    var darkHL = document.getElementById("highlight_theme_dark");
    if (lightHL) lightHL.media = theme === "light" ? "" : "none";
    if (darkHL) darkHL.media = theme === "dark" ? "" : "none";

    // Giscus
    var giscusFrame = document.querySelector("iframe.giscus-frame");
    if (giscusFrame && giscusFrame.contentWindow) {
      try {
        giscusFrame.contentWindow.postMessage(
          { giscus: { setConfig: { theme: theme } } },
          "https://giscus.app"
        );
      } catch (e) {}
    }

    // Bootstrap tables
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      if (theme === "dark") {
        tables[i].classList.add("table-dark");
      } else {
        tables[i].classList.remove("table-dark");
      }
    }
  }

  function applyLowDataMode(enabled) {
    // Handle videos
    document.querySelectorAll("video").forEach(function (video) {
      if (enabled) {
        video.setAttribute("data-original-src", video.src || "");
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.style.display = "none";
      } else {
        var orig = video.getAttribute("data-original-src");
        if (orig) {
          video.src = orig;
          video.style.display = "";
        }
      }
    });

    // Handle images: swap to smaller versions or add loading=lazy
    document.querySelectorAll("img").forEach(function (img) {
      if (enabled) {
        // Use srcset smallest size if available, or add quality reduction via CSS
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        // Limit rendered size to reduce memory
        if (!img.getAttribute("data-original-style")) {
          img.setAttribute("data-original-style", img.style.cssText || "");
        }
        // Cap image width to reduce rendering cost
        img.style.imageRendering = "auto";
      } else {
        img.removeAttribute("decoding");
        var origStyle = img.getAttribute("data-original-style");
        if (origStyle !== null) {
          img.style.cssText = origStyle;
        }
      }
    });

    // Handle swiper slides with videos
    document.querySelectorAll("swiper-slide video, swiper-container video").forEach(function (video) {
      if (enabled) {
        video.style.display = "none";
      } else {
        video.style.display = "";
      }
    });
  }
})();
