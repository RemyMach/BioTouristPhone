import React from 'react'
// import {ActivityIndicator, AsyncStorage, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {StyleSheet, Text, FlatList, AsyncStorage, View, ActivityIndicator, SafeAreaView} from 'react-native'
import Constants from "expo-constants";
import {postRequest} from "../API/BioTouristAPI";
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
        this.getSessionAndCurrentStatus();
    }


    async getSessionAndCurrentStatus(){
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
        const current_status = this.state.current_status.status_user_label
        const user = this.state.user
        if(current_status === 'Tourist' || current_status === 'Controller'){
            this._selectFavorites(user)
        }
    }

    _selectFavorites(user){
        let data = {
            'api_token': user.api_token,
            'idUser': user.idUser,
        }
        postRequest('favori/showFavorisOfAUser',data).then(
            response =>
            console.log(response.data.favoris)
            // this.setState({
            //     data : response.data.favoris,
            //     status : response.data.status,
            //     loading: false
            //     }
            // )
            // response => this.state.data = response.data.favoris
        )
            if (this.state.data !== 'undefined'){
              this.displayConversations()
            }
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    displayConversations(){
        console.log('prout')
        console.log(this.state.data)


        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.announce_name} ${item.announce_price}`}
                            subtitle={item.announce_comment}
                            avatar={ item.announce_img }
                        />
                    )}
                />
            </SafeAreaView>
        )
    }

    render() {
        if (this.state.loading === true) {
            return (
                <View style={styles.loading}>
                    {this._displayLoading()}
                </View>
            )
        } else {
            return (
                <View style={styles.content_1}>
                   {this.getFavorites()}
                   <Text>Remy la grosse tarlouuuuuzeee</Text>
                </View>
            )
        }
    }

}

export default Favorites