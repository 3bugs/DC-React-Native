import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator
} from 'react-native';

class MyButton extends Component {

    render() {
        const {text, onClick} = this.props;

        return (
            <React.Fragment>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => {
                                      onClick();
                                  }}>
                    <View style={styles.button}>
                        <Text>{text}</Text>
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isLoading: false,
        };
    }

    componentDidMount = () => {
    };

    handleClickLoginButton = async () => {
        if (this.validateForm()) {
            await this.doLogin();
        }
    };

    doLogin = async () => {
        this.setState({
            isLoading: true,
        });

        const formData = new FormData();
        formData.append('user_name', this.state.username);
        formData.append('user_pass', this.state.password);

        try {
            let response = await fetch(
                'http://dcthai.dyndns.biz:9150/oui/pages/test_api/erp_login.php',
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (response.status !== 200) {
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย');
                this.setState({
                    isLoading: false,
                });
                return;
            }

            let responseJson = await response.json();
            //alert(JSON.stringify(responseJson));

            if (responseJson.login_result == null) {
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย');
            } else if (responseJson.login_result === '0') {
                alert('Username หรือ Password ไม่ถูกต้อง');
            } else if (responseJson.login_result === '1') {
                //alert('เข้าสู่ระบบสำเร็จ');
                this.props.navigation.navigate('Products');
            }

            this.setState({
                isLoading: false,
            });
        } catch (error) {
            console.error(error);
            alert('ผิดพลาด: ' + error);

            this.setState({
                isLoading: false,
            });
        }
    };

    validateForm = () => {
        const {username, password} = this.state;

        if (username.length === 0 || password.length === 0
            || (!this.validateEmail(username) && !this.validatePhoneNumber(username))) {
            Alert.alert(
                'ผิดพลาด',
                'กรอก Username และ Password',
                [
                    {
                        text: 'OK',
                        onPress: null,
                    },
                ],
            );
            return false;
        } else {
            return true;
        }
    };

    validateEmail = data => {
        return true;
        //return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data);
    };

    validatePhoneNumber = data => {
        return true;
        //return /\b\d{13}\b/.test(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>เข้าสู่ระบบ</Text>

                <TextInput style={styles.textInput}
                           placeholder={'กรอก Username'}
                           value={this.state.username}
                           onChangeText={(text) => this.setState({username: text})}/>

                <TextInput style={styles.textInput}
                           placeholder={'กรอก Password'}
                           value={this.state.password}
                           onChangeText={(text) => this.setState({password: text})}
                           secureTextEntry={true}/>

                <MyButton text={'LOGIN'}
                          onClick={this.handleClickLoginButton}/>

                <View style={styles.registerContainer}>
                    <Text>FORGOT PASSWORD</Text>
                    <Text>REGISTER</Text>
                </View>

                {this.state.isLoading &&
                    <View style={{
                        position: 'absolute',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size={'large'}/>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
    },

    title: {
        fontFamily: 'DBHeavent-Bold',
        fontSize: 40,
        marginBottom: 50,
    },

    textInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#666666',
        backgroundColor: 'white',
        width: 300,
        marginBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },

    button: {
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        color: '#000000',
        borderRadius: 30,
        backgroundColor: '#cccccc',
        marginTop: 20,
    },

    registerContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
        padding: 15,
        width: '100%',
        borderWidth: 0,
        borderColor: 'red',
    },
});
