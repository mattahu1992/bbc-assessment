var rows = 500;
var cols = 500;
var grid = createArray(rows);
var newGrid = createArray(cols);
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#093993";

fillRandom(); //fills grid with random cells
loop(); //loops through iterations of game

function loop() { //loops the new grid. keeps the game evolving
    console.time("loop");
    createGrid();
    updateGrid();
    console.timeEnd("loop");
    requestAnimationFrame(loop);
}

function createArray(rows) { //creates a 2 dimensional array of rows
    let arr = [];
    for ( i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function createGrid() { //draw the contents of the grid onto a canvas
    ctx.clearRect(0, 0, rows, cols); //clears grid of old cell values
    for (var i = 1; i < rows; i++) {
        for (var j = 1; j < cols; j++) {
            if (grid[i][j] === 1) {
                ctx.fillRect(i, j, 1, 1); //fills grid with new value

            }
        }
    }
}

function fillRandom() { //fills the cells in the grid randomly
    for (var i = 0; i < rows; i++) { //iterate through rows
        for (var j = 0; j < cols; j++) { //iterate through columns
            grid[i][j] = Math.round(Math.random());
        }
    }
}

function updateGrid() { //perform one iteration of grid update

    for (var i = 1; i < rows - 1; i++) { //iterate through rows
        for (var j = 1; j < cols - 1; j++) { //iterate through columns
            var neighbourCells = 0;
            //calculate total number of live neighbouring cells
            neighbourCells += grid[i - 1][j - 1]; //top left
            neighbourCells += grid[i - 1][j]; //top center
            neighbourCells += grid[i - 1][j + 1]; //top right
            neighbourCells += grid[i][j - 1]; //middle left
            neighbourCells += grid[i][j + 1]; //middle right
            neighbourCells += grid[i + 1][j - 1]; //bottom left
            neighbourCells += grid[i + 1][j]; //bottom center
            neighbourCells += grid[i + 1][j + 1]; //bottom right

            if(grid[i][j]== 0){ //finds dead cells
              switch(neighbourCells){
                case 3: // cell has 3 neighbours
                newGrid[i][j] = 1; //cell becomes alive Scenario 4: Creation of life
                default:
                newGrid[i][j] = 0; //cell remains dead Scenario 0: No Interactions
              }
            }else{ //finds alive cells
              switch(neighbourCells){
                case 0:
                case 1:
                  newGrid[i][j] = 0; //cell dies Scenario 1: Underpopulatiom
                  break;
                case 2:
                case 3:
                  newGrid[i][j] = 1; //cell remains alive Scenario 3: Survival
                  break;
                default:
                  newGrid[i][j] = 0; // Scenario 2: Overcrowding
            }
          }
        }
      }
    }
    //iteration of grid between the old and new state
    var temp = grid;
    grid = newGrid;
    newGrid = temp;
}
