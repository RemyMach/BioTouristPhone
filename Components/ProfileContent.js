import React from 'react'
import { Text,StyleSheet, View, Button,TextInput, ActivityIndicator, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import MyProfile from './MyProfile'
import Auth from './Auth'



class ProfileContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            connected: undefined,
            user: undefined,
            refresh: false
        }
    }

    componentDidMount() {

        this.getSessionValueDependingOnKey('user')
    }

    componentDidUpdate() {

        this.getSessionValueDependingOnKey('user')
    }

    async getSessionValueDependingOnKey(key){
        try{
            const value = await AsyncStorage.getItem(key).then(result =>
                this.setStateDependigUserSession(JSON.parse(result)
                ));
            return value;
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    setStateDependigUserSession(user){

        if(user !== null && this.state.connected !== true){
            this.setState({
                connected: true,
                loading: false,
                user: user
            })
        }else if(user === null && this.state.connected !== false){
            this.setState({
                connected: false,
                loading: false,
                user: undefined
            })
        }
    }

    _displayLoading() {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
    }

    render(){
        if(this.state.loading === true){
            return  (
                    <View>
                        {this._displayLoading()}
                    </View>
            )
        }else if(this.state.connected === true){
            return (
                <MyProfile
                    user={this.state.user}
                    navigation={this.props.navigation}
                />
            )
        }else if(this.state.connected === false){
            return (
                <Auth
                    navigation={this.props.navigation}
                />
            )
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

export default ProfileContent