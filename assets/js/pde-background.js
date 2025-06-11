document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pde-background-canvas');
    if (!canvas) {
        console.error('RD Script: Canvas not found!');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('RD Script: Failed to get 2D context!');
        return;
    }
    console.log('RD Script: Initialized with dynamism and improved reset logic');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- Simulation Parameters ---
    const cellSize = 10;
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);
    let lastKnownCols = cols; // MODIFIED: Store initial column count

    const diffusionRateA = 0.8;
    const diffusionRateB = 0.4;
    let baseFeedRate = 0.050;
    let baseKillRate = 0.062;
    let feedRate = baseFeedRate;
    let killRate = baseKillRate;

    let time = 0;
    const oscillationSpeed = 0.0005;
    const oscillationAmplitude = 0.003;
    let perturbationInterval = 300;
    let frameCounter = 0;

    let grid = [];
    let nextGrid = [];

    function initializeGrid(isFullReset = true) {
        cols = Math.floor(width / cellSize); // Recalculate cols/rows based on current canvas size
        rows = Math.floor(height / cellSize);
        lastKnownCols = cols; // MODIFIED: Update lastKnownCols whenever grid is initialized

        if (isFullReset) {
            grid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));

            // MODIFIED: Add a few random seeds for B
            const numInitialSeeds = Math.floor(Math.random() * 3) + 1; // 1 to 3 initial seeds
            const initialSeedSize = 10;
            console.log(`RD Script: Grid initialized ${cols}x${rows}. Seeding with ${numInitialSeeds} random seed(s).`);
            for (let s = 0; s < numInitialSeeds; s++) {
                // Ensure seeds are not too close to the edge
                const seedX = Math.floor(Math.random() * (cols - initialSeedSize * 2)) + initialSeedSize;
                const seedY = Math.floor(Math.random() * (rows - initialSeedSize * 2)) + initialSeedSize;
                seedGrid(seedX, seedY, initialSeedSize, 0.7 + Math.random() * 0.2); // Strong B value
            }
        } else {
            // This branch might be used if we wanted a less disruptive re-init for minor changes,
            // but current resize logic aims for full re-init only on significant width change.
            // For now, it also does a full random seed.
            grid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            const seedX = Math.floor(Math.random() * (cols - 20)) + 10;
            const seedY = Math.floor(Math.random() * (rows - 20)) + 10;
            seedGrid(seedX, seedY, 10, 0.9);
            console.log(`RD Script: Grid re-initialized (non-full-reset path) ${cols}x${rows} with one random seed.`);
        }
    }

    function seedGrid(centerX, centerY, seedSize, bValue) {
        for (let i = Math.max(0, centerX - seedSize); i < Math.min(cols, centerX + seedSize); i++) {
            for (let j = Math.max(0, centerY - seedSize); j < Math.min(rows, centerY + seedSize); j++) {
                if (grid[i] && grid[i][j]) {
                     grid[i][j].b = bValue + Math.random() * 0.1;
                }
            }
        }
    }
    
    function periodicPerturbation() {
        const numPerturbations = Math.floor(Math.random() * 2) + 1; // 1 or 2 pokes
        const perturbationSize = Math.floor(Math.random() * 3) + 3; // Size 3 to 5
        for (let p = 0; p < numPerturbations; p++) {
            const randX = Math.floor(Math.random() * cols);
            const randY = Math.floor(Math.random() * rows);
            seedGrid(randX, randY, perturbationSize, 0.4 + Math.random() * 0.3); // Less intense poke
        }
    }

    function updateParameters() {
        time += oscillationSpeed;
        feedRate = baseFeedRate + Math.sin(time) * oscillationAmplitude;
    }

    function updateGrid() {
        updateParameters(); 

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const a = grid[x][y].a;
                const b = grid[x][y].b;
                let laplacianA = 0;
                let laplacianB = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const col = (x + i + cols) % cols;
                        const row = (y + j + rows) % rows;
                        if (i === 0 && j === 0) continue;
                        let weight = (Math.abs(i) + Math.abs(j) === 1) ? 0.2 : 0.05;
                        laplacianA += grid[col][row].a * weight;
                        laplacianB += grid[col][row].b * weight;
                    }
                }
                laplacianA -= a;
                laplacianB -= b;
                const reaction = a * b * b;
                let nextA = a + (diffusionRateA * laplacianA) - reaction + (feedRate * (1 - a));
                let nextB = b + (diffusionRateB * laplacianB) + reaction - ((killRate + feedRate) * b);
                nextGrid[x][y].a = Math.max(0, Math.min(1, nextA));
                nextGrid[x][y].b = Math.max(0, Math.min(1, nextB));
            }
        }
        [grid, nextGrid] = [nextGrid, grid];
    }

    function drawGrid() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const bVal = grid[x][y].b;
                const baseGray = 20; 
                const grayRange = 60; 
                const grayLevel = Math.floor(baseGray + (bVal * grayRange));
                ctx.fillStyle = `rgb(${grayLevel}, ${grayLevel}, ${grayLevel})`;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    
    let lastFrameTime = 0;
    const frameInterval = 50; 
    let simulationStepsPerFrame = 2;

    function animate(currentTime) {
        requestAnimationFrame(animate);
        const elapsed = currentTime - lastFrameTime;
        if (elapsed > frameInterval) {
            lastFrameTime = currentTime - (elapsed % frameInterval);
            for(let i = 0; i < simulationStepsPerFrame; i++) {
                 updateGrid();
            }
            frameCounter++;
            if (frameCounter >= perturbationInterval) {
                periodicPerturbation();
                frameCounter = 0;
            }
            drawGrid();
        }
    }
    
    function drawStaticPattern() {
        initializeGrid();
        for(let k=0; k < 100; k++) updateGrid(); 
        drawGrid();
        console.log("RD Script: Reduced motion preferred, static pattern shown.");
    }

    // MODIFIED: Resize event listener
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        let newCols = Math.floor(width / cellSize);
        // let newRows = Math.floor(height / cellSize); // rows is updated in initializeGrid or directly

        if (newCols !== lastKnownCols) {
            console.log('RD Script: Major resize detected (column count changed), re-initializing grid.');
            initializeGrid(true); // Full reset if width change impacts column count
            // cols and rows are updated within initializeGrid
        } else {
            // If only height changed, or minor width change not affecting cols,
            // the simulation continues. Canvas dimensions are updated.
            // We just need to make sure 'rows' is up-to-date for drawing and simulation logic if it uses it.
            rows = Math.floor(height / cellSize);
            console.log('RD Script: Minor resize, canvas dimensions updated, simulation continues.');
        }
    });

    initializeGrid();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery || !motionQuery.matches) {
        console.log('RD Script: Starting animation with dynamism and improved reset logic');
        animate(0);
    } else {
        drawStaticPattern();
    }
});
