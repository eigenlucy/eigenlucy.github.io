const pdfjsLib = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs");
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";

const params = new URLSearchParams(window.location.search);
const filePath = params.get("file");
const startPage = parseInt(params.get("page"), 10) || 1;
const highlightText = params.get("highlight") || "";

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

let pdfDoc = null;
let currentPage = startPage;
let rendering = false;

async function renderPage(num) {
  if (rendering) return;
  rendering = true;

  const page = await pdfDoc.getPage(num);
  const viewport = page.getViewport({ scale: 1 });

  // Scale to fit container width
  const container = document.getElementById("pdf-container");
  const scale = container.clientWidth / viewport.width;
  const scaledViewport = page.getViewport({ scale });

  canvas.width = scaledViewport.width;
  canvas.height = scaledViewport.height;

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

  // Highlight matching text
  if (highlightText) {
    const query = highlightText.toLowerCase();
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
renderPage(initialPage);
