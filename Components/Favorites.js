import React from 'react'
import { StyleSheet, Text } from 'react-native'

class Favorites extends React.Component {

    render() {
        return (
            <Text style={styles.content_1}> The Favorites page </Text>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : 20
    }
})

export default Favorites