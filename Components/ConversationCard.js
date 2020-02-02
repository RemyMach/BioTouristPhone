import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Constants from "expo-constants";

class ConversationCard extends React.Component {

    constructor(props)
    {
        super(props)

    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Messages',{conversation: this.props.conversation, currentStatus: this.props.currentStatus})}
            >
            <View style={styles.content_1}>
                <Text style={styles.user_name}> {this.props.conversation[0].user_name} {this.props.conversation[0].user_surname} </Text>
                <View style={styles.content_2}>
                    <View style={styles.announce_subject}>
                        <Text style={styles.font}> {this.props.conversation[0].Announce_name} </Text>
                    </View>
                    <View style={styles.chevron}>
                        <Image
                            source={require('../Images/right-arrow.png')}
                            style={styles.icon}
                        />
                    </View>
                </View>
                <Text style={styles.date}>{this.props.conversation[0].message_date}</Text>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        margin: 10,
        flex:1,
        borderWidth: 2,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#D4EDDA',
    },
    content_2 : {
        margin: 10,
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        padding: 10,
        backgroundColor: '#D4EDDA',
    },
    icon: {
        width: 25,
        height: 25
    },
    chevron: {
        flex:1,
        alignItems: 'flex-end',
    },
    font: {
        color: 'grey',
        fontFamily: 'cereal-medium'
    },
    announce_subject: {
        flex: 1,
        alignItems: 'flex-end',
    },
    user_name: {
        borderBottomWidth: 1,
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

export default ConversationCard