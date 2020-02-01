import {Button, StyleSheet, View, Text, AsyncStorage, ActivityIndicator} from "react-native";
import {Input} from "react-native-elements";
import React from "react";
import Constants from "expo-constants";
import {postRequest} from "../API/BioTouristAPI";
import {NavigationActions, StackActions} from "react-navigation";

class MyInformations extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            user: undefined,
        }
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.postalCode = ""
        this.phoneNumber = ""

    }

    componentDidMount() {
        this.getSessionValueDependingOnKey('user')
    }

    updateProfile(){
        let data = {
            'api_token': this.state.user.api_token,
            'idUser': this.state.user.idUser,
            'user_name': this.firstName,
            'user_surname': this.lastName,
            'email': this.email,
            'user_postal_code': this.postalCode,
            'user_phone': this.phoneNumber,
        }
        postRequest('user/updateProfile',data).then(response =>
            this.updateSessionIfUpdateWork(response)
        )
    }

    updateSessionIfUpdateWork(response){
        console.log(response.data)
        if(response.data.status === '200'){
            console.log('--------')
            this.setState({
                user: response.data.user
            },() => this.storeDataInSession(response)
            )
        }else if(response.data.status === '400'){
            this.setState({
                status: response.data.status,
                data: response.data
            })
        }
    }

    async storeDataInSession(response){
        try{
            await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 1,
                    key: null,
                    actions: [
                        NavigationActions.navigate({ routeName: 'ProfileContent' }),
                        NavigationActions.navigate({ routeName: 'MyInformations' })

                    ]
                })
            )
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async getSessionValueDependingOnKey(key){
        try{
            const value = await AsyncStorage.getItem(key).then(result => result);
            this.setState({
                user: JSON.parse(value),
                loading: false
            })
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    _displayFailedUpdateMessage(){

        if(this.state.status === '400') {
            var array = []
            if(this.state.data.error){

                for(var variable in this.state.data.error) {
                    array.push(`${this.state.data.error[variable]}`)
                    array.map(value => console.log(value))
                }
                return (
                    <View style={ styles.contentAlert }>{array.map(value => <Text style={styles.alert}>-{value}{'\n'} </Text>)}</View>
                )
            }
            return (
                <View style={ styles.contentAlert }><Text style={styles.alert}>{this.state.data.message}</Text></View>
            )
        }
    }

    render() {
        if(this.state.loading === true){
            return  (
                <View style={styles.loading}>
                    {this._displayLoading()}
                </View>
            )
        }else {
            this.initializeInputsValue()
            return (
                <View style={styles.content_1}>
                    {this._displayFailedUpdateMessage()}
                    <View>
                        <Text style={styles.title}>
                            Modify your personal informations
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.description}>Name</Text>
                        <Input
                            inputStyle={styles.input}
                            defaultValue={this.state.user.user_name}
                            onChangeText={(text) => this.handleFirstName(text)}
                        />
                        <Text style={styles.description}>Surname</Text>
                        <Input
                            inputStyle={styles.input}
                            defaultValue={this.state.user.user_surname}
                            onChangeText={(text) => this.handleLastName(text)}
                        />
                        <Text style={styles.description}>email</Text>
                        <Input
                            inputStyle={styles.input}
                            defaultValue={this.state.user.email}
                            onChangeText={(text) => this.handleEmail(text)}
                        />
                        <Text style={styles.description}>Postal Code</Text>
                        <Input
                            inputStyle={styles.input}
                            keyboardType={'numeric'}
                            defaultValue={`${this.state.user.user_postal_code}`}
                            onChangeText={(text) => this.handlePostalCode(text)}
                        />
                        <Text style={styles.description}>Phone</Text>
                        <Input
                            inputStyle={styles.input}
                            keyboardType={'numeric'}
                            defaultValue={this.state.user.user_phone}
                            onChangeText={(text) => this.handlePhone(text)}
                        />
                        <View style={styles.button}>
                            <Button color={'#344941'}
                                    title={"Save"}
                                    onPress={() => this.updateProfile()} />
                        </View>
                    </View>
                </View>
            )
        }
    }

    initializeInputsValue(){

        this.firstName = this.state.user.user_name
        this.lastName = this.state.user.user_surname
        this.email = this.state.user.email
        this.postalCode = this.state.user.user_postal_code
        this.phoneNumber = this.state.user.user_phone
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
        console.log(this.postalCode)
    }

    handlePhone(text){
        this.phoneNumber = text
    }
}

const styles = StyleSheet.create({
    content_1 : {
        paddingTop : Constants.statusBarHeight,
        marginRight: 5,
        marginLeft: 5,
        flex:1,
        backgroundColor: 'white'
    },
    loading : {
        flex:1,
        justifyContent: 'center',
    },
    input : {
        fontSize: 22,
        color: 'grey',
        borderBottomColor: 'grey',
    },
    title: {
        fontSize: 32,
        color: 'black',
        fontFamily: 'cereal-medium'
    },
    form: {
        marginTop: 20
    },
    description: {
        fontSize: 14,
        color: 'grey',
        fontFamily: 'cereal-medium',
        marginLeft: 8,
        marginTop: 10
    },
    button: {
        width: 100,
        marginLeft: 8,
        marginTop: 15,
        fontFamily: 'Montserrat'
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

export default MyInformations