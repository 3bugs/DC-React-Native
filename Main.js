import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Login from './screen/Login';
import Products from './screen/QrScanner';
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
                        name="Products"
                        component={Products}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
