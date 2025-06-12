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
    console.log('RD Script: Initialized with dynamism and improved reset logic v3');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const cellSize = 10;
    let cols, rows;
    let lastInitializedCols, lastInitializedRows; // Store dimensions grid was last built with

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

    function initializeGrid() {
        cols = Math.floor(width / cellSize);
        rows = Math.floor(height / cellSize);
        
        lastInitializedCols = cols;
        lastInitializedRows = rows;

        grid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
        nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));

        const numInitialSeeds = Math.floor(Math.random() * 3) + 1;
        const initialSeedSize = 10;
        console.log(`RD Script: Grid initialized ${cols}x${rows}. Seeding with ${numInitialSeeds} random seed(s).`);
        for (let s = 0; s < numInitialSeeds; s++) {
            const seedX = Math.floor(Math.random() * Math.max(1, cols - initialSeedSize * 2)) + Math.min(initialSeedSize -1 , Math.max(0,cols-initialSeedSize-1));
            const seedY = Math.floor(Math.random() * Math.max(1, rows - initialSeedSize * 2)) + Math.min(initialSeedSize-1, Math.max(0,rows-initialSeedSize-1));
            seedGrid(seedX, seedY, initialSeedSize, 0.7 + Math.random() * 0.2);
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
        const numPerturbations = Math.floor(Math.random() * 2) + 1;
        const perturbationSize = Math.floor(Math.random() * 3) + 3;
        for (let p = 0; p < numPerturbations; p++) {
            const randX = Math.floor(Math.random() * cols);
            const randY = Math.floor(Math.random() * rows);
            seedGrid(randX, randY, perturbationSize, 0.4 + Math.random() * 0.3);
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
                if (!grid[x] || !grid[x][y]) {
                    // This should not happen if initializeGrid is correct
                    console.warn(`RD Script: Accessing undefined grid cell grid[${x}][${y}] in updateGrid.`);
                    continue; 
                }
                const a = grid[x][y].a;
                const b = grid[x][y].b;
                
                let laplacianA = 0;
                let laplacianB = 0;

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const col = (x + i + cols) % cols;
                        const row = (y + j + rows) % rows;
                        if (i === 0 && j === 0) continue;
                        
                        if (!grid[col] || !grid[col][row]) {
                             console.warn(`RD Script: Accessing undefined NEIGHBOR grid[${col}][${row}] for center ${x},${y}`);
                             continue;
                        }
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

                if (!nextGrid[x]) {
                     console.warn(`RD Script: nextGrid[${x}] is undefined. Cannot set cell ${x},${y}.`);
                     continue;
                }
                nextGrid[x][y] = {
                    a: Math.max(0, Math.min(1, nextA)),
                    b: Math.max(0, Math.min(1, nextB))
                };
            }
        }
        [grid, nextGrid] = [nextGrid, grid];
    }

    function drawGrid() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                 if (!grid[x] || !grid[x][y]) {
                    // console.warn(`RD Script: Attempting to draw undefined grid cell at ${x},${y}`);
                    continue; 
                }
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

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        let newCalculatedCols = Math.floor(width / cellSize);
        let newCalculatedRows = Math.floor(height / cellSize);

        if (newCalculatedCols !== lastInitializedCols || newCalculatedRows !== lastInitializedRows) {
            console.log(`RD Script: Resize requires grid re-initialization. Old: ${lastInitializedCols}x${lastInitializedRows}, New: ${newCalculatedCols}x${newCalculatedRows}.`);
            initializeGrid(); 
        } else {
            // console.log('RD Script: Resize detected, but grid dimensions remain the same. Simulation continues.');
        }
    });

    initializeGrid();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery || !motionQuery.matches) {
        console.log('RD Script: Starting animation with dynamism and improved reset logic v3');
        animate(0);
    } else {
        drawStaticPattern();
    }
});
