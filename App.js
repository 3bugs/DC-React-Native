/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Image,
    Button
} from 'react-native';

class MyButton extends Component {

    render() {
        const {num, onClick, bgColor} = this.props;

        return (
            <React.Fragment>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => {
                                      onClick(num);
                                  }}>
                    <View style={[styles.button, {backgroundColor: bgColor}]}>
                        <Text style={styles.buttonText}>{num}</Text>
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}

class App extends Component {

    state = {
        myData: '',

        digit1: false,
        digit2: false,
        digit3: false,
        digit4: false,
    };

    handlePressButton = (num) => {
        const myData = this.state.myData + num;

        let digit1 = false, digit2 = false, digit3 = false, digit4 = false;
        switch (myData.length) {
            case 0:
                break;
            case 4:
                digit4 = true;
            case 3:
                digit3 = true;
            case 2:
                digit2 = true;
            case 1:
                digit1 = true;
                break;
        }

        this.setState({
            myData, digit1, digit2, digit3, digit4,
        });

        if (myData.length === 4) {
            let title, msg;

            if (myData === '1234') {
                title = 'SUCCESS';
                msg = 'รหัสผ่านถูกต้อง';
            } else {
                title = 'FAILED';
                msg = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่';
            }

            Alert.alert(
                title,
                msg,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.setState({
                                myData: '',
                                digit1: false,
                                digit2: false,
                                digit3: false,
                                digit4: false,
                            });
                        },
                    },
                ],
                {cancelable: false},
            );
        }
    };

    getHeart = (status) => (status
            ? (<Image source={require('./images/ic_heart_on.png')}
                      style={{width: 40, height: 40, marginHorizontal: 10}}/>)
            : (<Image source={require('./images/ic_heart_off.png')}
                      style={{width: 40, height: 40, marginHorizontal: 10}}/>)
    );

    getButton = (num, bgColor) => (
        <MyButton num={num}
                  bgColor={bgColor}
                  onClick={this.handlePressButton}/>
    );

    render() {
        const {myData, digit1, digit2, digit3, digit4} = this.state;

        return (
            <ImageBackground source={require('./images/bg.jpg')}
                             style={{width: '100%', height: '100%'}}>

                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text>{myData}</Text>
                    </View>

                    <View style={[styles.row, {marginBottom: 40}]}>
                        {this.getHeart(digit1)}
                        {this.getHeart(digit2)}
                        {this.getHeart(digit3)}
                        {this.getHeart(digit4)}
                    </View>

                    {
                        [
                            [{num: 1, color: 'red'}, {num: 2, color: 'green'}, {num: 3, color: 'blue'}],
                            [{num: 4, color: 'red'}, {num: 5, color: 'green'}, {num: 6, color: 'blue'}],
                            [{num: 7, color: 'red'}, {num: 8, color: 'green'}, {num: 9, color: 'blue'}],
                        ].map(
                            item => (
                                <View style={styles.row}>
                                    {
                                        item.map(
                                            subItem => (this.getButton(subItem.num, subItem.color)),
                                        )
                                    }
                                </View>
                            ),
                        )
                    }

                    <View style={styles.row}>
                        {/*ปุ่ม 0*/}
                        {this.getButton(0, 'white')}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: '#ff0000',
    },

    row: {
        flexDirection: 'row',
        marginBottom: 15,
        borderWidth: 0,
        borderColor: '#00ff00',
    },

    button: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        color: '#000000',
        borderRadius: 30,
        backgroundColor: '#cccccc',
    },

    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },

    indicator: {
        width: 30,
        height: 30,
        marginHorizontal: 8,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
});

export default App;
