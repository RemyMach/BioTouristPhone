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
            this._getConversationsForTouristAndController(user)
        }

    }

    _getConversationsForASeller(user){
        console.log('pomme')
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

    _getConversationsForTouristAndController(){
        let data = {
            'api_token': ADMIN_API_TOKEN,
            'idUser': ADMIN_API_ID,
        }
        postRequest('message/showMessagesOfATouristController',data).then(response =>
            this.setState({
                    data : response.data,
                    status : response.data.status,
                    loading: false
                }
            ))

    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    displayConversationsIfUserHave(){
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
        //console.log('je passe dans la flatlist' + this.state.data.conversations[0])
        //console.log(this.DATA)
        const conversations = this.state.data.conversations[0]
        return (
            <SafeAreaView>
                <FlatList
                    data={conversations}
                    keyExtractor={item => item.idMessage.toString()}
                    renderItem={
                        ({item}) =>
                            <ConversationCard
                                conversation={item}
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
                <View>
                    {this.displayConversationsIfUserHave()}
                </View>
            )
        }
    }
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

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