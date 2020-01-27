import React from 'react'
import {
    Text,
    StyleSheet,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    AsyncStorage
} from 'react-native'
import Constants from 'expo-constants'
import { CheckBox } from 'react-native-elements'
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'
import { Header } from 'react-navigation-stack';
import {NavigationActions, StackActions} from "react-navigation";



class Register extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            status : undefined,
            status_user : 'Tourist',
            data: undefined,
            isLoaded : true,
            check1 : true,
            check2 : false
        }
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.postalCode = ""
        this.phoneNumber = ""
        this.password = ""
        this.passwordConfirmation = ""
        this.status = ""
    }

    _register() {

        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': ADMIN_API_ID,
            'user_name': this.firstName,
            'user_surname': this.lastName,
            'email': this.email,
            'user_postal_code': this.postalCode,
            'user_phone': this.phoneNumber,
            'password': this.password,
            'passwordConfirmation' : this.passwordConfirmation,
            'status_user': this.state.status_user
        }
        postRequest('user/store',data).then(response =>
            this.setState({
                    data : response.data,
                    status : response.data.status,
                }, () => {
                    this.storeSessionIfRegister()
                }
            ))
    }

    storeSessionIfRegister(){
        console.log('jon')
        const {status} = this.state
        if(status === '200'){

            this.storeDataInSession()
        }
    }

    async storeDataInSession(){
        try{

            await AsyncStorage.setItem('user', JSON.stringify(this.state.data.user))
            await AsyncStorage.setItem('user_status', JSON.stringify(this.state.data.user_status[0]))
            await AsyncStorage.setItem('user_current_status', JSON.stringify(this.state.data.user_current_status))
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

    _displayFailedToRegister(){
        if(this.state.status === '400') {
            var array = []
            for(var variable in this.state.data.error) {
                array.push(`${this.state.data.error[variable]}`)
                array.map(value => console.log(value))
            }
            return (
                <View style={ styles.contentAlert }>{array.map(value => <Text style={styles.alert}>-{value}{'\n'} </Text>)}</View>

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

    _displaySellerDescription(){

        if(this.state.check2 === true){
            return (
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    placeholder="Seller description"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                />
            </View>
            )
        }
    }

    switchValueCheckButtonTourist(){

        if(this.state.check2 === true){
            this.setState({
                check2: false,
                check1: true,
                status_user: 'Tourist'
            })
        }
    }

    switchValueCheckButtonSeller(){

        if(this.state.check1 === true){

            this.setState({
                check1: false,
                check2: true,
                status_user: 'Seller'
            })
        }
    }

    render(){
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset = {65} // adjust the value here if you need more padding
                style = {{ flex: 1}}
                behavior = "padding" >
                <ScrollView style={styles.content_1}>
                {this._displayFailedToRegister()}
                <TextInput
                    style={styles.textinput}
                    placeholder={'first name'}
                    onChangeText={(text) => this.handleFirstName(text)}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='last name'
                    onChangeText={(text) => this.handleLastName(text)}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder={'email'}
                    onChangeText={(text) => this.handleEmail(text)}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='postal code'
                    onChangeText={(text) => this.handlePostalCode(text)}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='phone number'
                    onChangeText={(text) => this.handlePhoneNumber(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textinput}
                    placeholder='password'
                    onChangeText={(text) => this.handlePassword(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textinput}
                    placeholder='Confirmation Password'
                    onChangeText={(text) => this.handlePasswordConfirmation(text)}
                />
                <View style={styles.checkGroup}>
                    <CheckBox
                        containerStyle={styles.checkBox}
                        title='Tourist'
                        checked={this.state.check1}
                        onPress={() => this.switchValueCheckButtonTourist()}
                        onIconPress={() => this.switchValueCheckButtonTourist()}
                    />
                    <CheckBox
                        containerStyle={styles.checkBox}
                        title='Seller'
                        checked={this.state.check2}
                        onPress={() => this.switchValueCheckButtonSeller()}
                        onIconPress={() => this.switchValueCheckButtonSeller()}
                    />
                </View>
                    {this._displaySellerDescription()}
                <View style={styles.button}>
                    <Button
                        color={'#344941'}
                        title={"register"} onPress={() => this._register()}/>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    handleFirstName(text){
        this.firstName = text
    }
    handleLastName(text){
        this.lastName = text
    }
    handleEmail(text){
        this.email = text
    }
    handlePostalCode(text){
        this.postalCode = text
    }
    handlePhoneNumber(text){
        this.phoneNumber = text
    }
    handlePassword(text){
        this.password = text
    }
    handlePasswordConfirmation(text){
        this.passwordConfirmation = text
    }
    handleStatus(text){
        this.status = text
    }
}

const styles = StyleSheet.create({
    content_1 : {
        flex:1,
        backgroundColor: 'white'
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
    textinput : {
        margin: 5,
        borderWidth: 1,
        borderColor: '#afafaf',
        borderRadius: 4,
        height: 50,
        paddingLeft: 5,
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        margin: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    checkGroup: {
        flex: 1,
        flexDirection: 'row'
    },
    checkBox: {
        backgroundColor: 'white',
        borderWidth: 2,
        height: 50,
        borderRadius: 10
    },
    alert: {
        backgroundColor: '#F8D7D9',
        color: '#86383F',
        borderRadius: 4,
        height: 50,
        textAlign: 'center',
        flex: 1
    },
    contentAlert: {
        backgroundColor: '#F8D7D9',
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 4,
        padding: 0
    }
})

export default Register