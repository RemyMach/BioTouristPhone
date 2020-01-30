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
            'cereal-black': require('./assets/fonts/airbnb-cereal-fonts/AirbnbCerealBlack.ttf'),
            'cereal-light': require('./assets/fonts/airbnb-cereal-fonts/AirbnbCerealLight.ttf'),
            'cereal-medium': require('./assets/fonts/airbnb-cereal-fonts/AirbnbCerealMedium.ttf'),
        });
    }

    render() {
        return (
                <Navigation/>
        );
    }
}

