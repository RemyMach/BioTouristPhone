import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, Alert } from 'react-native'
import Constants from 'expo-constants'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'



class Profil extends React.Component {

    constructor(props)
    {
        super(props)
        this.login = ""
        this.password = ""
    }
    _login() {
        console.log(this.login + ' + ' + this.password)
        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': ADMIN_API_ID,
            'email': this.login,
            'password': this.password
        }
        let pomme = postRequest('user/login',data)
        console.log(pomme.then((response) => console.log(response.data))
            .catch((error) => console.log(error)))
    }

    handleLogin(text){
        this.login = text
    }

    handlePassword(text){
        this.password = text
    }

    _password(text) {
        console.log(text)
        let data = [];
        //let pomme = postRequest('user/login',data)
    }

    render() {
        return (
            <View style={styles.content_1}>
                <TextInput
                    style={styles.textinput}
                    placeholder={'login'}
                    onChangeText = {(text) => this.handleLogin(text)}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='Password'
                    onChangeText = {(text) => this.handlePassword(text)}
                />
                <View  style={styles.button}>
                    <Button
                        color={ '#344941'}
                        title={"login"} onPress={() => this._login()}/>
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