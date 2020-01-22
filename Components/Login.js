import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'



class Login extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            status : undefined,
            data: undefined,
            isLoaded : true
        }
        this.login = ""
        this.password = ""
    }

    _login() {

        this.attemptToLogin()
    }

    attemptToLogin(){
        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': ADMIN_API_ID,
            'email': this.login,
            'password': this.password
        }
        postRequest('user/login',data).then(response =>
            this.setState({
                data : response.data,
                status : response.data.status,
            }, () => {
                this.storeSessionIfLogin()
            }
        ))
    }

    storeSessionIfLogin(){
        const {status} = this.state
        if(status === '200'){

            this.removeItemSession()
            this.storeDataInSession('user','user_status','user_current_status')
            const resultat = this.getSessionValueDependingOnKey('user')
            console.log('pomme')
        }
    }

    async removeItemSession(){
        try{
            await AsyncStorage.removeItem('user')
            console.log('remove')
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async storeDataInSession(key, status, current_status){
        try{

            await AsyncStorage.setItem('user', JSON.stringify(this.state.data.user))
            await AsyncStorage.setItem('user_status', JSON.stringify(this.state.data.user_status[0]))
            await AsyncStorage.setItem('user_current_status', JSON.stringify(this.state.data.user_current_status))
            console.log('store')
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async getSessionValueDependingOnKey(key){
        try{
            const value = await AsyncStorage.getItem(key).then(result => console.log(JSON.parse(result)));
            console.log('get')
            return value;
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
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


    _displayFailedToLoginOrStoreSession(){
        if(this.state.status === '400') {
            console.log(this.state.data.message)
            return (
                <Text
                    style={styles.alert}>
                    {this.state.data.message}</Text>
            )
        }
    }
    _displayLoading() {
        if (!this.state.isLoaded) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    render(){
        return (
            <View style={styles.content_1}>
                {this._displayFailedToLoginOrStoreSession()}
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
                        title={"login"}
                        onPress={() => this._login()}/>
                </View>
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight,
        flex:1,
    },
    button: {
        width: 150,
        margin: 5,
        color: '#aebbb1',
        borderRadius: 4,
    },
    textinput : {
        margin: 5,
        borderWidth: 1,
        borderColor: '#afafaf',
        borderRadius: 4,
        height: 50,
        paddingLeft: 5,
    },
    alert: {
        margin: 5,
        backgroundColor: '#F8D7D9',
        color: '#86383F',
        borderRadius: 4,
        height: 50,
        textAlign: 'center'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        /*on met un top: 100 pour que le textInput et le bouton soit toujours disponible
         vu qu'on a mit une View en absolute qui pourrait les recouvrir*/
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Login