// Run immediately — `defer` on the script tag guarantees DOM is ready.
// Using 'load' would delay until every image/font finishes downloading.
(function () {
    const canvas = document.getElementById('pde-background-canvas');
    if (!canvas) {
        console.error('RD Script: Canvas not found!');
        return;
    }
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
        console.error('RD Script: Failed to get 2D context!');
        return;
    }

    // Offscreen buffer to prevent partial-draw flicker
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d', { alpha: false });

    console.log('RD Script: Initialized with DYNAMIC cell drawing v11');

    // === FIXED SIMULATION GRID SIZE (in cells) ===
    const SIM_COLS = 200; // Example: 200 cells wide
    const SIM_ROWS = 150; // Example: 150 cells high
    // const cellSize = 10;  // REMOVED: Size of each cell in pixels

    // Canvas dimensions will still track window size for the drawing surface
    let canvasWidth = canvas.width = window.innerWidth;
    let canvasHeight = canvas.height = window.innerHeight;
    offscreen.width = canvasWidth;
    offscreen.height = canvasHeight;

    // ADDED: Dynamic cell drawing dimensions
    let cellDrawWidth = canvasWidth / SIM_COLS;
    let cellDrawHeight = canvasHeight / SIM_ROWS;

    let isDrawingPaused = false; // Used by resize handler
    let resizeDebounceTimer;
    const DEBOUNCE_DELAY = 100; // ms delay for redrawing after resize spam stops

    // Reaction-Diffusion parameters
    const diffusionRateA = 0.8;
    const diffusionRateB = 0.4;
    let baseFeedRate = 0.050;
    let baseKillRate = 0.062;
    let feedRate = baseFeedRate;
    let killRate = baseKillRate;
    let time = 0;
    const oscillationSpeed = 0.0005;
    const oscillationAmplitude = 0.003;
    let perturbationInterval = 300; // frames
    let frameCounter = 0;

    let grid = [];
    let nextGrid = [];

    function initializeGrid() {
        // Update canvas and cell drawing dimensions
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        if (canvas.width !== newWidth || canvas.height !== newHeight) {
            canvas.width = newWidth;
            canvas.height = newHeight;
            offscreen.width = newWidth;
            offscreen.height = newHeight;
        }
        canvasWidth = newWidth;
        canvasHeight = newHeight;
        cellDrawWidth = canvasWidth / SIM_COLS;
        cellDrawHeight = canvasHeight / SIM_ROWS;
        
        // Initialize grid with fixed SIM_COLS and SIM_ROWS
        grid = new Array(SIM_COLS);
        nextGrid = new Array(SIM_COLS);
        for (let i = 0; i < SIM_COLS; i++) {
            grid[i] = new Array(SIM_ROWS);
            nextGrid[i] = new Array(SIM_ROWS);
            for (let j = 0; j < SIM_ROWS; j++) {
                grid[i][j] = { a: 1, b: 0 };
                nextGrid[i][j] = { a: 1, b: 0 };
            }
        }

        const numInitialSeeds = Math.floor(Math.random() * 3) + 2;
        const initialSeedSize = 10;
        // Updated log
        console.log(`RD Script: Grid ${SIM_COLS}x${SIM_ROWS} initialized. Canvas: ${canvasWidth}x${canvasHeight}. Cell Draw: ${cellDrawWidth.toFixed(2)}x${cellDrawHeight.toFixed(2)}`);
        for (let s = 0; s < numInitialSeeds; s++) {
            const seedX = Math.floor(Math.random() * Math.max(1, SIM_COLS - initialSeedSize * 2)) + Math.min(initialSeedSize - 1, Math.max(0, SIM_COLS - initialSeedSize - 1));
            const seedY = Math.floor(Math.random() * Math.max(1, SIM_ROWS - initialSeedSize * 2)) + Math.min(initialSeedSize - 1, Math.max(0, SIM_ROWS - initialSeedSize - 1));
            seedGrid(seedX, seedY, initialSeedSize, 0.7 + Math.random() * 0.2);
        }
    }

    function seedGrid(centerX, centerY, seedSize, bValue) {
        for (let i = Math.max(0, centerX - seedSize); i < Math.min(SIM_COLS, centerX + seedSize); i++) {
            for (let j = Math.max(0, centerY - seedSize); j < Math.min(SIM_ROWS, centerY + seedSize); j++) {
                if (grid[i] && grid[i][j]) {
                     grid[i][j].b = bValue + Math.random() * 0.1;
                }
            }
        }
    }
    
    function periodicPerturbation() {
        const numPerturbations = Math.floor(Math.random() * 2) + 1;
        const perturbationSize = Math.floor(Math.random() * 4) + 4;
        for (let p = 0; p < numPerturbations; p++) {
            const randX = Math.floor(Math.random() * SIM_COLS);
            const randY = Math.floor(Math.random() * SIM_ROWS);
            seedGrid(randX, randY, perturbationSize, 0.4 + Math.random() * 0.3);
        }
    }

    function updateParameters() {
        time += oscillationSpeed;
        feedRate = baseFeedRate + Math.sin(time) * oscillationAmplitude;
    }

    function updateGrid() {
        updateParameters(); 
        for (let x = 0; x < SIM_COLS; x++) {
            for (let y = 0; y < SIM_ROWS; y++) {
                if (!grid[x] || !nextGrid[x] || !grid[x][y]) continue;
                const a = grid[x][y].a;
                const b = grid[x][y].b;
                let laplacianA = 0; let laplacianB = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        const col = (x + i + SIM_COLS) % SIM_COLS;
                        const row = (y + j + SIM_ROWS) % SIM_ROWS;
                        if (!grid[col] || !grid[col][row]) continue;
                        let weight = (Math.abs(i) + Math.abs(j) === 1) ? 0.2 : 0.05;
                        laplacianA += grid[col][row].a * weight;
                        laplacianB += grid[col][row].b * weight;
                    }
                }
                laplacianA -= a; laplacianB -= b;
                const reaction = a * b * b;
                let nextA = a + (diffusionRateA * laplacianA) - reaction + (feedRate * (1 - a));
                let nextB = b + (diffusionRateB * laplacianB) + reaction - ((killRate + feedRate) * b);
                nextGrid[x][y] = { a: Math.max(0, Math.min(1, nextA)), b: Math.max(0, Math.min(1, nextB)) };
            }
        }
        [grid, nextGrid] = [nextGrid, grid];
    }

    function drawGrid() {
        if (isDrawingPaused) return;

        // Draw to offscreen buffer first to prevent partial-draw flicker
        offCtx.fillStyle = 'black';
        offCtx.fillRect(0, 0, canvasWidth, canvasHeight);

        for (let x = 0; x < SIM_COLS; x++) {
            for (let y = 0; y < SIM_ROWS; y++) {
                const screenX = x * cellDrawWidth;
                const screenY = y * cellDrawHeight;

                if (!grid[x] || !grid[x][y]) continue;
                const bVal = grid[x][y].b;
                const baseGray = 20;
                const grayRange = 60;
                const grayLevel = Math.floor(baseGray + (bVal * grayRange));
                offCtx.fillStyle = `rgb(${grayLevel}, ${grayLevel}, ${grayLevel})`;
                offCtx.fillRect(screenX, screenY, cellDrawWidth, cellDrawHeight);
            }
        }

        // Single blit to visible canvas — no partial draws visible
        ctx.drawImage(offscreen, 0, 0);
    }
    
    let lastFrameTime = 0;
    const frameInterval = 50; 
    let simulationStepsPerFrame = 2;
    let isAnimating = false;
    let animationFrameId = null;

    function animate(currentTime) {
        isAnimating = true;
        animationFrameId = requestAnimationFrame(animate);
        if (isDrawingPaused) return;

        const elapsed = currentTime - lastFrameTime;
        if (elapsed > frameInterval) {
            lastFrameTime = currentTime - (elapsed % frameInterval);
            for(let i = 0; i < simulationStepsPerFrame; i++) updateGrid();
            frameCounter++;
            if (frameCounter >= perturbationInterval) {
                periodicPerturbation();
                frameCounter = 0;
            }
            drawGrid();
        }
    }
    
    function startAnimation(){
        if(!isAnimating && (!motionQuery || !motionQuery.matches)){
            console.log('RD Script: Starting animation (dynamic cell drawing v10)');
            isDrawingPaused = false;
            animate(performance.now());
        }
    }

    function stopAnimation(){
        if(animationFrameId){
            cancelAnimationFrame(animationFrameId);
            isAnimating = false;
            console.log('RD Script: Animation stopped.');
        }
    }

    function drawStaticPattern() {
        initializeGrid(); 
        for(let k=0; k < 100; k++) updateGrid(); 
        drawGrid();
        console.log("RD Script: Reduced motion preferred, static pattern shown.");
    }

    function handleResize() {
        isDrawingPaused = true;
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // Only reset canvas dimensions if they actually changed
        // (mobile browsers fire resize on scroll for address bar)
        if (canvas.width !== newWidth || canvas.height !== newHeight) {
            canvas.width = newWidth;
            canvas.height = newHeight;
            offscreen.width = newWidth;
            offscreen.height = newHeight;
        }
        canvasWidth = newWidth;
        canvasHeight = newHeight;
        cellDrawWidth = canvasWidth / SIM_COLS;
        cellDrawHeight = canvasHeight / SIM_ROWS;
        
        clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = setTimeout(() => {
            // Updated log
            console.log(`RD Script: Resize processed. Canvas: ${canvasWidth}x${canvasHeight}. Cell Draw: ${cellDrawWidth.toFixed(2)}x${cellDrawHeight.toFixed(2)}.`);
            isDrawingPaused = false;
            if (isAnimating) { // If it was running and paused by resize
                drawGrid(); // Redraw immediately
            } else if (motionQuery && !motionQuery.matches && !isAnimating) { 
                // If animation was not running but should be (e.g., it was paused by isDrawingPaused earlier and not animating before)
                startAnimation(); 
            } else if (motionQuery && motionQuery.matches) { // If reduced motion is on and it wasn't animating.
                drawStaticPattern(); 
            }
        }, DEBOUNCE_DELAY);
    }

    window.addEventListener('resize', handleResize);

    initializeGrid(); // Initialize the fixed-size simulation grid and initial dynamic cell sizes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery || !motionQuery.matches) {
        startAnimation();
    } else {
        drawStaticPattern();
    }
})();
