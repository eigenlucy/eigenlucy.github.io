const pdfjsLib = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs");
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";

const params = new URLSearchParams(window.location.search);
const filePath = params.get("file");
const startPage = parseInt(params.get("page"), 10) || 1;
const highlightParam = params.get("highlight") || "";

if (!filePath) {
  document.getElementById("pdf-container").innerHTML =
    "<p>No file specified. Use <code>?file=/path/to/doc.pdf</code></p>";
  throw new Error("No file param");
}

// Set download link
const dlLink = document.getElementById("pdf-download");
dlLink.href = filePath;

const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");
const textLayerDiv = document.getElementById("pdf-text-layer");
const pageInput = document.getElementById("pdf-page-input");
const pageCount = document.getElementById("pdf-page-count");
const searchInput = document.getElementById("pdf-search");
const matchCountSpan = document.getElementById("pdf-match-count");

let pdfDoc = null;
let currentPage = startPage;
let rendering = false;
let rotation = 0;

// Search state
let searchQuery = "";
let matches = []; // [{ page, index }]
let currentMatchIdx = -1;

async function renderPage(num) {
  if (rendering) return;
  rendering = true;

  const page = await pdfDoc.getPage(num);
  const viewport = page.getViewport({ scale: 1, rotation });

  // Scale to fit container width
  const container = document.getElementById("pdf-container");
  const scale = container.clientWidth / viewport.width;
  const scaledViewport = page.getViewport({ scale, rotation });

  const dpr = window.devicePixelRatio || 1;
  canvas.width = scaledViewport.width * dpr;
  canvas.height = scaledViewport.height * dpr;
  canvas.style.width = scaledViewport.width + "px";
  canvas.style.height = scaledViewport.height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

  // Text layer
  textLayerDiv.innerHTML = "";
  textLayerDiv.style.width = scaledViewport.width + "px";
  textLayerDiv.style.height = scaledViewport.height + "px";

  const textContent = await page.getTextContent();
  const textItems = textContent.items;

  textItems.forEach((item) => {
    const span = document.createElement("span");
    const tx = pdfjsLib.Util.transform(
      scaledViewport.transform,
      item.transform
    );
    span.textContent = item.str;
    span.style.position = "absolute";
    span.style.left = tx[4] + "px";
    span.style.top = tx[5] - item.height * scale + "px";
    span.style.fontSize = Math.abs(tx[3]) + "px";
    span.style.fontFamily = item.fontName || "sans-serif";
    textLayerDiv.appendChild(span);
  });

  // Highlight matching text using current search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    textLayerDiv.querySelectorAll("span").forEach((span) => {
      if (span.textContent.toLowerCase().includes(query)) {
        span.classList.add("pdf-highlight");
      }
    });
  }

  pageInput.value = num;
  currentPage = num;
  rendering = false;
}

function gotoPage(num) {
  if (num < 1 || num > pdfDoc.numPages) return;
  renderPage(num);
}

// --- Full-text search ---

async function searchAllPages(query) {
  matches = [];
  currentMatchIdx = -1;
  searchQuery = query;

  if (!query) {
    updateMatchCounter();
    renderPage(currentPage);
    return;
  }

  const q = query.toLowerCase();

  for (let p = 1; p <= pdfDoc.numPages; p++) {
    const page = await pdfDoc.getPage(p);
    const textContent = await page.getTextContent();
    textContent.items.forEach((item, idx) => {
      if (item.str.toLowerCase().includes(q)) {
        matches.push({ page: p, index: idx });
      }
    });
  }

  updateMatchCounter();

  if (matches.length > 0) {
    currentMatchIdx = 0;
    // Jump to first match on or after the current page, or first overall
    const onOrAfter = matches.findIndex((m) => m.page >= currentPage);
    if (onOrAfter !== -1) currentMatchIdx = onOrAfter;
    jumpToCurrentMatch();
  } else {
    // Re-render to clear old highlights if query changed to no-match
    renderPage(currentPage);
  }
}

function jumpToCurrentMatch() {
  if (currentMatchIdx < 0 || currentMatchIdx >= matches.length) return;
  const match = matches[currentMatchIdx];
  updateMatchCounter();
  if (match.page !== currentPage) {
    gotoPage(match.page);
  } else {
    // Already on the right page, just re-render to update highlights
    renderPage(currentPage);
  }
}

function nextMatch() {
  if (matches.length === 0) return;
  currentMatchIdx = (currentMatchIdx + 1) % matches.length;
  jumpToCurrentMatch();
}

function prevMatch() {
  if (matches.length === 0) return;
  currentMatchIdx = (currentMatchIdx - 1 + matches.length) % matches.length;
  jumpToCurrentMatch();
}

function updateMatchCounter() {
  if (!searchQuery || matches.length === 0) {
    matchCountSpan.textContent = searchQuery ? "0 of 0" : "";
  } else {
    matchCountSpan.textContent = `${currentMatchIdx + 1} of ${matches.length}`;
  }
}

// Search event listeners
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (searchInput.value === searchQuery && matches.length > 0) {
      // Same query — cycle to next match
      nextMatch();
    } else {
      searchAllPages(searchInput.value.trim());
    }
  }
  if (e.key === "Escape") {
    searchInput.value = "";
    searchAllPages("");
  }
});

document.getElementById("pdf-search-next").addEventListener("click", nextMatch);
document.getElementById("pdf-search-prev").addEventListener("click", prevMatch);

// Controls
document.getElementById("pdf-prev").addEventListener("click", () => {
  gotoPage(currentPage - 1);
});
document.getElementById("pdf-next").addEventListener("click", () => {
  gotoPage(currentPage + 1);
});
pageInput.addEventListener("change", () => {
  gotoPage(parseInt(pageInput.value, 10));
});

// Rotation
document.getElementById("pdf-rotate-left").addEventListener("click", () => {
  rotation = (rotation - 90 + 360) % 360;
  renderPage(currentPage);
});
document.getElementById("pdf-rotate-right").addEventListener("click", () => {
  rotation = (rotation + 90) % 360;
  renderPage(currentPage);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "ArrowLeft") gotoPage(currentPage - 1);
  if (e.key === "ArrowRight") gotoPage(currentPage + 1);
});

// Re-render on resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => renderPage(currentPage), 200);
});

// Load the PDF
pdfDoc = await pdfjsLib.getDocument(filePath).promise;
pageCount.textContent = pdfDoc.numPages;
pageInput.max = pdfDoc.numPages;

const initialPage = Math.min(startPage, pdfDoc.numPages);

// If ?highlight= param is set, pre-populate search and highlight on current page only
if (highlightParam) {
  searchInput.value = highlightParam;
  searchQuery = highlightParam;
}
renderPage(initialPage);
