import React from 'react'
import {ActivityIndicator, AsyncStorage, Button, StyleSheet, Text, View, Alert, ImageBackground} from 'react-native'
import Constants from "expo-constants";
import {NavigationActions, StackActions} from "react-navigation";
import MyProfile from './MyProfile'
import Auth from './Auth'

class Cart extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            value: undefined,
        }


    }

    async storeDataInSession(){
        try{
            await AsyncStorage.setItem('cart', JSON.stringify({
                "idannounce"
                    : 1,
                "quantity"
                    : 2,
                "annount"
                    : 13.4,
            }));

        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async getSessionValueDependingOnKey(key){
        try{
            const value = await AsyncStorage.getItem(key).then(result => result);
            console.log(value);
            this.setState({
                value: JSON.parse(value),
                loading: false
            })

        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    getCart(){
        this.getSessionValueDependingOnKey('cart')
    }

    initializeInputsValue(){

        this.email = this.state.user.email
    }

    render() {
        //this.getCart();
        //this.getSessionValueDependingOnKey('cart')
        console.log(this.state.value);
        if (this.state.value === "undefined"){
        return (
            <ImageBackground source={require('../Images/multifruit.jpg')} style={background.content_1}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.content_1}>Cart</Text>
                    <Text style={styles.content_1}>Cart is empty</Text>
                    <Button
                        style={button.content_1}
                        //onPress={this.storeDataInSession()}
                        title="Allez Sur la page Annonce"
                        color="#841584"
                    />
                </View>
            </ImageBackground>
        )}else{
            return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.content_1}>Pas ok</Text>
                <Button
                    style={button.content_1}
                    onPress={this.storeDataInSession()}
                    title="Allez Sur la page Annonce"
                    color="#841584"
                        />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight,
        fontSize: 75,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        color: "#20232a",
        textAlign: "center",
        fontWeight: "bold"
        ,
    },
});

const button = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16,

    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        color: "#20232a",
        fontWeight: "bold"
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    submit:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    submitText:{
        color:'#fff',
        textAlign:'center',
    }
});

const background = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight,
        flex:1,
    },
});

export default Cart