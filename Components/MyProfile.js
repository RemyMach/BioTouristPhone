import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { ListItem } from 'react-native-elements'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'
import {NavigationActions, StackActions} from "react-navigation";



class MyProfile extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            connected: undefined
        }
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    _logout(){

        this.removeItemSession('user','user_status','user_current_status')
    }

    async removeItemSession(user, allStatus, currentStatus){
        try{
            await AsyncStorage.removeItem(user)
            await AsyncStorage.removeItem(allStatus)
            await AsyncStorage.removeItem(currentStatus)
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'ProfileContent' })]
                })
            )
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    render(){
        const list = [
            {
                title: 'My informations',
                icon: 'accessibility',
            },
            {
                title: 'Password',
                icon: 'security'
            },
            {
                title: 'Messages',
                icon: 'message'
            }
        ]
        return (
            <View style={styles.content_1}>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            bottomDivider
                            chevron
                        />
                    ))
                }
            <View>
                <Text> Vous êtes connecté</Text>
                <Button style={styles.button}
                        title={('logout')}
                        onPress={() => this._logout()}
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

export default MyProfile