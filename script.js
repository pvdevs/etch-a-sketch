const grid = document.querySelector('.grid');
const rangeValue = document.querySelector('.range-value');
const rangeInput = document.querySelector('#range');
const rainbowButton = document.querySelector('#rainbow');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');
const colorButton = document.querySelector('#color');
const colorPicker = document.querySelector('#color-picker');
const buttons = document.querySelectorAll('.btn')
const teste = document.querySelector('.test')

const pixelUni = document.querySelectorAll('.pixel')

let mouseDown = false;
let rangeClick = false;
let rainbow = false;
let eraser = false;
let color = true;

function fillButton (button) {
    buttons.forEach(e => {
        e.classList.remove('button-clicked')
    });
    button.classList.add('button-clicked')
}


colorButton.addEventListener('click', (e) => {
    color = true;
    rainbow = false;
    eraser = false;

    fillButton(colorButton);
})

rainbowButton.addEventListener('click', (e) => {
    rainbow = true;
    color = false;
    eraser = false;

    fillButton(rainbowButton);
})

eraserButton.addEventListener('click', (e) => {
    eraser = true;
    rainbow = false;
    color = false;

    fillButton(eraserButton);
})


clearButton.addEventListener('click', (e) => {
    grid.replaceChildren()
    setGrid(rangeInput.value);
    });


function getRainbow(pixel) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    pixel.setAttribute('style', `background-color: #${randomColor}`);
}



function setBrush(pixel) {
    if(rainbow) getRainbow(pixel);
    else if(eraser)  pixel.style.backgroundColor = '#FFF';
    else if (color)  pixel.style.backgroundColor = colorPicker.value;
}



function paintGrid(pixel) {
    // This event is used to prevent users from dragging the grid when painting, in some tests it led to undesired behavior
    pixel.addEventListener('dragstart', (event) => {
        event.preventDefault(); 
    });

    pixel.addEventListener('mousedown', () => {
        mouseDown = true;
        setBrush(pixel)
    });

    // This event is used to keep painting when users keep pressing the click while pass through different pixels
    pixel.addEventListener('mouseover', () => {
        if (mouseDown) {
            setBrush(pixel)
        }
    });

    document.addEventListener('mouseup', () => {
        mouseDown = false;
    });
}


function setGrid(num) {    

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

function setGridRange() {
    rangeValue.textContent = `${rangeInput.value} x ${rangeInput.value}`;

    rangeInput.addEventListener('input', (e) => {
        rangeValue.textContent = `${e.target.value} x ${e.target.value}`;

    })
    rangeInput.addEventListener('mouseup', () => {
        
        // This is used to reset the grid
        grid.replaceChildren();
        setGrid(rangeInput.value)
    });
    
    console.log(rangeInput.value); 
    return rangeInput.value;
}


setGrid(setGridRange());
