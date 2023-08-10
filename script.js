const container = document.querySelector('.container');


function defineGrid(num) {    
    for(i = 0; i < num; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');
        gridRow.id = `gridRow-${i}`;

        container.appendChild(gridRow);
    }

    for (let i = 0; i < num; i++) {
        for(let i = 0; i < num; i++) {
            const gridUnity = document.createElement('div');
            const currentRow = document.getElementById(`gridRow-${i}`);
            
            gridUnity.classList.add('gridUnity');
            currentRow.appendChild(gridUnity);
            
            gridUnity.addEventListener('click', () => {
                gridUnity.classList.add('gridFill');
            })           
        }
    }
    

}

defineGrid(prompt());
//console.log(grid);