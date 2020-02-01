import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from "expo-constants";

class ConversationCard extends React.Component {

    constructor(props)
    {
        super(props)

    }

    render() {
        return (
            <View>
                <Text style={styles.content_1}> {this.props.conversation.idMessage} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight
    },
})

export default ConversationCard