/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,Easing} from 'react-native';
import { RNCamera } from 'react-native-camera'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            moveAnim: new Animated.Value(0),
            result:''
        };
    }

  render() {
    return (
        <View style={styles.container}>
            <Text style={{marginTop:40}}>结果是:{this.state.result}</Text>
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onBarCodeRead={this.onBarCodeRead}
            >
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}/>
                    <Animated.View style={[
                        styles.border,
                        {transform: [{translateY: this.state.moveAnim}]}]}/>
                    <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                </View>
            </RNCamera>
        </View>

    );
  }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    //  识别二维码
    onBarCodeRead = (result) => {
        const {data} = result; //只要拿到data就可以了
        // alert(data)
        this.setState({
            result:data
        })
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});
