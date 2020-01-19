import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'



class Profil extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            error : undefined,
            user: undefined
        }
        this.login = ""
        this.password = ""
        this.error = ""
    }
    _login() {

        let result = this.attemptToLogin()
        this.failedToLogin(result)
        this.storeUserInSession(result,'user')
        this.storeUserInSession(result,'user_status')
        this.storeUserInSession(result,'user_current_status')
        this.getSessionUser()

    }

    failedToLogin(response){

        let error = false;
        response.then((responseJson) =>
            //this.error = responseJson.data.status
            this.setState({
                error : 'the password or the login is not correct'
            })
        )
    }

    setStateForLogin(key, value){
        this.setState({
            key : value
        })
    }

    attemptToLogin(){
        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': ADMIN_API_ID,
            'email': this.login,
            'password': this.password
        }
        let query = postRequest('user/login',data)

        return query
    }

    storeUserInSession(query,key){
        //tester
        query.then((response) =>
            this.saveItem(key,JSON.stringify(response.data.key)))
            .catch((error) => console.log(error))
    }

    getSessionUser(){

        AsyncStorage.getItem('user',(error, response) =>
        {
            this.storeUserInTheState(response)
        })
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

    _displayState(){
        console.log(this.state.error)
        if(this.state.error !== undefined) {
            return (
                <Text>pomme</Text>
            )
        }
    }

    render(){
        return (
            <View style={styles.content_1}>
                {this._displayState()}
                <TextInput
                    style={styles.textinput}
                    placeholder={'login'}
                    onChangeText={(text) => this.handleLogin(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textinput}
                    placeholder='Password'
                    onChangeText={(text) => this.handlePassword(text)}
                />
                <View style={styles.button}>
                    <Button
                        color={'#344941'}
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