import React from 'react'
import { Text,StyleSheet, View, Button,TextInput,TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { ListItem, Input, Icon } from 'react-native-elements'
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

    displayMyInformation(){

        if(this.state.myInformation === true) {
            return (
                <View>
                    <Input
                        placeholder='Name'
                        leftIcon={
                            <Icon
                                name='ac-unit'
                                size={20}
                                color='black'
                            />
                        }
                        defaultValue={''}
                    />
                    <Input
                        placeholder='Surname'
                        leftIcon={
                            <Icon
                                name='ac-unit'
                                size={20}
                                color='black'
                            />
                        }
                        defaultValue={''}
                    />
                    <Input
                        placeholder='email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={20}
                                color='black'
                            />
                        }
                        defaultValue={''}
                    />
                    <Input
                        placeholder='Postal Code'
                        leftIcon={
                            <Icon
                                name='ac-unit'
                                size={20}
                                color='black'
                            />
                        }
                        defaultValue={''}
                    />
                    <Input
                        placeholder='Phone'
                        leftIcon={
                            <Icon
                                name='ac-unit'
                                size={20}
                                color='black'
                            />
                        }
                        defaultValue={''}
                    />

                </View>
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
            <View style={styles.content_1}>
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
            <View>
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