import React from 'react'
import { Text,StyleSheet, View, Button,TextInput,TouchableOpacity, ActivityIndicator, AsyncStorage, Alert, Image, ImageBackground } from 'react-native'
import Constants from 'expo-constants'
import { ListItem, Input, Icon } from 'react-native-elements'
import MyInformations from "./MyInformations";
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
            myInformation: false,
            modificationPassword: false,
        }
        this.list= [
            {
                title: 'My informations',
                icon: 'accessibility',
                subtitle: 'Vice President'
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

    displayPowerOffAlert(){

        return Alert.alert(
                'Logout',
                'Are you sure to want logout',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => this._logout()},
                ],
            {cancelable: false},
            );
    }

    displayMyInformation(){

        if(this.state.myInformation === true) {
            return (
               <MyInformations/>
            )
        }
    }

    displayModificationPassword(){
        if(this.state.modificationPassword === true) {
            return (
                <Text>Je change le mot de passe</Text>
            )
        }
    }

    displayRightIconInformation(){
        if(this.state.myInformation === true){
            return {name: 'arrow-downward'}
        }
            return {}
    }

    displayRightIconPassword(){
        if(this.state.modificationPassword === true){
            return {name: 'arrow-downward'}
        }
        return {}
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
        return (
            <ImageBackground source={require('../Images/orange.jpeg')} style={styles.content_1}>
                <View elevation={5} style={styles.header}>
                    <View style={styles.imageProfil}>
                        <Image
                            style={styles.pear}
                            source={require('../Images/pear.png')}
                            />
                    </View>
                        <Text style={styles.title}>MACHAVOINE{'\n'}RÉMY</Text>
                    <TouchableOpacity style={styles.imageOff} onPress={() => this.displayPowerOffAlert()}>
                        <Image
                            style={styles.off}
                            source={require('../Images/off.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content_2}>
                    <TouchableOpacity onPress={() => this.setState({myInformation: !this.state.myInformation})}>
                        <ListItem
                            key={1}
                            title={this.list[0].title}
                            leftIcon={{ name: this.list[0].icon }}
                            rightIcon={this.displayRightIconInformation()}
                            bottomDivider
                            chevron={!this.state.myInformation}
                        />
                    </TouchableOpacity>
                    {this.displayMyInformation()}
                    <TouchableOpacity onPress={() => this.setState({
                        modificationPassword: !this.state.modificationPassword,
                        rightIcon: 'arrow-downward'
                    })}>
                        <ListItem
                            key={2}
                            title={this.list[1].title}
                            leftIcon={{ name: this.list[1].icon }}
                            rightIcon={this.displayRightIconPassword()}
                            bottomDivider
                            chevron={!this.state.modificationPassword}
                        />
                    </TouchableOpacity>
                    {this.displayModificationPassword()}
                    <TouchableOpacity>
                        <ListItem
                            key={3}
                            title={this.list[2].title}
                            leftIcon={{ name: this.list[2].icon }}
                            bottomDivider
                            chevron
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight,
        flex:1,
        justifyContent: 'center',
    },
    content_2 : {
        flex:1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: 'grey',
        fontFamily: 'Helvetica'
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 13,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-start'
    },
    pear: {
        width: 50,
        height: 50
    },
    off : {
        width: 30,
        height: 30
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
    },
    imageProfil: {
        margin: 5,
        justifyContent: 'center'
    },
    imageOff: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex:1
    }
})

export default MyProfile