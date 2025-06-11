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
    console.log('RD Script: Initialized with dynamism');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- Simulation Parameters ---
    const cellSize = 10; // Adjust for performance vs. detail
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);

    // Gray-Scott parameters (these are common starting points, but very sensitive)
    const diffusionRateA = 0.8;
    const diffusionRateB = 0.4;
    let baseFeedRate = 0.050; // Base feed rate
    let baseKillRate = 0.062; // Base kill rate
    let feedRate = baseFeedRate;
    let killRate = baseKillRate;

    // Dynamism Parameters
    let time = 0; // For oscillation
    const oscillationSpeed = 0.0005; // How fast parameters oscillate
    const oscillationAmplitude = 0.003; // How much parameters oscillate by
    let perturbationInterval = 300; // Perturb every X frames (e.g., 300 frames = ~5 seconds at 60fps draw)
    let frameCounter = 0;

    let grid = [];
    let nextGrid = [];

    function initializeGrid(isFullReset = true) {
        cols = Math.floor(width / cellSize);
        rows = Math.floor(height / cellSize);
        if (isFullReset) {
            grid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            // Add a small "seed" of chemical B to start the reaction
            seedGrid(Math.floor(cols / 2), Math.floor(rows / 2), 10, 0.9);
            console.log(`RD Script: Grid initialized ${cols}x${rows} with main seed.`);
        } else { // For resize, just recreate arrays but try to keep content (not implemented here, simple reset)
            grid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            nextGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => ({ a: 1, b: 0 })));
            seedGrid(Math.floor(cols / 2), Math.floor(rows / 2), 10, 0.9); // Re-seed on resize
        }
    }

    function seedGrid(centerX, centerY, seedSize, bValue) {
        for (let i = Math.max(0, centerX - seedSize); i < Math.min(cols, centerX + seedSize); i++) {
            for (let j = Math.max(0, centerY - seedSize); j < Math.min(rows, centerY + seedSize); j++) {
                if (grid[i] && grid[i][j]) { // Check if cell exists
                     grid[i][j].b = bValue + Math.random() * 0.1;
                }
            }
        }
    }
    
    function periodicPerturbation() {
        const numPerturbations = 3; // How many random spots to poke
        const perturbationSize = 5;  // How large each poke area is
        for (let p = 0; p < numPerturbations; p++) {
            const randX = Math.floor(Math.random() * cols);
            const randY = Math.floor(Math.random() * rows);
            seedGrid(randX, randY, perturbationSize, 0.5 + Math.random() * 0.4); // Add some B
        }
        // console.log("RD Script: Grid perturbed.");
    }

    function updateParameters() {
        time += oscillationSpeed;
        feedRate = baseFeedRate + Math.sin(time) * oscillationAmplitude;
        // You could also oscillate killRate, or diffusion rates, but start simple
        // killRate = baseKillRate + Math.cos(time * 0.7) * oscillationAmplitude * 0.5; 
    }

    function updateGrid() {
        updateParameters(); // Update parameters like feed/kill rate each simulation step

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
                        // Simplified Laplacian: sum direct neighbors, divide diagonals
                        if (i === 0 && j === 0) continue; // Skip self

                        let weight = (Math.abs(i) + Math.abs(j) === 1) ? 0.2 : 0.05; // Direct vs Diagonal
                        laplacianA += grid[col][row].a * weight;
                        laplacianB += grid[col][row].b * weight;
                    }
                }
                // Center weight for Laplacian (sum of weights for neighbors - 1 * center)
                // The weights sum to 1 (4*0.2 + 4*0.05 = 0.8 + 0.2 = 1)
                // So laplacian is (weighted sum of neighbors) - current_cell_value
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
        // Black background for the canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const bVal = grid[x][y].b;
                const baseGray = 20; // Darker base gray for better contrast with black
                const grayRange = 60; // Max brightness increase
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
        drawGrid(); // Draw the final state
        console.log("RD Script: Reduced motion preferred, static pattern shown.");
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initializeGrid(true); // Full reset on resize
        console.log('RD Script: Resized and re-initialized grid');
    });

    initializeGrid();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery || !motionQuery.matches) {
        console.log('RD Script: Starting animation with dynamism');
        animate(0);
    } else {
        drawStaticPattern();
    }
});
