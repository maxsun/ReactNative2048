/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import './game';
import Grid from './Grid';

export default class App extends Component {
  
  constructor() {
    super();
    var squares = [];
    
    this.state = {
      squares: squares
    }
  }

  render() {
    var window = Dimensions.get('window');
    var w = window.width * 0.90
    var x = window.width * 0.05
    return (
      <View>
        <Grid x={x} y={window.height/2 - w/2} style={[styles.grid]} width={w} height={w} rows={4} cols={4} grid={populateGrid(generateGrid(4, 4))}></Grid>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  grid: {
    
  }
});
