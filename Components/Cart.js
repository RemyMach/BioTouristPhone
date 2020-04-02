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
            value: null,
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
            //console.log(this.state.value)
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async storeDataInSession(){
        try{
            await AsyncStorage.setItem('cart', JSON.stringify([{
                idannounce: 1,
                announce_name: "Banane",
                quantity: 2,
                annount: 13.4,
            }]));

        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async pushDataInSession(){
        try {
            const productToBeSaved = {
                idannounce: 2,
                announce_name: "Pomme",
                quantity: 3,
                annount: 20.4, }
            const existingProducts = await AsyncStorage.getItem("cart")
            console.log(existingProducts)
            let newProduct = JSON.parse(existingProducts);
            if( !newProduct ){
                newProduct = []
            }
            newProduct.push( productToBeSaved )
            AsyncStorage.setItem("cart", JSON.stringify(newProduct) )
            this.getCart('cart')
        }catch(error){
            console.error('AsyncStorage error: ' + error.message)
        }
    }
    async removeItemByIndexSession(index){
        try{
            var session = this.state.value
            var allindex = index
            session = session.filter((element , index) => element && index !== allindex)
            console.log(session)
            await AsyncStorage.setItem('cart', JSON.stringify(session));
            this.getCart('cart')
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }

    }

    async removeItemSession(){
        try{

            const value = await AsyncStorage.removeItem('cart')

            this.setState({
                value: JSON.parse(value),
                loading: false
            })
            console.log(this.state.value)
            this.getCart()
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    getCart(){
        this.getSessionValueDependingOnKey('cart')
    }
    addCart(){
        this.storeDataInSession();
        this.getCart('cart')
    }
    pushCart(){
        this.pushDataInSession();
        this.getCart('cart')
    }
    destroyCart(){
        this.removeItemSession()
    }
    initializeInputsValue(){

        this.email = this.state.user.email
    }



    render() {
        //this.getSessionValueDependingOnKey('cart')
        //this.removeItemSession();
        //console.log()
        if (this.state.value === null ){
        return (

            <ImageBackground source={require('../Images/multifruit.jpg')} style={background.content_1}>
                <View style={{justifyContent:'center',alignItems:'center'}}>

                    <Text style={styles.content_1}>Cart</Text>
                    <Text style={styles.content_1}>Cart is empty</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                    <Button
                        onPress={() => this.addCart()}
                        title="Add Annonce"
                        color="#841584"
                    />
                    <Button
                        onPress={() => this.getCart()}
                        title="get Annonce"
                        color="#841584"
                    />
                </View>
            </ImageBackground>
        )}else{
            return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.content_1}>Cart</Text>
                    <Text > </Text>

                    {
                        this.state.value.map(( element, index ) =>
                            <View style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                                <Text>{index} {element.announce_name} {element.quantity} {element.annount}</Text>
                                <Button
                                    onPress={() => this.removeItemByIndexSession(index)}
                                    title="X"
                                    color="#A0545B"
                                />
                            </View>
                        )

                    }
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                    <Button
                        onPress={() => this.addCart()}
                        title="Add Annonce"
                        color="#841584"
                    />
                    <Button
                        onPress={() => this.pushCart()}
                        title="Add other Annonce"
                        color="#841584"
                    />
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                        <Button
                          onPress={() => this.destroyCart()}
                          title="Supprimer Panier"
                          color="#841584"
                        />
                        <Button
                            onPress={() => console.log(this.state.value)}
                            title="get Annonce"
                            color="#841584"
                        />
                    </View>
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