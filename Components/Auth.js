import React from 'react'
import { Text,StyleSheet, View, Button } from 'react-native'
import Constants from 'expo-constants'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'



class Auth extends React.Component {

    constructor(props){
        super(props)

    }

    render(){
        var navigate = this.props.navigation
        return (
            <View style={styles.content_1}>
                <Text style={styles.text}
                >You are not connected yet</Text>
                <View style={styles.button}>
                    <Button
                        title={'Sign in'}
                        color={'#058087'}
                        onPress={() => navigate.navigate('login')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title={'Sign up'}
                        color={'#90a92d'}
                        onPress={() => navigate.navigate('register')}
                    />
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