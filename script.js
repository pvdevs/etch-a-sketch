const container = document.querySelector('.container');
//const grid = document.querySelectorAll('.pixel');
//const row = document.querySelectorAll('.gridRow');


let mouseDown = false

function defineGrid(num) {    
    for(i = 0; i < num; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');
        gridRow.id = `gridRow-${i}`;
        container.appendChild(gridRow);
    }
    for (let i = 0; i < num; i++) {
        for(let i = 0; i < num; i++) {
            const pixel = document.createElement('div');
            const currentRow = document.getElementById(`gridRow-${i}`);

            pixel.classList.add('pixel');
            currentRow.appendChild(pixel);

            pixel.addEventListener('dragstart', (event) => {
                event.preventDefault(); // Prevent default drag behavior
            });

            pixel.addEventListener('mousedown', () => {
                mouseDown = true;
                pixel.classList.add('pixelFill');
            });

            pixel.addEventListener('mouseover', () => {
                if (mouseDown) {
                    pixel.classList.add('pixelFill');
                }
            });
    
        }        
    }


    document.addEventListener('mouseup', () => {
        mouseDown = false;
    });
}


defineGrid(16);
