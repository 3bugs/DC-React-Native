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
} from 'react-native';

const MyButton = props => (
    <TouchableOpacity activeOpacity={0.5}
                      onPress={() => {
                          props.onClick(props.num);
                      }}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.num}</Text>
        </View>
    </TouchableOpacity>
);

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
                        text: 'OK', onPress: () => {
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

    render() {
        console.log('RENDER is called');

        let msg = 'Hello';
        let product = {
            name: 'Test Product Name',
            price: 500,
            test: {
                a: 1,
                b: 2,
            },
        };

        return (
            <ImageBackground source={require('./images/bg.jpg')}
                             style={{width: '100%', height: '100%'}}>

                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text>{this.state.myData}</Text>
                    </View>

                    <View style={[styles.row, {marginBottom: 40}]}>
                        <View style={[styles.indicator, {backgroundColor: this.state.digit1 ? '#000000' : 'rgba(0, 0, 0, 0)'}]}/>
                        <View style={[styles.indicator, {backgroundColor: this.state.digit2 ? '#000000' : 'rgba(0, 0, 0, 0)'}]}/>
                        <View style={[styles.indicator, {backgroundColor: this.state.digit3 ? '#000000' : 'rgba(0, 0, 0, 0)'}]}/>
                        <View style={[styles.indicator, {backgroundColor: this.state.digit4 ? '#000000' : 'rgba(0, 0, 0, 0)'}]}/>
                    </View>

                    <View style={styles.row}>
                        {/*ปุ่ม 1, 2, 3*/}
                        <MyButton num="1" onClick={this.handlePressButton}/>
                        <MyButton num="2" onClick={this.handlePressButton}/>
                        <MyButton num="3" onClick={this.handlePressButton}/>
                    </View>

                    <View style={styles.row}>
                        {/*ปุ่ม 4, 5, 6*/}
                        <MyButton num="4" onClick={this.handlePressButton}/>
                        <MyButton num="5" onClick={this.handlePressButton}/>
                        <MyButton num="6" onClick={this.handlePressButton}/>
                    </View>

                    <View style={styles.row}>
                        {/*ปุ่ม 7, 8, 9*/}
                        <MyButton num="7" onClick={this.handlePressButton}/>
                        <MyButton num="8" onClick={this.handlePressButton}/>
                        <MyButton num="9" onClick={this.handlePressButton}/>
                    </View>

                    <View style={styles.row}>
                        {/*ปุ่ม 0*/}
                        <MyButton num="0" onClick={this.handlePressButton}/>
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
        color: '#666666',
    },

    indicator: {
        width: 30,
        height: 30,
        marginHorizontal: 8,
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
});

export default App;
