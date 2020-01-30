import React from 'react';
import Navigation from './Navigation/Navigation';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';

export default class App extends React.Component {

    componentDidMount() {
        Font.loadAsync({
            'Montserrat-Black': require('./assets/fonts/Montserrat/Montserrat-Black.ttf'),
            'Montserrat-Bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
            'Montserrat-ExtraLight': require('./assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
            'Montserrat-Medium': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
            'Montserrat-Thin': require('./assets/fonts/Montserrat/Montserrat-Thin.ttf'),
            'Helvetica': require('./assets/fonts/Helvetica/Helvetica.ttf'),
        });
    }

    render() {
        return (
                <Navigation/>
        );
    }
}

