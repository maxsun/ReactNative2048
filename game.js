function getRow(arr2d, y) {
    return arr2d[y].map(x=>x); //map in order to clone arr
}
  
function getCol(arr2d, x) {
    var col = [];
    for (var y = 0; y < arr2d.length; y++) {
        col.push(arr2d[y][x]);
    }
    return col;
}

function colsToGrid(cols) {
    var newGrid = [];
    for (var y = 0; y < cols[0].length; y++) {
        var row = [];
        for (var x = 0; x < cols.length; x++) {
            row.push(cols[x][y]);
        }
        newGrid.push(row);
    }
    return newGrid;
}

generateGrid = (xSize, ySize) => {
    var grid = []
    var counter = 0;
    for (var y = 0; y < ySize; y++) {
        row = []
        for (var x = 0; x < xSize; x++) {
            row.push(0)
            counter++;
        }
        grid.push(row);
    }
    return grid;
}
  
populateGrid = (arr) => {
    choices = [2, 4]
    coordOptions = [];
    for (var y = 0; y < arr.length; y++) {
        for (var x = 0; x < arr[0].length; x++) {
            if (arr[y][x] == 0) {
                coordOptions.push([x, y]);
            }
        }
    }
    var coord = coordOptions[Math.floor(Math.random() * coordOptions.length)];
    var newVal = choices[Math.floor(Math.random() * choices.length)];
    arr[coord[1]][coord[0]] = newVal;
    return arr;
}

swipeRight = (grid) => {
    var changes = [];
    var newGrid = [];
    for (var y = 0; y < grid.length; y++) {
        var row = getRow(grid, y);
        for (var x = row.length - 1; x >= 0; x--) {
            if (row[x] == 0) {
                for (var x2 = x - 1; x2 >= 0; x2--) {
                    if (row[x2] != 0) {
                        row[x] = row[x2];
                        row[x2] = 0;
                        changes.push({
                            oldX: x2,
                            oldY: y,
                            newX: x,
                            newY: y,
                            oldVal: row[x],
                            newVal: row[x]
                        });
                        break;
                    }
                }
            }
            for (var x2 = x - 1; x2 >= 0; x2--) {
                if (row[x2] == row[x] && row[x] != 0) {
                    row[x] += row[x2];
                    row[x2] = 0;
                    changes.push({
                        oldX: x2,
                        oldY: y,
                        newX: x,
                        newY: y,
                        oldVal: row[x] / 2,
                        newVal: row[x]
                    });
                    break;
                } else if (row[x2] != 0 && row[x2] != row[x]) {
                    break;
                }
            }
        }
        newGrid.push(row);
    }
    return {grid: newGrid, changes: changes};
}

swipeLeft = (grid) => {
    var newGrid = [];
    var changes = [];
    for (var y = 0; y < grid.length; y++) {
        var row = getRow(grid, y);
        for (var x = 0; x < row.length; x++) {
            if (row[x] == 0) {
                for (var x2 = x; x2 < row.length; x2++) {
                    if (row[x2] != 0) {
                        row[x] = row[x2];
                        row[x2] = 0;
                        changes.push({
                            oldX: x2,
                            oldY: y,
                            newX: x,
                            newY: y,
                            oldVal: row[x],
                            newVal: row[x]
                        });
                        break;
                    }
                }
            } 
            for (var x2 = x + 1; x2 < row.length; x2++) {
                if (row[x2] == row[x] && row[x2] != 0) {
                    row[x] += row[x2];
                    row[x2] = 0;
                    changes.push({
                        oldX: x2,
                        oldY: y,
                        newX: x,
                        newY: y,
                        oldVal: row[x] / 2,
                        newVal: row[x]
                    });
                    break;
                } else if (row[x2] != 0 && row[x2] != row[x]) {
                    break;
                }
            }
            
        }
        newGrid.push(row);
    }
    return {grid: newGrid, changes: changes}
}

swipeUp = (grid) => {
    var newGrid = [];
    var cols = [];
    var changes = [];
    for (var x = 0; x < grid[0].length; x++) {
        var col = getCol(grid, x);
        for (var y = 0; y < col.length; y++) {
            if (col[y] == 0) {
                for (var y2 = y; y2 < col.length; y2++) {
                    if (col[y2] != 0) {
                        col[y] = col[y2];
                        col[y2] = 0;
                        changes.push({
                            oldX: x,
                            oldY: y2,
                            newX: x,
                            newY: y,
                            oldVal: col[y],
                            newVal: col[y2]
                        });
                        break;
                    }
                }
            }
            for (var y2 = y + 1; y2 < col.length; y2++) {
                if (col[y2] == col[y] && col[y2] != 0) {
                    col[y] += col[y2];
                    col[y2] = 0;
                    changes.push({
                        oldX: x,
                        oldY: y2,
                        newX: x,
                        newY: y,
                        oldVal: col[y],
                        newVal: col[y2]
                    });
                    break;
                } else if (col[y2] != 0 && col[y2] != col[y]) {
                    break;
                }
            }
            
        }
        cols.push(col);
    }
    return {grid: colsToGrid(cols), changes: changes};
}

swipeDown = (grid) => {
    var newGrid = [];
    var cols = [];
    var changes = [];
    for (var x = 0; x < grid[0].length; x++) {
        var col = getCol(grid, x);
        for (var y = col.length - 1; y >= 0; y--) {
            if (col[y] == 0) {
                for (var y2 = y - 1; y2 >= 0; y2--) {
                    if (col[y2] != 0) {
                        col[y] = col[y2];
                        col[y2] = 0;
                        changes.push({
                            oldX: x,
                            oldY: y2,
                            newX: x,
                            newY: y,
                            oldVal: col[y],
                            newVal: col[y2]
                        });
                        break;
                    }
                }
            }
            for (var y2 = y - 1; y2 >= 0; y2--) {
                if (col[y2] == col[y] && col[y2] != 0) {
                    col[y] += col[y2];
                    col[y2] = 0;
                    changes.push({
                        oldX: x,
                        oldY: y2,
                        newX: x,
                        newY: y,
                        oldVal: col[y],
                        newVal: col[y2]
                    });
                    break;
                } else if (col[y2] != 0 && col[y2] != col[y]) {
                    break;
                }
            }
            
        }
        cols.push(col);
    }
    return {grid: colsToGrid(cols), changes: changes};
}

makeTestGrid = () => {
    return [
        [2, 2, 4, 8],
        [2, 0, 0, 4],
        [4, 0, 0, 2],
        [8, 4, 2, 2]
    ];
}