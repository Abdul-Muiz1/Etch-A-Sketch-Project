// The current grid size (squares per side)
let currentGridSize = 16; 
const CONTAINER_SIZE = 960; // Total width/height in pixels

// Function to create the dynamic grid
function createGrid(size) {
    const container = document.getElementById('grid-container');
    
    // 1. Clear any existing grid squares
    container.innerHTML = ''; 
    
    // 2. Dynamically set the grid template based on the user's size
    // Example: if size is 64, it sets 64 columns and 64 rows, 
    // each taking up 1 fractional unit (1fr) of the 960px space.
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Calculate the total number of squares (e.g., 16*16=256 or 64*64=4096)
    const totalSquares = size * size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');

        // Add the hover effect to change the color
        square.addEventListener('mouseover', function() {
            // Change the background color directly for the 'pen' effect
            square.style.backgroundColor = 'black'; 
        });

        container.appendChild(square);
    }
    // Update the global size tracker
    currentGridSize = size;
}


// New function called when the "Change Grid Size" button is clicked
function promptForGridSize() {
    // 1. Use the prompt() function to get user input
    let newSize = prompt('Enter the number of squares per side (max: 100):');
    
    // 2. Convert the input to an integer
    newSize = parseInt(newSize);

    // 3. Input Validation (The "Tip" Requirement)
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Invalid input. Please enter a number between 1 and 100.');
        return; // Exit the function if validation fails
    }

    // 4. If input is valid, destroy the old grid and create the new one
    createGrid(newSize);
}

// Initial call to create the default 16x16 grid when the page loads
createGrid(currentGridSize);