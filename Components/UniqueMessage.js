import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Constants from "expo-constants";

class UniqueMessage extends React.Component {

    constructor(props)
    {
        super(props)

    }

    displayMessageDependingIdSender(){
        if(this.props.user.idUser === this.props.message.message_idSender){
            return this.displayUserConnectedMessage()
        }else{
            return this.displayInterlocutorMessage()
        }
    }

    displayUserConnectedMessage(){

        return (
            <View style={styles.content_1_User}>
                <View style={styles.header}>
                    <Text style={styles.user_name}> Me </Text>
                    <Text style={styles.date}> the {this.props.message.message_date}</Text>
                </View>
                <View style={styles.content_2}>
                    <View style={styles.announce_subject}>
                        <Text style={styles.font}> {this.props.message.message_content} </Text>
                    </View>
                </View>
            </View>
        )
    }

    displayInterlocutorMessage(){

        return (
            <View style={styles.content_1_interlocutor}>
                <View style={styles.header}>
                    <Text style={styles.user_name}> {this.props.message.user_name} {this.props.message.user_surname} </Text>
                    <Text style={styles.date}> the {this.props.message.message_date}</Text>
                </View>
                <View style={styles.content_2}>
                    <View style={styles.message_content}>
                        <Text style={styles.font}> {this.props.message.message_content} </Text>
                    </View>
                </View>
            </View>
        )
    }


    render() {
        return (
                <View>
                    {this.displayMessageDependingIdSender()}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    content_1_interlocutor : {
        margin: 10,
        flex:1,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#E2E3E5',
    },
    content_1_User : {
        margin: 10,
        flex:1,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#CCE5FF',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    content_2 : {
        margin: 10,
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        padding: 10,
    },
    icon: {
        width: 25,
        height: 25
    },
    font: {
        color: 'grey',
        fontFamily: 'cereal-medium'
    },
    message_content: {
        flex: 1,
    },
    user_name: {
        paddingLeft: 10,
        color: 'black',
        fontFamily: 'cereal-medium'
    },
    date: {
        color: 'grey',
        fontFamily: 'cereal-medium',
        paddingLeft: 10
    }
})

export default UniqueMessage