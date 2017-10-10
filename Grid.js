import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Square from './Square';

import './game'

function testArr2dEquality(a1, a2) {
    for (var y = 0; y < a1.length; y++) {
        for (var x = 0; x < a1[y].length; x++) {
            if (a1[y][x] !== a2[y][x]) {
                return false;
            }
        }
    }
    return true;
}

export default class Grid extends Component {
    
    constructor(props) {
        super();
        this.width = props.width;
        this.height = props.height;
        this.borderWidth = this.width * (377 / 10000);
        this.rows = props.rows;
        this.cols = props.cols;
        this.squareHeight = this.height / this.rows;
        this.squareWidth = this.width / this.cols;
        this.x = props.x;
        this.y = props.y;
        this.state = {
            grid: props.grid,
            oldGrid: props.grid,
            changes: []
        };
        this.clicked = false;
        this.cardCounter = 0;
    }

    pressed = (e) => {
        var x = e.nativeEvent.locationX;
        var y = e.nativeEvent.locationY;
        this.swipeStartX = x;
        this.swipeStartY = y;
        this.clicked = true;
    }

    released = (e) => {
        var x = e.nativeEvent.locationX;
        var y = e.nativeEvent.locationY;
        var x_diff = x - this.swipeStartX;
        var y_diff = y - this.swipeStartY;
        if (Math.abs(y_diff) > 10 || Math.abs(x_diff) > 10) {
            var result = [];
            if (Math.abs(y_diff) > Math.abs(x_diff)) {
                if (y_diff > 0) {
                    result = swipeDown(this.state.grid);
                } else {
                    result = swipeUp(this.state.grid);
                }
            } else {
                if (x_diff > 0) {
                    result = swipeRight(this.state.grid);
                } else {
                    result = swipeLeft(this.state.grid);
                }
            }
            if (result.changes.length != 0) {
                this.setState({
                    oldGrid: this.state.grid,
                    grid: populateGrid(result.grid),
                    changes: result.changes
                });
            }
            
        }
        this.clicked = false;
    }

    makeCards = (oldGrid, newGrid, changes) => {
        var squares = [];
        var id = 0;
        var changeSquares = [];
        var newCoords = {};

        var w = (this.squareWidth - this.borderWidth * 5/4);
        var h = (this.squareHeight - this.borderWidth * 5/4);

        for (var i = 0; i < changes.length; i++) {
            var c = changes[i];
            newCoord = {
                x: c.newX * (this.squareWidth - this.borderWidth / 4),
                y: c.newY * (this.squareHeight - this.borderWidth / 4)
            };
            oldCoord = {
                x: c.oldX * (this.squareWidth - this.borderWidth / 4),
                y: c.oldY * (this.squareHeight - this.borderWidth / 4)
            };
            newCoords[[c.newX, c.newY]] = 1;
            console.log(c);
            changeSquares.push(
                <Square val={c.oldVal} tval={c.newVal} key={this.cardCounter} x={oldCoord.x} y={oldCoord.y} tx={newCoord.x} ty={newCoord.y} width={w} height={h}>
                </Square>
            );
            this.cardCounter++;
        }

        for (var y = 0; y < newGrid.length; y++) {
            for (var x = 0; x < newGrid[y].length; x++) {
            
            var coord = {
                x: x * (this.squareWidth - this.borderWidth / 4),
                y: y * (this.squareHeight - this.borderWidth / 4)
            };
            if (x == 0) {
                coord.x = 0;
            }
            var v = newGrid[y][x];

            
            // if (oldGrid[y][x] != newGrid[y][x]) {
            //     squares.push(
            //         <Square val={v} key={this.cardCounter} x={coord.x} y={coord.y} tx={coord.x} ty={coord.y} width={w} height={h}>
            //         </Square>
            //     );
            // } else {
            //     squares.push(
            //         <Square val={0} key={this.cardCounter} x={coord.x} y={coord.y} tx={coord.x} ty={coord.y} width={w} height={h}>
            //         </Square>
            //     );
            // }
            if (newCoords[[x, y]]) {
                squares.push(
                    <Square val={0} tval={0} key={this.cardCounter} x={coord.x} y={coord.y} tx={coord.x} ty={coord.y} width={w} height={h}>
                    </Square>
                );
            } else {
                squares.push(
                    <Square val={v} tval={v} key={this.cardCounter} x={coord.x} y={coord.y} tx={coord.x} ty={coord.y} width={w} height={h}>
                    </Square>
                );
            }
            
            this.cardCounter++;
            }
        }
        
        console.log(squares.length);
        return squares.concat(changeSquares);
    }

    render() {
    var squares = this.makeCards(this.state.oldGrid, this.state.grid, this.state.changes);
    var gridText = "";
    for (var y = 0; y < this.state.grid.length; y++) {
        gridText += JSON.stringify(this.state.grid[y]) + "\n";
    }
    return (
        <View>
            <TouchableWithoutFeedback onPressOut={this.released} onPressIn={this.pressed}>
                <View style={[{
                    width: this.width,
                    height: this.height,
                    borderWidth: this.borderWidth,
                    borderRadius: 6,
                    backgroundColor: '#BBADA0',
                    borderColor: '#BBADA0',
                    top: this.y,
                    left: this.x
                }]}>
                    {squares.map((s)=>s)}
                </View>
            </TouchableWithoutFeedback>
            {/* <Text style={{top: th}}>
                {gridText}
            </Text> */}
        </View>
    );
    }
}