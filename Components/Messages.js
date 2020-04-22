import React from 'react'
import {ActivityIndicator, AsyncStorage, StyleSheet, Text, View, FlatList, TextInput, Button,ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import Constants from "expo-constants";
import UniqueMessage from "./UniqueMessage";
import {postRequest} from "../API/BioTouristAPI";
import {NavigationActions, StackActions} from "react-navigation";

class Messages extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: undefined,
            current_status: undefined
        }
        this.message = ""
    }

    componentDidMount() {
        this.getSessionValueDependingOnKey('user')
    }

    async getSessionValueDependingOnKey(key){
        try{
            const value = await AsyncStorage.getItem(key).then(result => result);
            this.setState({
                user: JSON.parse(value),
                loading: false,
                current_status: this.props.navigation.state.params.currentStatus.status_user_label
            })
        }catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    storeMessage(){
        let data = {
            'api_token': this.state.user.api_token,
            'idUser': this.state.user.idUser,
            'message_content': this.message,
            'idAnnounce': this.props.navigation.state.params.conversation[0].Announces_idAnnounce
        }
        if(this.state.current_status === 'Seller'){
            data.idInterlocutor=this.props.navigation.state.params.conversation[0].Users_idUser
        }
        postRequest('message/store',data).then(response =>
            this.updateViewIfResponseSuccess(response)
        )
    }

    updateViewIfResponseSuccess(response){
        if(response.data.status === '200'){
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 1,
                    key: null,
                    actions: [
                        NavigationActions.navigate({ routeName: 'ProfileContent' }),
                        NavigationActions.navigate({ routeName: 'Conversations' }),
                        NavigationActions.navigate({ routeName: 'Messages' }),

                    ]
                }))
        }else if(response.data.status === '400'){
            console.log(response.data)
            this.setState({
                status: response.data.status,
                data: response.data
            })
        }
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    displayMessagesFromConversation(){
        let messages = this.props.navigation.state.params.conversation.slice().reverse()

        return (
            <FlatList
                data={messages}
                keyExtractor={item => item.idMessage.toString()}
                renderItem={
                    ({item}) =>
                    <UniqueMessage
                        user={this.state.user}
                        message={item}
                    />
                }
                />
        )
    }

    _displayFailedStoreMessage(){

        if(this.state.status === '400') {
            var array = []
            if(this.state.data.error){

                for(var variable in this.state.data.error) {
                    array.push(`${this.state.data.error[variable]}`)
                    array.map(value => console.log(value))
                }
                return (
                    <View style={ styles.contentAlert }>{array.map(value => <Text style={styles.alert}>-{value}{'\n'} </Text>)}</View>
                )
            }
            return (
                <View style={ styles.contentAlert }><Text style={styles.alert}>{this.state.data.message}</Text></View>
            )
        }
    }


    render() {
        if(this.state.loading === true){
            return  (
                <View style={styles.loading}>
                    {this._displayLoading()}
                </View>
            )
        }else {
            return (
                    <KeyboardAvoidingView
                        style={styles.keyboardAvoidingView}
                        behavior="padding"
                        keyboardVerticalOffset = {70}
                    >
                        {this._displayFailedStoreMessage()}
                        <View style={styles.content_1}>
                            <View>
                                {this.displayMessagesFromConversation()}
                            </View>
                            <View style={styles.textInput}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.handleMessage(text)}
                                    placeholderTextColor='white'
                                    underlineColorAndroid='transparent'
                                />
                                <Button title={'send'} onPress={() => this.storeMessage()} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
            )
        }
    }

    handleMessage(text){
        this.message = text
    }
}

const styles = StyleSheet.create({
    content_1 : {
        flex:1,
        backgroundColor: 'white',
    },
    input: {
        borderWidth: 2,
        padding: 2,
        backgroundColor: '#ffffff'
    },
    textInput:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    keyboard: {
        position: 'absolute', left: 0, right: 0, bottom: 0
    },
    keyboardAvoidingView: {
        flex:1
    }
})

export default Messages