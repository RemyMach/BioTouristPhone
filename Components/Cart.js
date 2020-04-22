import React from 'react'
import {
    AsyncStorage,
    Button,
    StyleSheet,
    Text,
    View,
    Alert,
    ImageBackground,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import Constants from "expo-constants";
import {NavigationActions, StackActions} from "react-navigation"

class Cart extends React.Component {

    constructor(props) {
        super(props)
        this.getCart()
        this.temporary = {
            idannounce: "",
            announce_name: "",
            quantity: "",
            ammount: "",
        }
        this.state = {
            loading: true,
            value: null,
        }


    }

    async getSessionValueDependingOnKey(key) {
        try {
            const value = await AsyncStorage.getItem(key).then(result => result);
            this.setState({
                value: JSON.parse(value),
                loading: false
            })
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async pushDataInSession() {
        try {
            const productToBeSaved = {
                idannounce: this.temporary.idannounce,
                announce_name: this.temporary.announce_name,
                quantity: this.temporary.quantity,
                max: this.temporary.max,
                ammount: this.temporary.ammount
            }
            const existingProducts = await AsyncStorage.getItem("cart")
            let newProduct = JSON.parse(existingProducts);
            if (!newProduct) {
                newProduct = []
            }
            newProduct.push(productToBeSaved)
            AsyncStorage.setItem("cart", JSON.stringify(newProduct))
            this.getCart('cart')
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async removeItemByIndexSession(index) {
        try {
            var session = this.state.value
            var deletedindex = index
            let sessions = session.filter((element, index) => element && index !== deletedindex)
            if (sessions[0] == undefined) {
                await AsyncStorage.removeItem('cart')
            } else {
                await AsyncStorage.setItem('cart', JSON.stringify(sessions));
            }
            this.getCart('cart')
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }

    }

    async removeItemSession() {
        try {

            const value = await AsyncStorage.removeItem('cart')

            this.setState({
                value: JSON.parse(value),
                loading: false
            })
            this.getCart()
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    async cartUpQuantity(key) {
        console.log(this.state.value[key].quantity)
        if (this.state.value[key].quantity === this.state.value[key].max) {

            Alert.alert(
                'Biotourist',
                'You have the max quantity of this announce')
        } else {
            this.state.value[key].quantity = this.state.value[key].quantity + 1
            console.log(this.state.value[key].quantity)
            let session = this.state.value
            await AsyncStorage.setItem('cart', JSON.stringify(session));
            this.getCart()
        }
    }

    async cartDownQuantity(key) {
        console.log(this.state.value[key].quantity)
        if (this.state.value[key].quantity === 1) {
            let index = key
            this.removeItemByIndexSession(index)
        } else {
            this.state.value[key].quantity = this.state.value[key].quantity - 1
            console.log(this.state.value[key].quantity)
            let session = this.state.value
            await AsyncStorage.setItem('cart', JSON.stringify(session));
            this.getCart()
        }
    }

    goToCheckout() {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({routeName: 'Payment'})]
            }))
    }

    getCart() {
        this.getSessionValueDependingOnKey('cart')
    }

    pushCart() {
        this.pushDataInSession();
        this.getCart('cart')
    }

    destroyCart() {
        this.removeItemSession()
    }

    product1() {
        this.temporary.idannounce = 1
        this.temporary.announce_name = "Pomme"
        this.temporary.quantity = 3
        this.temporary.max = 4
        this.temporary.ammount = 20.5
        this.pushCart()
    }

    product2() {
        this.temporary.idannounce = 2
        this.temporary.announce_name = "Banane"
        this.temporary.quantity = 4
        this.temporary.max = 10
        this.temporary.ammount = 2.5
        this.pushCart()
    }

    product3() {
        this.temporary.idannounce = 3
        this.temporary.announce_name = "Pêche"
        this.temporary.quantity = 1
        this.temporary.max = 3
        this.temporary.ammount = 10
        this.pushCart()
    }

    product4() {
        this.temporary.idannounce = 4
        this.temporary.announce_name = "Poire"
        this.temporary.quantity = 5
        this.temporary.max = 25
        this.temporary.ammount = 4.5
        this.pushCart()
    }

    render() {
        if (this.state.value === null) {
            return (

                <ImageBackground source={require('../Images/multifruit.jpg')} style={background.content_1}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>

                        <Text style={styles.content_1}>Cart</Text>
                        <Text style={styles.content_1}>Cart is empty</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
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
            )
        } else {
            return (
                <SafeAreaView style={styles.container}>

                    <View style={{flex: 2}}>
                        <Text style={styles.content_1}>Cart</Text>
                        <View style={styles.categorie}>
                            <Text style={{fontSize: 20}}>Name</Text>
                            <Text style={{fontSize: 20}}>Quantity</Text>
                            <Text style={{fontSize: 20}}>Price</Text>
                        </View>
                        <ScrollView>
                            {
                                this.state.value.map((element, index) =>
                                    <View style={styles.content_2}>
                                        <View style={styles.content_3}>
                                            <Text style={{fontSize: 30}}>{element.announce_name} </Text>
                                            <Text style={{fontSize: 30}}>{element.ammount * element.quantity}$ </Text>
                                        </View>
                                        <View style={{
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}>
                                            <Button
                                                onPress={() => this.cartDownQuantity(index)}
                                                //source={require('../Images/less.svg')}/>
                                                title='-'

                                            />
                                            <Text style={{fontSize: 30, textAlign: 'center'}}>{element.quantity}</Text>
                                            <Button
                                                onPress={() => this.cartUpQuantity(index)}
                                                //source={require('../Images/plus.svg')}/>
                                                title='+'
                                            />
                                        </View>
                                        <Button
                                            onPress={() => this.removeItemByIndexSession(index)}
                                            title="Remove"
                                            color="#A0545B"
                                        />
                                    </View>
                                )
                            }
                        </ScrollView>
                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                            <Button
                                onPress={() => this.product2()}
                                title="Product2"
                                color="#000000"
                            />
                            <Button
                                onPress={() => this.product3()}
                                title="Product3"
                                color="#000000"
                            />
                            <Button
                                onPress={() => this.product4()}
                                title="Product4"
                                color="#000000"
                            />
                            <Button
                                onPress={() => this.destroyCart()}
                                title="Supprimer Panier"
                                color="#000000"
                            />
                        </View>
                        <View style={styles.paiementButton}>
                            <Button
                                onPress={() => this.goToCheckout()}
                                title="Payer"
                                textcolor="gray"
                            />
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    content_1: {
        marginTop: 5,
        fontSize: 60,
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        color: 'grey',
        fontFamily: 'cereal-medium'

    },
    content_2: {
        paddingLeft: 2,
        borderWidth: 0.1,
        borderRadius: 6,
        backgroundColor: "#DCDCDC",
        marginTop: 5,
        marginHorizontal: 1,

    },
    content_3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    categorie: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paiementButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.25,
        borderRadius: 6,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        backgroundColor: "#FBBE33",
        overflow: 'hidden',
        opacity: 0.8,
    }
});

const background = StyleSheet.create({
    content_1: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
    },
});

export default Cart