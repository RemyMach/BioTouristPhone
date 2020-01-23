import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'
import Auth from './Auth'



class Profil extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            error : undefined,
            status : undefined,
            data: undefined
        }
        this.login = ""
        this.password = ""
    }

    _login() {

        this.attemptToLogin()
        /*this.storeUserInSession('user')
        this.storeUserInSession('user_status')
        this.storeUserInSession('user_current_status')
        this.getSessionUser()*/

    }

    attemptToLogin(){
        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': ADMIN_API_ID,
            'email': this.login,
            'password': this.password
        }
        postRequest('user/login',data).then(response => this.setState({
            data : response.data,
            status : response.data.status,
        }))
    }

    storeDataInSession(key){
            this.saveItem(key,JSON.stringify(this.state.data.key))
            .catch((error) => console.log(error))
    }

    async getSessionValueDependingOnKey(key){

        try{
            await AsyncStorage.getItem(key,(error, response) =>
            {
                console.log(JSON.parse(response))
            })
        }catch (error) {
            console.log('voici l\'erreur : ' + error)
        }
    }

    storeUserInTheState(response){
        this.setState({
            user:JSON.parse(response)
        })
    }

    handleLogin(text){
        this.login = text
    }

    handlePassword(text){
        this.password = text
    }

    async saveItem(key, value) {
        try{
            await AsyncStorage.setItem(key, value)
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    _displayFailedToLoginOrStoreSession(){
        if(this.state.status === '400') {
            console.log(this.state.data.message)
            return (
                <Text
                style={styles.alert}
                >{this.state.data.message}</Text>
            )
        }else if(this.state.status === '200'){
            console.log('je passe à nouveau ici')
            this.storeDataInSession('user')
            this.storeDataInSession('user_status')
            this.storeDataInSession('user_current_status')
            console.log(this.getSessionValueDependingOnKey('user'))
        }
    }

    render(){
        return (
            <Auth
                navigation={this.props.navigation}
            />
        )
    }

    componentDidMount() {
        console.log('pomme pomme et nanadsd')
        if(this.state.status == '200'){
            console.log('j\'ai un statut à 200')
            console.log(this.state.data)
        }
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
        margin: 5,
    },
    alert: {
        margin: 5,
        backgroundColor: '#F8D7D9',
        color: '#86383F',
        borderRadius: 4,
        height: 50,
        textAlign: 'center'
    }
})

export default Profil