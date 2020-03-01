import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Login from './screen/Login';
import App from './App';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Main extends Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{title: 'Login'}}
                    />
                    <Stack.Screen
                        name="App"
                        component={App}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
