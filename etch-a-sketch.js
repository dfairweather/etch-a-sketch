const container = document.querySelector('#container');
let gridSize = 25;
let squareColor = "black"
let isDrawing = false;
let isCrazy = false;
let containerHeight = container.clientHeight;
let containerWidth = container.clientWidth;

function crazyColor() {
    let r = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${b}, ${g})`;
}

const colorbtn = document.querySelectorAll('input[name="colors"]');
colorbtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id == "crazy") {
            isCrazy = true;
        } else {
            squareColor = btn.id;
            isCrazy = false;
        }
    });   
});


function drawn(e) {
    if (isDrawing === true && isCrazy === false) {
        e.target.setAttribute('style', `background: ${squareColor}`);
    } else if (isDrawing === true && isCrazy === true) {
       
        e.target.setAttribute('style', `background: ${crazyColor()}`);
    };
    
};

function clearSquares() {
    const squares = document.querySelectorAll('#square');
    gridSize = prompt('How many squares would you like to make per side?');
    squares.forEach((square) => {
        square.classList.remove('drawn');
        container.removeChild(square);
    });
  
    createSquares(gridSize);
};

container.addEventListener('mousedown', () => {
    isDrawing = true;
    console.log(isDrawing);
});

container.addEventListener('mouseup', () => {
    isDrawing = false;
    console.log(isDrawing);
});

function createSquares(gridSize) {
    container.style.gridTemplateRows = `repeat(${gridSize}, ${containerHeight/gridSize}px)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, ${containerWidth/gridSize}px)`;
    for (i=0; i<gridSize; i++) {
    for (j=0; j<gridSize; j++) {
        let col = i + 1;
        let colEnd = col + 1;
        let row = j + 1;
        let rowEnd = row + 1;
        const square = document.createElement('div');
        square.setAttribute('id', 'square');
        square.setAttribute('style', 'background: white');
        square.style.gridColumn = col / colEnd;
        square.style.gridRow = row / rowEnd;
        square.addEventListener('mouseover', drawn);
        
        container.appendChild(square);
    };
};
};

createSquares(gridSize);

const clearBtn = document.querySelector('#clearbutton');
clearBtn.addEventListener('click', clearSquares);
