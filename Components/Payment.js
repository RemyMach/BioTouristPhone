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
    SafeAreaView, TextInput,
} from 'react-native'
import Cart from './Cart'
import Constants from "expo-constants";
import {NavigationActions, StackActions} from "react-navigation"
import {ADMIN_API_ID, ADMIN_API_TOKEN} from "react-native-dotenv";
import {postRequest} from "../API/BioTouristAPI";

class Payment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null,
        }
        this.getCart()
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

    getCart() {
        this.getSessionValueDependingOnKey('cart')
    }

    _paymentcall(){
        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': this.state.idUser,
            'idAnnounce': this.state.value.map((element) => element.idannounce),
            'quantityorderannounce': this.state.value.map((element) => element.quantity),
            'announcesammount': this.state.value.map((element) => element.ammount),
        }
        console.log(data)
        postRequest('payment/stripe',data).then(response =>
            this.setState({
                    data : response.data,
                    status : response.data.status,
                }, () => {
                console.log(this.state.data)
                    console.log(this.state.status)
                }
            ))
    }

    async test() {
        var data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': this.state.idUser,
            'idAnnounce': this.state.value.map((element) => element.idannounce),
            'quantityorderannounce': this.state.value.map((element) => element.quantity),
            'announcesammount': this.state.value.map((element) => element.ammount),
        };
        try {
            console.log("ok")
            let response = await fetch(
                "http://api.biotourist.space:8001/api/payment/stripe",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            if (response.status >= 200 && response.status < 300) {
                alert("authenticated successfully!!!");
            }
            console.log(response.status)
        } catch (errors) {
            console.log("okkkk")
            alert(errors);
        }
    }

    handleChange = (text) => {
        let textTemp = text;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0];
            } else if (this.state.text.length === 1) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        this.setState({text: textTemp})
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={{flex: 2}}>
                    <Text style={styles.content_1}>Paiement</Text>
                    <Text style={styles.content_3}>Informations de Paiement</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,marginLeft: 10, marginRight:10}}
                        placeholder='Name'
                        ref='Name'
                        onChangeText={(text) => this.state.name}
                    />
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,marginLeft: 10, marginRight:10}}
                        placeholder='Card number'
                        ref='Card Number'
                        keyboardType = 'numeric'
                        onChangeText={(text) => this.state.numcard}
                        maxLength={16
                        }
                    />
                <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row',marginLeft: 10, marginRight:10}}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,}}
                        placeholder='Exp Date'
                        keyboardType={'numeric'}
                        onChangeText={this.handleChange}
                        value={this.state.text}
                        maxLength={5}
                    />
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,}}
                        placeholder='CVC'
                        ref='CVC'
                        keyboardType = 'numeric'
                        maxLength={8}
                        onChangeText={(text) => this.state.cvc}
                    />
                </View>
                </View>
                <View style={styles.paiementButton}>
                    <Button
                        onPress={() => this._paymentcall()}
                        title="Payer"
                        textcolor="gray"
                    />
                </View>
            </SafeAreaView>
        )
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
        justifyContent: 'center',
        alignSelf: 'center'
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


export default Payment