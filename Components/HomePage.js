import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Constants from "expo-constants";

class HomePage extends React.Component {

    render() {
        return (
            <Text style={styles.content_1}> The Home page </Text>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight
    },
})

export default HomePage