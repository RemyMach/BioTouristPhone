import React from 'react'
import {ActivityIndicator, AsyncStorage, Button, StyleSheet, Text, View, Alert, ImageBackground} from 'react-native'
import Constants from "expo-constants";
import {NavigationActions, StackActions} from "react-navigation"

class Cart extends React.Component {

    constructor(props)
    {
        super(props)
        this.temporary = {
            idannounce: null,
            announce_name: null,
            quantity: null,
            ammount: null,
        }
        this.state = {
            loading: true,
            value: null,
        }


    }
    async getSessionValueDependingOnKey(key){
        try{
            const value = await AsyncStorage.getItem(key).then(result => result);
            this.setState({
                value: JSON.parse(value),
                loading: false
            })
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async pushDataInSession(){
        try {
            const productToBeSaved = {
                idannounce: this.temporary.idannounce,
                announce_name: this.temporary.announce_name,
                quantity: this.temporary.quantity,
                max: this.temporary.max,
                ammount:  this.temporary.ammount}
            const existingProducts = await AsyncStorage.getItem("cart")
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
            var deletedindex = index
            let sessions = session.filter((element , index) => element && index !== deletedindex)
            if (sessions[0] == undefined){
                await AsyncStorage.removeItem('cart')
            }
            else {
                await AsyncStorage.setItem('cart', JSON.stringify(sessions));
            }
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
            this.getCart()
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    getCart(){
        this.getSessionValueDependingOnKey('cart')
    }
    pushCart(){
        this.pushDataInSession();
        this.getCart('cart')
    }
    destroyCart(){
        this.removeItemSession()
    }

    product1(){
        this.temporary.idannounce = 1
        this.temporary.announce_name = "Pomme"
        this.temporary.quantity = 3
        this.temporary.max = 4
        this.temporary.ammount= 20.5
        this.pushCart()
    }
    product2(){
        this.temporary.idannounce = 2
        this.temporary.announce_name = "Bannane"
        this.temporary.quantity = 4
        this.temporary.max = 10
        this.temporary.ammount= 2.5
        this.pushCart()
    }

    product3(){
        this.temporary.idannounce = 3
        this.temporary.announce_name = "Péche"
        this.temporary.quantity = 1
        this.temporary.max = 3
        this.temporary.ammount= 10
        this.pushCart()
    }

    product4(){
        this.temporary.idannounce = 4
        this.temporary.announce_name = "Poire"
        this.temporary.quantity = 5
        this.temporary.max = 25
        this.temporary.ammount= 4.5
        this.pushCart()
    }

    render() {
        if (this.state.value === null){
        return (

            <ImageBackground source={require('../Images/multifruit.jpg')} style={background.content_1}>
                <View style={{justifyContent:'center',alignItems:'center'}}>

                    <Text style={styles.content_1}>Cart</Text>
                    <Text style={styles.content_1}>Cart is empty</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                    <Button
                        onPress={() => this.product1()}
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
                            <View style={styles.content_2}>
                                <Text>{element.announce_name} {element.quantity} {element.ammount * element.quantity}</Text>
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
                            onPress={() => this.product2()}
                            title="Product2"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.product3()}
                            title="Product3"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.product4()}
                            title="Product4"
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
        fontSize: 60,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        color: "#20232a",
        textAlign: "center",
        fontWeight: "bold"
        ,
    },
    content_2 : {
        backgroundColor: "#DCDCDC",
        marginTop : 5,
        width: 1000,
        height: 60,
        fontSize: 150,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        borderWidth: 0.1,
        borderRadius: 6,

    }
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