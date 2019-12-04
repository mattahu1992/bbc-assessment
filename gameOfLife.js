var rows = 500;
var cols = 500;
var grid = createArray(rows);
var newGrid = createArray(cols);
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#093993";

fillRandom(); //fills grid with cells with random values
loop(); //calls main loop

function loop() { //main loop
    console.time("loop");
    createGrid();
    updateGrid();
    console.timeEnd("loop");
    requestAnimationFrame(loop);
}

function createArray(rows) { //creates 2 dimensional array of required rows
    let arr = [];
    for ( i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function createGrid() { //draws the contents of the grid onto the canvas
    ctx.clearRect(0, 0, rows, cols); //used to clear the grid after every update
    for (var i = 1; i < rows; i++) { //iterate through rows
        for (var j = 1; j < cols; j++) { //iterate through columns
            if (grid[i][j] === 1) {
                ctx.fillRect(i, j, 1, 1);

            }
        }
    }
}

function fillRandom() { //fill the grid randomly with cells in different states
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
}

function updateGrid() { //one iteration of the updated grid

    for (var i = 1; i < rows - 1; i++) {
        for (var j = 1; j < cols - 1; j++) {
            var neighbourCells = 0;
            //calculate total number of neighbouring cells. diagram in additional documentation
            neighbourCells += grid[i - 1][j - 1]; //left up
            neighbourCells += grid[i - 1][j]; //up
            neighbourCells += grid[i - 1][j + 1]; //right up
            neighbourCells += grid[i][j - 1]; //left
            neighbourCells += grid[i][j + 1]; //right
            neighbourCells += grid[i + 1][j - 1]; //left down
            neighbourCells += grid[i + 1][j]; //down
            neighbourCells += grid[i + 1][j + 1]; //right down

            //apply the rules to each cell
            if (grid[i][j] === 0) { // apply rules to dead cells
                switch (neighbourCells) {
                    case 3:
                        newGrid[i][j] = 1; //Scenario 4: Creation of Life cell has >3 neighbours becomes alive
                        break;
                    default:
                        newGrid[i][j] = 0; //Scenario 0: No interanctions cell remains dead
                }
            } else if (grid[i][j] === 1) { //apply rules to living cell
                switch (neighbourCells) {
                    case 0:
                    case 1:
                        newGrid[i][j] = 0; //Scenario 1: Underpopulation cell has <2 neighbours cell dies

                        break;
                    case 2:
                    case 3:
                        newGrid[i][j] = 1; //Scenario 3: Survival cell has 2 or 3 neighbours remains alive
                        break;
                    default:
                        newGrid[i][j] = 0; // Scenario 2: Overcrowding cell has >3 nieghbours cell dies

                }

            }
        }
    }

    //swap grid for next iteration
    var temp = grid;
    grid = newGrid;
    newGrid = temp;
}
