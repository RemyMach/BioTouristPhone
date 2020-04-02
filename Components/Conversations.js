import React from 'react'
import {StyleSheet, Text, FlatList, AsyncStorage, View, ActivityIndicator, SafeAreaView} from 'react-native'
import Constants from "expo-constants";
import ConversationCard from "./ConversationCard";
import {ADMIN_API_ID, ADMIN_API_TOKEN} from "react-native-dotenv";
import {postRequest} from "../API/BioTouristAPI";

class Conversations extends React.Component {

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
            },() => this.getConversations())
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    getConversations(){
        const current_status = this.state.current_status.status_user_label
        const user = this.state.user
        if(current_status === 'Seller'){
            this._getConversationsForASeller(user)
        }else{
            console.log("messageGetConversations")
            this._getConversationsForTouristAndController(user)
        }

    }

    _getConversationsForASeller(user){
        let data = {
            'api_token': user.api_token,
            'idUser': user.idUser,
        }
        postRequest('message/showMessagesOfASeller',data).then(response =>
            this.setState({
                    data : response.data,
                    status : response.data.status,
                    loading: false
                }
            ))

    }

    _getConversationsForTouristAndController(user){
        console.log(user.api_token)
        console.log(user.idUser)
        console.log("user")
        let data = {
            'api_token': user.api_token,
            'idUser': user.idUser,
        }
        console.log("postRequest")
        postRequest('message/showMessagesOfATouristController',data).then(response =>
            this.setState({
                    data : response.data,
                    status : response.data.status,
                    loading: false
                })
            )

    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    displayConversationsIfUserHave(){
        console.log(this.state.data)
        console.log('on atten')
        if(this.state.status === '400'){
            return this.displayError()
        }else if(this.state.status === '200'){
            return this.displayConversations()
        }
    }

    displayError(){

        return (
            <View style={styles.content_1}>
                <Text>You have no message history</Text>
            </View>
        )
    }

    displayConversations(){

        const conversations = this.state.data.conversations
        return (
            <SafeAreaView >
                <FlatList
                    data={conversations}
                    keyExtractor={item => item[0].Announces_idAnnounce.toString()}
                    renderItem={
                        ({item, index}) =>
                            <ConversationCard
                                conversation={item}
                                numberConversation={index}
                                navigation={this.props.navigation}
                                currentStatus={this.state.current_status}
                            />

                    }
                />
            </SafeAreaView>
        )
    }


    render() {
        if(this.state.loading === true){
            return  (
                <View style={styles.loading}>
                    {this._displayLoading()}
                </View>
            )
        }else{
            return (
                <View style={styles.content_1}>
                    {this.displayConversationsIfUserHave()}
                </View>
            )
        }
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
    list: {
        flex: 1
    }
})

export default Conversations