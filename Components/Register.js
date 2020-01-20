import React from 'react'
import { Text,StyleSheet, View, Button } from 'react-native'
import Constants from 'expo-constants'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'



class Auth extends React.Component {

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
        alignItems: 'center',
        borderWidth: 5
    },
    button: {
        width: 150,
        margin: 5,
        color: '#aebbb1',
        borderRadius: 4,
    },
    text: {
        fontSize: 20
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

export default Auth