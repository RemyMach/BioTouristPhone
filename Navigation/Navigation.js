import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Favorites from '../Components/Favorites'
import HomePage from '../Components/HomePage'

const SearchStackNavigator = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: 'Home'
        }
    }
});

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'favorites Announces'
        }
    }
})


const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_search.png')}
                        style={styles.icon}
                    />
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_favorite.png')}
                        style={styles.icon}
                    />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',//couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF',//couleur d'arrière-plan des onglets non sélectionnés
            showLabel: true,//on masque les titres
            showIcon: true // on informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(AppTabNavigator);