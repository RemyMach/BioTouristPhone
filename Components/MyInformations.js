import {Button, StyleSheet, View, Text} from "react-native";
import {Icon, Input} from "react-native-elements";
import React from "react";
import Constants from "expo-constants";

class MyInformations extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            myInformation: false,
            modificationPassword: false,
        }

    }

    updateProfile(){

    }

    render() {
        return (
            <View>
                <Input
                    placeholder='Name'
                    rightIcon={
                        <Icon
                            name='insert-emoticon'
                            size={20}
                            color='black'
                        />
                    }
                    defaultValue={''}
                />
                <Input
                    placeholder='Surname'
                    rightIcon={
                        <Icon
                            name='insert-emoticon'
                            size={20}
                            color='black'
                        />
                    }
                    defaultValue={''}
                />
                <Input
                    placeholder='email'
                    rightIcon={
                        <Icon
                            name='email'
                            size={20}
                            color='black'
                        />
                    }
                    defaultValue={''}
                />
                <Input
                    placeholder='Postal Code'
                    rightIcon={
                        <Icon
                            name='portrait'
                            size={20}
                            color='black'
                        />
                    }
                    defaultValue={''}
                />
                <Input
                    placeholder='Phone'
                    rightIcon={
                        <Icon
                            name='portrait'
                            size={20}
                            color='black'
                        />
                    }
                    defaultValue={''}
                />
                <View style={styles.button}>
                    <Button color={'#344941'}
                            title={"modifier"}
                            onPress={() => this.updateProfile()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content_1 : {
        marginTop : Constants.statusBarHeight,
        margin: 5,
        flex:1,
        justifyContent: 'center',
    },
    textinput : {
        margin: 5,
        borderWidth: 1,
        borderColor: '#afafaf',
        borderRadius: 4,
        height: 50,
        paddingLeft: 5,
    },
    button: {
        width: 100,
        margin: 5,
        fontFamily: 'Montserrat'
    },
    alert: {
        margin: 5,
        backgroundColor: '#F8D7D9',
        color: '#86383F',
        borderRadius: 4,
        height: 50,
        textAlign: 'center'
    }
})

export default MyInformations