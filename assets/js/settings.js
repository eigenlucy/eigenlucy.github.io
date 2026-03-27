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
      // When disabling low data mode, re-apply gallery throttle
      if (!this.checked) {
        initGalleryThrottle();
      }
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

    // Gallery image throttle — always active (browser lazy loading is too aggressive)
    // Low data mode has its own stricter gate, so skip if already active
    if (!lowDataBox.checked) {
      initGalleryThrottle();
    }
  });

  var galleryObserver = null;
  var galleryLoadingCount = 0;
  var galleryQueue = [];
  var GALLERY_MAX_CONCURRENT = 10;
  var GALLERY_EAGER_COUNT = 10; // first N images load immediately

  function galleryLoadNext() {
    while (galleryQueue.length > 0 && galleryLoadingCount < GALLERY_MAX_CONCURRENT) {
      var img = galleryQueue.shift();
      if (img.getAttribute("data-gallery-src")) {
        galleryLoadingCount++;
        img.addEventListener("load", function onLoad() {
          img.removeEventListener("load", onLoad);
          galleryLoadingCount--;
          galleryLoadNext();
        }, { once: true });
        img.addEventListener("error", function onError() {
          img.removeEventListener("error", onError);
          galleryLoadingCount--;
          galleryLoadNext();
        }, { once: true });
        // Restore real src/srcset
        var realSrc = img.getAttribute("data-gallery-src");
        if (realSrc) { img.src = realSrc; img.removeAttribute("data-gallery-src"); }
        var realSrcset = img.getAttribute("data-gallery-srcset");
        if (realSrcset) { img.srcset = realSrcset; img.removeAttribute("data-gallery-srcset"); }
        var picture = img.closest("picture");
        if (picture) {
          picture.querySelectorAll("source[data-gallery-srcset]").forEach(function (source) {
            source.srcset = source.getAttribute("data-gallery-srcset");
            source.removeAttribute("data-gallery-srcset");
          });
        }
      }
    }
  }

  function initGalleryThrottle() {
    var gallery = document.querySelector(".gallery");
    if (!gallery) return;

    var imgs = gallery.querySelectorAll("img");
    var deferred = [];

    imgs.forEach(function (img, i) {
      if (i < GALLERY_EAGER_COUNT) return; // let first N load normally
      var src = img.getAttribute("src");
      var srcset = img.getAttribute("srcset");
      if (src && src !== PLACEHOLDER) {
        img.setAttribute("data-gallery-src", src);
        img.src = PLACEHOLDER;
      }
      if (srcset) {
        img.setAttribute("data-gallery-srcset", srcset);
        img.removeAttribute("srcset");
      }
      var picture = img.closest("picture");
      if (picture) {
        picture.querySelectorAll("source[srcset]").forEach(function (source) {
          source.setAttribute("data-gallery-srcset", source.srcset);
          source.removeAttribute("srcset");
        });
      }
      deferred.push(img);
    });

    if (deferred.length === 0) return;

    galleryObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          galleryObserver.unobserve(entry.target);
          galleryQueue.push(entry.target);
          galleryLoadNext();
        }
      });
    }, { rootMargin: "300% 0px" }); // 3 viewport heights ahead

    deferred.forEach(function (img) { galleryObserver.observe(img); });
  }

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

  // Low data mode state
  var lowDataObserver = null;
  var lowDataLoadingCount = 0;
  var lowDataQueue = [];
  var LOW_DATA_MAX_CONCURRENT = 5;
  var PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  function lowDataRestoreImage(img) {
    var realSrc = img.getAttribute("data-lowdata-src");
    var realSrcset = img.getAttribute("data-lowdata-srcset");
    if (realSrc) {
      img.src = realSrc;
      img.removeAttribute("data-lowdata-src");
    }
    if (realSrcset) {
      img.srcset = realSrcset;
      img.removeAttribute("data-lowdata-srcset");
    }
    // Also restore <source> elements in <picture>
    var picture = img.closest("picture");
    if (picture) {
      picture.querySelectorAll("source[data-lowdata-srcset]").forEach(function (source) {
        source.srcset = source.getAttribute("data-lowdata-srcset");
        source.removeAttribute("data-lowdata-srcset");
      });
    }
  }

  function lowDataLoadNext() {
    while (lowDataQueue.length > 0 && lowDataLoadingCount < LOW_DATA_MAX_CONCURRENT) {
      var img = lowDataQueue.shift();
      // Only restore if it still has stashed src (not already restored)
      if (img.getAttribute("data-lowdata-src")) {
        lowDataLoadingCount++;
        img.addEventListener("load", function onLoad() {
          img.removeEventListener("load", onLoad);
          lowDataLoadingCount--;
          lowDataLoadNext();
        }, { once: true });
        img.addEventListener("error", function onError() {
          img.removeEventListener("error", onError);
          lowDataLoadingCount--;
          lowDataLoadNext();
        }, { once: true });
        lowDataRestoreImage(img);
      }
    }
  }

  function addVideoPlaceholder(video) {
    var ph = document.createElement("div");
    ph.className = "lowdata-video-placeholder";
    ph.textContent = "video hidden (low data mode)";
    video.parentNode.insertBefore(ph, video.nextSibling);
  }

  function removeVideoPlaceholder(video) {
    var next = video.nextElementSibling;
    if (next && next.classList.contains("lowdata-video-placeholder")) {
      next.remove();
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
        addVideoPlaceholder(video);
      } else {
        removeVideoPlaceholder(video);
        var orig = video.getAttribute("data-original-src");
        if (orig) {
          video.src = orig;
          video.style.display = "";
        }
      }
    });

    // Handle swiper slides with videos
    document.querySelectorAll("swiper-slide video, swiper-container video").forEach(function (video) {
      if (enabled) {
        video.style.display = "none";
        addVideoPlaceholder(video);
      } else {
        removeVideoPlaceholder(video);
        video.style.display = "";
      }
    });

    // Handle images with IntersectionObserver gating
    if (enabled) {
      // Stash real src/srcset and replace with placeholder
      document.querySelectorAll("img").forEach(function (img) {
        if (img.getAttribute("data-lowdata-src")) return; // already stashed
        var src = img.getAttribute("src");
        var srcset = img.getAttribute("srcset");
        if (src && src !== PLACEHOLDER) {
          img.setAttribute("data-lowdata-src", src);
          img.src = PLACEHOLDER;
        }
        if (srcset) {
          img.setAttribute("data-lowdata-srcset", srcset);
          img.removeAttribute("srcset");
        }
        // Stash <source> srcsets in <picture>
        var picture = img.closest("picture");
        if (picture) {
          picture.querySelectorAll("source[srcset]").forEach(function (source) {
            source.setAttribute("data-lowdata-srcset", source.srcset);
            source.removeAttribute("srcset");
          });
        }
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
      });

      // Create observer to load images near viewport
      lowDataQueue = [];
      lowDataLoadingCount = 0;
      if (lowDataObserver) lowDataObserver.disconnect();
      lowDataObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            lowDataObserver.unobserve(img);
            lowDataQueue.push(img);
            lowDataLoadNext();
          }
        });
      }, { rootMargin: "200% 0px" });

      document.querySelectorAll("img[data-lowdata-src]").forEach(function (img) {
        lowDataObserver.observe(img);
      });
    } else {
      // Disable: disconnect observer and restore all images
      if (lowDataObserver) {
        lowDataObserver.disconnect();
        lowDataObserver = null;
      }
      lowDataQueue = [];
      lowDataLoadingCount = 0;
      document.querySelectorAll("img[data-lowdata-src]").forEach(function (img) {
        lowDataRestoreImage(img);
        img.removeAttribute("decoding");
      });
    }
  }
})();
