import {Button, StyleSheet, View, Text, ActivityIndicator, AsyncStorage} from "react-native";
import {Icon, Input} from "react-native-elements";
import React from "react";
import Constants from "expo-constants";
import {postRequest} from "../API/BioTouristAPI";

class MyPassword extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            message: undefined,
            status: undefined
        }
        this.oldPassword= ""
        this.password= ""
        this.password_confirmation= ""

    }

    componentDidMount() {
        this.getSessionValueDependingOnKey('user')
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

    updatePassword(){
        let data = {
            'api_token': this.state.user.api_token,
            'idUser': this.state.user.idUser,
            'oldPassword': this.oldPassword,
            'password': this.password,
            'password_confirmation': this.password_confirmation,
        }
        postRequest('user/updatePassword',data).then(response =>
            this.setDisplayMessageDependingResponse(response)
        )
    }

    setDisplayMessageDependingResponse(response){
        console.log(response.data)
        if(response.data.status === '200'){
            console.log('--------')
            this.setState({
                    status : response.data.status,
                    message: response.data.message
                }
            )
        }else if(response.data.status === '400'){
            this.setState({
                status: response.data.status,
                data: response.data
            })
        }
    }

    _displayAlertMessage(){

        if(this.state.status === '400') {
            var array = []
            if(this.state.data.error){

                for(var variable in this.state.data.error) {
                    array.push(`${this.state.data.error[variable]}`)
                    array.map(value => console.log(value))
                }
                return (
                    <View>{array.map(value => <Text style={styles.alert}>-{value}{'\n'} </Text>)}</View>
                )
            }
            return (
                <View><Text style={styles.alert}>{this.state.data.message}</Text></View>
            )
        }else if(this.state.status === '200'){
            return (
                <View ><Text style={styles.success}>{this.state.message}</Text></View>
            )
        }
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    render() {
        if(this.state.loading === true){
            return  (
                <View style={styles.loading}>
                    {this._displayLoading()}
                </View>
            )
        }else {
            return (
                <View style={styles.content_1}>
                    {this._displayAlertMessage()}
                    <View>
                        <Text style={styles.title}>
                            Modify your password
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.description}>Actual password</Text>
                        <Input
                            placeholder={'**********'}
                            secureTextEntry={true}
                            inputStyle={styles.input}
                            onChangeText={(text) => this.handleOldPassword(text)}
                        />
                        <Text style={styles.description}>New password</Text>
                        <Input
                            secureTextEntry={true}
                            inputStyle={styles.input}
                            onChangeText={(text) => this.handlePassword(text)}
                        />
                        <Text style={styles.description}>Confirm new password</Text>
                        <Input
                            secureTextEntry={true}
                            inputStyle={styles.input}
                            onChangeText={(text) => this.handlePasswordConfirmation(text)}
                        />
                        <View style={styles.button}>
                            <Button color={'#344941'}
                                    title={"Save"}
                                    onPress={() => this.updatePassword()}/>
                        </View>
                    </View>
                </View>
            )
        }
    }

    handleOldPassword(text){
        this.oldPassword = text
    }

    handlePassword(text){
        this.password = text
    }

    handlePasswordConfirmation(text){
        this.password_confirmation = text
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
    },
    success: {
        margin: 5,
        backgroundColor: '#D4EDDA',
        color: '#155623',
        borderRadius: 4,
        height: 50,
        textAlign: 'center'
    }
})

export default MyPassword