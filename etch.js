// Global variables remain the same
let currentGridSize = 16; 
const CONTAINER_SIZE = 960; 
const DARKEN_STEP = 0.1; // 10% darkening per interaction

// --- HELPER FUNCTION: Generates a random RGB color string ---
function getRandomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// --- CORE FUNCTION: Handles the color and darkening logic ---
function handleHover(square) {
    // 1. Initial interaction: Set the base color and darkness level
    if (!square.dataset.color) {
        // Set the random base color
        const randomColor = getRandomRgb();
        square.dataset.color = randomColor; 
        
        // Set the initial darkness level (0 for the first hit)
        square.dataset.darkness = 0;
        
        // Apply the color immediately (0% darkened, which is the base color)
        square.style.backgroundColor = randomColor;
        return; // Exit after first hit
    }

    // 2. Subsequent interactions: Progressive Darkening
    
    // Retrieve the current darkness level and base color
    let darkness = parseFloat(square.dataset.darkness);
    
    // Darken by 10% (0.1) unless it's already fully dark
    if (darkness < 1.0) {
        darkness += DARKEN_STEP;
    }

    // Apply the new darkness value
    square.dataset.darkness = darkness;

    // Apply the darkening effect using the CSS filter property
    // A brightness value of 1.0 means full brightness (0% dark).
    // A brightness value of 0.0 means completely black (100% dark).
    // Since 'darkness' is the *amount* darkened, brightness is (1 - darkness)
    square.style.filter = `brightness(${1.0 - darkness})`;
}

// --- GRID CREATION FUNCTION (Updated to use handleHover) ---
function createGrid(size) {
    const container = document.getElementById('grid-container');
    container.innerHTML = ''; 
    
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const totalSquares = size * size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        
        // **Crucial Change:** Attach the new handler function
        square.addEventListener('mouseover', function() {
            handleHover(square);
        });

        container.appendChild(square);
    }
    currentGridSize = size;
}


// --- BUTTON PROMPT FUNCTION (Remains the same as before) ---
function promptForGridSize() {
    let newSize = prompt('Enter the number of squares per side (max: 100):');
    newSize = parseInt(newSize);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Invalid input. Please enter a number between 1 and 100.');
        return; 
    }

    createGrid(newSize);
}

// Initial call to create the default 16x16 grid when the page loads
createGrid(currentGridSize);