import React from 'react'
import {Image, Button, Alert, SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Constants from "expo-constants";
import {postRequest} from "../API/BioTouristAPI";
import {NavigationActions, StackActions} from "react-navigation";


class FavoritesCard extends React.Component {

    constructor(props)
    {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.favorite.announce_name} {this.props.favorite.announce_price}$ {'\n'}
                </Text>
                <Text style={styles.dataAnnounce}>
                    {this.props.favorite.announce_adresse}
                    {this.props.favorite.announce_comment}
                    {this.props.favorite.announce_city}
                </Text>
                <View style={styles.button}>
                    <Button title="Delete" onPress={
                        () => postRequest('favori/destroy', {'api_token': this.props.dataUser.api_token, 'idUser': this.props.dataUser.idUser, 'idFavori': this.props.favorite.idFavori}).then(
                            () => this.props.navigation.dispatch(
                            StackActions.reset({
                            index: 0,
                            key: null,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Favorites' })
                            ]
                    }))
                        )
                    } />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16,
    },
    title: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 8,
    },
    dataAnnounce: {
        textAlign: 'center',
        marginVertical: 8,
    },
    button: {
        alignContent: 'flex-end',
        textAlign: 'right',
        justifyContent: 'space-between',
    },
})

export default FavoritesCard