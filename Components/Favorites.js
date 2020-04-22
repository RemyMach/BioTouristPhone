import React from 'react'
// import {ActivityIndicator, AsyncStorage, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {StyleSheet, Text, FlatList, AsyncStorage, View, ActivityIndicator, SafeAreaView} from 'react-native'
import Constants from "expo-constants";
import {postRequest} from "../API/BioTouristAPI";
import FavoritesCard from "./FavoritesCard";
import { NavigationEvents } from "react-navigation";
import ConversationCard from "./ConversationCard";

const styles = StyleSheet.create({
    content_1: {
        paddingTop: Constants.statusBarHeight,
        marginRight: 5,
        marginLeft: 5,
        flex: 1,
        backgroundColor: 'white'
    },
    list: {
        flex: 1
    }
});

class Favorites extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            user: undefined,
            current_status: undefined,
            data: undefined
        }

    }
    componentDidMount() {
        console.log('je passe dans didmount')
        console.log(this.state.user)
        this.getSessionAndCurrentStatus();
    }


    async getSessionAndCurrentStatus(){
        console.log('getsession')
        try{
            const user = await AsyncStorage.getItem('user').then(result => result);
            const current_status = await AsyncStorage.getItem('user_current_status').then(result => result);
            this.setState({
                user: JSON.parse(user),
                current_status: JSON.parse(current_status),
            },() => this.getFavorites())
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    getFavorites(){
        console.log('getFavorites')
        //console.log(this.state.user)
        if(this.state.user !== null){
            const user = this.state.user
            const current_status = this.state.current_status.status_user_label
            if(current_status === 'Tourist' || current_status === 'Controller'){
                this._selectFavorites(user)
            }
        }
        this.setLoadingFalseAfterRefresh()
    }

    setLoadingFalseAfterRefresh(){

        this.setState({
            loading: true
        })
    }

    _selectFavorites(user){
        console.log('je passe dans le _selectFavorites')
        let data = {
            'api_token': user.api_token,
            'idUser': user.idUser,
        }
        postRequest('favori/showFavorisOfAUser', data).then(
            response => this.setState({
                data : response.data.favoris,
                status : response.data.status,
                loading: false
                })
        )
        if (this.state.data != 'undefined'){
            this.displayFavorites()
        }
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
                <NavigationEvents
                    onWillFocus={() => {
                        this.componentDidMount()
                    }}
                />
            </View>
        )
    }

    displayFavorites(){

        return (
            <SafeAreaView>
                <NavigationEvents
                    onWillFocus={() => {
                        this.componentDidMount()
                    }}
                />
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.idFavori.toString()}
                    renderItem={({ item, index }) => (
                        <FavoritesCard
                            dataUser={this.state.user}
                            favorite={item}
                            navigation={this.props.navigation}
                            currentStatus={this.state.current_status}
                        />
                    )}
                />
            </SafeAreaView>
        )
    }

    render() {
        console.log('loading ' + this.state.loading)
        console.log('--------------------------')
        if (this.state.loading === true) {
            return (
                <View style={styles.loading}>
                    {this._displayLoading()}
                </View>
            )
        } else {
            return (
                <View style={styles.content_1}>
                   <Text>Remy la grosse tarlouuuuuzeee</Text>
                   {this.displayFavorites()}
                </View>
            )
        }
    }

}

export default Favorites