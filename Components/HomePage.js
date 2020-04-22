import React from 'react'
import { Text,StyleSheet, View, Button, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage, Alert, Image, ImageBackground, ScrollView, Platform, FlatList } from 'react-native'
import Constants from 'expo-constants'
import { ListItem, Input, Icon } from 'react-native-elements'
import MyInformations from "./MyInformations";
import { postRequest } from '../API/BioTouristAPI'
import { ADMIN_API_TOKEN } from 'react-native-dotenv'
import { ADMIN_API_ID } from 'react-native-dotenv'
import {NavigationActions, StackActions} from "react-navigation";
import styled from 'styled-components'

class HomePage extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
        loading: false,
        user: undefined
    }
  }

componentDidMount() {
  this.announces();
}
  announces() {
    let data = {
      'api_token': ADMIN_API_TOKEN,
      'idUser': ADMIN_API_ID,
    }
    postRequest('announce/all',data).then(response =>
        this.setState({
                data : response.data.Announce,
                status : response.data.status,
                loading: true
            }
        ))
  }

    render() {
      if (this.state.loading == true) {
        var cards = [];
        var x = 0;
        const announces = this.state.data;
        const length = announces.length;


        for(let i = 0; i < length; i++){
          cards.push(
            <View key = {i}>
              <View style={styles.card}>
                <View style={styles.cardLeft}>
                  <Text style={styles.titleCard}> {announces[i].announce_name} </Text>
                  <Text style={styles.city}> {announces[i].announce_city} </Text>
                  <Text style={styles.city}> {announces[i].announce_price} </Text>
                  <Text style={styles.city}> {announces[i].announce_quantity} </Text>
                  <Text style={styles.city}> {announces[i].announce_lot} / {announces[i].announce_measure} </Text>
                </View>
                <View style={styles.cardRight}>
                  <Button
                    onPress={()=> this.addToCart()}
                    title="Add to cart"
                  />
                </View>
              </View>
            </View>
          )
        }

          return (
                <View style={styles.MainContainer}>
                  <ImageBackground source={require('../Images/background.jpg')} style={styles.image}>
                    <Text style={styles.title}> HEALTHY'S </Text>
                    <ScrollView>
                      {cards}
                    </ScrollView>
                  </ImageBackground>
                </View>
          )
      }
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    MainContainer : {
        flex: 1,
    },
    image : {
      flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    cardLeft : {
      flex: 1,
    },
    cardRight : {
      flex: 1,
    },
    title : {
      fontWeight: '900',
      fontSize: 30,
      marginBottom: 20,
      marginTop: 20,
      textAlign: 'center',
      marginTop : Constants.statusBarHeight
    },
    titleCard : {
      fontWeight: '600',
      fontSize: 24,
    },
    card : {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      height: 100,
      width: null,
      margin: 5,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 1,
    },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      justifyContent: 'center',
    }
})

export default HomePage
