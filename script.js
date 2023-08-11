const container = document.querySelector('.container');
const rangeValue = document.querySelector('.range-value');
const rangeInput = document.querySelector('#range');

let mouseDown = false;
let rangeClick = false;

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
            pixel.classList.add('pixelFill');
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
        container.replaceChildren();
        setGrid(rangeInput.value)
    });
    
    console.log(rangeInput.value);
    return rangeInput.value;
}


setGrid(setGridRange());
