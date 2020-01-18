import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, Alert } from 'react-native'
import Constants from "expo-constants";


class Profil extends React.Component {

    _login() {
        console.log('je passe bien dedans')
    }

    render() {
        return (
            <View style={styles.content_1}>
                <TextInput
                    style={styles.textinput}
                    placeholder={"login"}
                    onSubmitEditing ={() => this._login()}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder={"password"}
                    onSubmitEditing ={() => this._login()}
                />
                <View  style={styles.button}>
                    <Button
                        color={ '#344941'}
                        title={"login"} onPress={() => Alert.alert('Right button pressed')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight,
        flex:1,
        justifyContent: 'center',
    },
    textinput : {
        margin: 5,
        borderWidth: 1,
        borderColor: '#afafaf',
        borderRadius: 4,
        height: 50,
        paddingLeft: 5,
    },
    button: {
        width: 100,
        margin: 5
    }
})

export default Profil