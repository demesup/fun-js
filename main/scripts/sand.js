function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

let grid;
let w = 4;
let cols, rows;
let hueValue = 600;
let gravityDirection = 'down';

function withinCols(i) {
    return i >= 0 && i <= cols - 1;
}

function withinRows(j) {
    return j >= 0 && j <= rows - 1;
}

function setup() {
    createCanvas(500, 300);
    colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
    document.getElementById('changeGravity').addEventListener('click', changeGravity);
}


function changeGravity() {
    if (gravityDirection === 'down') {
        gravityDirection = 'right';
    } else if (gravityDirection === 'right') {
        gravityDirection = 'up';
    } else if (gravityDirection === 'up') {
        gravityDirection = 'left';
    } else {
        gravityDirection = 'down';
    }
}


function mouseDragged() {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = 5;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            if (random(1) < 0.75) {
                let col = mouseCol + i;
                let row = mouseRow + j;
                if (withinCols(col) && withinRows(row)) {
                    grid[col][row] = hueValue;
                }
            }
        }
    }
    hueValue += 1;
    if (hueValue > 360) {
        hueValue = 1;
    }
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] > 0) {
                fill(grid[i][j], 255, 255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    let nextGrid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];

            if (state > 0) {
                if (gravityDirection === 'down') {
                    let below = grid[i][j + 1];

                    let dir = 1;
                    if (random(1) < 0.5) {
                        dir *= -1;
                    }

                    let belowA = -1;
                    let belowB = -1;
                    if (withinCols(i + dir)) {
                        belowA = grid[i + dir][j + 1];
                    }
                    if (withinCols(i - dir)) {
                        belowB = grid[i - dir][j + 1];
                    }


                    if (below === 0) {
                        nextGrid[i][j + 1] = state;
                    } else if (belowA === 0) {
                        nextGrid[i + dir][j + 1] = state;
                    } else if (belowB === 0) {
                        nextGrid[i - dir][j + 1] = state;
                    } else {
                        nextGrid[i][j] = state;
                    }
                } else if (gravityDirection === 'right') {
                    if (i + 1 < cols) {
                        let below = grid[i + 1][j];

                        let dir = 1;
                        if (random(1) < 0.5) {
                            dir *= -1;
                        }

                        let belowA = -1;
                        let belowB = -1;
                        if (withinCols(j + dir)) {
                            belowA = grid[i + 1][j + dir];
                        }
                        if (withinCols(j - dir)) {
                            belowB = grid[i + 1][j - dir];
                        }


                        if (below === 0) {
                            nextGrid[i + 1][j] = state;
                        } else if (belowA === 0) {
                            nextGrid[i + 1][j + dir] = state;
                        } else if (belowB === 0) {
                            nextGrid[i + 1][j - dir] = state;
                        } else {
                            nextGrid[i][j] = state;
                        }
                    } else {
                        nextGrid[i][j] = state;
                    }

                } else if (gravityDirection === 'up') {
                    if (j > 0) {
                        let below = grid[i][j - 1];

                    let dir = 1;
                    if (random(1) < 0.5) {
                        dir *= -1;
                    }

                    let belowA = -1;
                    let belowB = -1;
                    if (withinCols(i + dir)) {
                        belowA = grid[i + dir][j - 1];
                    }
                    if (withinCols(i - dir)) {
                        belowB = grid[i - dir][j - 1];
                    }


                    if (below === 0) {
                        nextGrid[i][j - 1] = state;
                    } else if (belowA === 0) {
                        nextGrid[i + dir][j - 1] = state;
                    } else if (belowB === 0) {
                        nextGrid[i - dir][j - 1] = state;
                    } else {
                        nextGrid[i][j] = state;
                    }
                    } else {
                        nextGrid[i][j] = state;
                    }

                } else {
                    if (i > 0) {
                        let below = grid[i - 1][j];

                        let dir = 1;
                        if (random(1) < 0.5) {
                            dir *= -1;
                        }

                        let belowA = -1;
                        let belowB = -1;
                        if (withinCols(j + dir)) {
                            belowA = grid[i - 1][j + dir];
                        }
                        if (withinCols(j - dir)) {
                            belowB = grid[i - 1][j - dir];
                        }


                        if (below === 0) {
                            nextGrid[i - 1][j] = state;
                        } else if (belowA === 0) {
                            nextGrid[i - 1][j + dir] = state;
                        } else if (belowB === 0) {
                            nextGrid[i - 1][j - dir] = state;
                        } else {
                            nextGrid[i][j] = state;
                        }
                    } else {
                        nextGrid[i][j] = state;
                    }

                }
            }
        }
    }
    grid = nextGrid;
}