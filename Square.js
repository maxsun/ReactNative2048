import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

export default class Square extends Component {
    
    constructor(props) {
        super();
        this.width = props.width;
        this.height = props.height;
        var x = props.x;
        if (props.x != props.tx) {
            x = new Animated.Value(props.x);
        }
        var y = props.y;
        if (props.y != props.ty) {
            y = new Animated.Value(props.y);
        }
        console.log(props.tval)
        this.state = {
            x: x,
            y: y,
            tx: props.tx,
            ty: props.ty,
            val: props.val,
            tval: props.tval,
            width: props.width,
            height: props.height
        };
        this.squareColors = {
            0: 'rgba(238, 228, 218, 0.35)',
            2: '#eee4da',
            4: '#ede0c8',
            8: '#f2b179',
            16: '#f59563',
            32: '#f67c5f',
            64: '#f65e3b',
            128: '#edcf72',
            256: '#edcc61',
            512: '#edc850',
            1024: '#edc53f',
            2048: '#edc22e',
            4096: '',
            8192: ''
        };
        this.fontSizes = {
            1: 42,
            2: 42,
            3: 32,
            4: 22
        };
    }

    createAnimation = (v, tv, cb) => {
        return Animated.timing(
            v, {
                toValue: tv,
                duration: 100,
            }
        );
    }

    componentDidMount() {
        if (this.state.x != this.state.tx) {
            var xa = this.createAnimation(this.state.x, this.state.tx);
            xa.start(() => {
                this.setState({
                    val: this.state.tval
                });
            });
            this.xa = xa;            
        }
        if (this.state.y != this.state.ty) {
            var ya = this.createAnimation(this.state.y, this.state.ty);
            ya.start();
            this.ya = ya;
        }
        console.log(this.state.width);
        console.log('??')
    }

    componentWillReceiveProps(nextProps) {
    if (this.state.tx !== nextProps.tx) {
        this.setState({
        tx: nextProps.tx,
        });
        this.xa.stop();
        var xa = this.createAnimation(this.state.x, this.state.tx);
        xa.start(); 
        this.xa = xa;
    }
    if (this.state.ty !== nextProps.ty) {
        this.setState({
        ty: nextProps.ty,
        });
        this.ya.stop();
        var ya = this.createAnimation(this.state.y, nextProps.ty);
        ya.start(); 
        this.ya = ya;
    }
    }  

    render() {
    var style = {
        backgroundColor: this.squareColors[this.state.val],
        height: this.state.height,
        width: this.state.width,
        top: this.state.y,
        left: this.state.x,
        position: 'absolute'
    };
    var textColor = "#776e65";
    if (this.state.val >= 8) {
        textColor = "#f9f6f2";
    }
    var fontSize = this.fontSizes[this.state.val.toString().length];
    var text = this.state.val;
    if (text == 0) {
        text = "";
    }
    return (
        <Animated.View style={[style, {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
        }]}>
        <Text style={[{color: textColor, fontSize: fontSize, fontWeight: 'bold'},]}>{text}</Text>
        </Animated.View>
    );
    }
}