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
            <View style={styles.content_1}>
                <Text style={styles.user_name}>{this.props.favorite.announce_name} {this.props.favorite.announce_price}$</Text>
                <View>
                    <Text style={styles.announce_subject}>
                        {this.props.favorite.announce_city}
                    </Text>
                    <Text style={styles.announce_subject}>
                        {this.props.favorite.announce_adresse}
                    </Text>
                </View>
                <View>
                    <Text style={styles.announce_subject}>
                        {this.props.favorite.announce_comment}
                    </Text>
                </View>
                <View style={styles.content_2}>
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

export default FavoritesCard