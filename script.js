// Constants
const grid = document.querySelector('.grid');
const colorPicker = document.querySelector('#color-picker');
const buttons = document.querySelectorAll('.btn')
const colorButton = document.querySelector('#color');
const rainbowButton = document.querySelector('#rainbow');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');
const rangeValue = document.querySelector('.range-value');
const rangeInput = document.querySelector('#range');

// State variables
let mouseDown, rainbow, eraser = false;
let color = true;

// Utility Functions
function generateGrid(num) {    

    // This loop creates the rows
    for(i = 0; i < num; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');
        gridRow.id = `gridRow-${i}`;
        grid.appendChild(gridRow);
    }

    // This loop select the rows to fill
    for (let i = 0; i < num; i++) {

        // This loop fills the selected row with the right amount of pixels
        for(let i = 0; i < num; i++) {
            const pixel = document.createElement('div');
            const currentRow = document.getElementById(`gridRow-${i}`);

            pixel.classList.add('pixel');
            currentRow.appendChild(pixel);

            paintGrid(pixel);
        }        
    }
}

function paintGrid(pixel) {
    // This event is used to prevent users from dragging the grid when painting, in some tests it led to undesired behavior.
    pixel.addEventListener('dragstart', (e) => e.preventDefault()); 

    pixel.addEventListener('mousedown', () => {
        mouseDown = true;
        getBrush(pixel);
    });

    // This event is used to keep painting when users keep pressing the click while pass through different pixels.
    pixel.addEventListener('mouseover', () => { if(mouseDown) getBrush(pixel) } );

    document.addEventListener('mouseup', () => mouseDown = false);
}

function setGrid() {
    rangeValue.textContent = `${rangeInput.value} x ${rangeInput.value}`;

    rangeInput.addEventListener('input', (e) => rangeValue.textContent = `${e.target.value} x ${e.target.value}`);
    rangeInput.addEventListener('mouseup', () => resetGrid());
    return rangeInput.value;
}

function resetGrid() {
    grid.replaceChildren();
    generateGrid(rangeInput.value);
}

function getBrush(pixel) {
    if(color) pixel.style.backgroundColor = colorPicker.value;
    else if (eraser) pixel.style.backgroundColor = '#FFF'; 
    else if(rainbow) getRainbow(pixel);
}

function getRainbow(pixel) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    pixel.setAttribute('style', `background-color: #${randomColor}`);
}

function setClickedButton (button) {
    buttons.forEach(e => e.classList.remove('button-clicked'));
    button.classList.add('button-clicked');
}

// Event Listeners
colorButton.addEventListener('click', () => {
    color = true;
    rainbow = false;
    eraser = false;

    setClickedButton(colorButton);
})

rainbowButton.addEventListener('click', () => {
    rainbow = true;
    eraser = false;
    color = false;

    setClickedButton(rainbowButton);
})

eraserButton.addEventListener('click', () => {
    eraser = true;
    color = false;
    rainbow = false;  

    setClickedButton(eraserButton);
})

clearButton.addEventListener('click', () => resetGrid());

// Initialization
generateGrid(setGrid());