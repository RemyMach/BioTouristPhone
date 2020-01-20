import React from 'react';
import Navigation from './Navigation/Navigation';
import Profil from './Components/Profil';
import 'react-native-gesture-handler';
import Text from "react-native"

export default class App extends React.Component {
    render() {
        /*return (
            <Profil/>
        );*/
        return (
                <Navigation/>
        );
    }
}

