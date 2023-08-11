const container = document.querySelector('.container');
const rangeValue = document.querySelector('.range-value');
const rangeInput = document.querySelector('#range');
const rainbowButton = document.querySelector('#rainbow');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');

let mouseDown = false;
let rangeClick = false;
let rainbow = false;
let eraser = false;

rainbowButton.addEventListener('click', (e) => {
    rainbow = true;
    eraser = false;
})

eraserButton.addEventListener('click', (e) => {
    eraser = true;
    rainbow = false;
})

// Not working right
clearButton.addEventListener('click', (e) => {
    container.replaceChildren();
})


function getRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}


function getRainbow(pixel, cb) {
    pixel.setAttribute('style', `background-color: #${cb}`);
}


function getErased(pixel) {
   pixel.style.backgroundColor = '#FFF';
}




function paintGrid(pixel) {
    // This event is used to prevent users from dragging the grid when painting, in some tests it led to undesired behavior
    pixel.addEventListener('dragstart', (event) => {
        event.preventDefault(); 
    });

    pixel.addEventListener('mousedown', () => {
        mouseDown = true;
        pixel.classList.add('pixelFill');
    });

    // This event is used to keep painting when users keep pressing the click while pass through different pixels
    pixel.addEventListener('mouseover', () => {
        if (mouseDown) {
            if(rainbow) getRainbow(pixel, getRandomColor());
            else if(eraser) getErased(pixel);
            pixel.classList.add('pixelFill');
            // pixel.setAttribute('style', `background-color: #${getRandomColor()}`) rainbow
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
        container.appendChild(gridRow);
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
        
        // This is used to reset the container
        container.replaceChildren();
        setGrid(rangeInput.value)
    });
    
    console.log(rangeInput.value); 
    return rangeInput.value;
}


setGrid(setGridRange());
