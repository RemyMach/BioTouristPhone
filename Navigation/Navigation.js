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
    },
    HomePage: {
        screen: HomePage
    }
});

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'FavoriteFilms'
        }
    }
})

const AppTabNavigator = createBottomTabNavigator({
    HomePage: {
        screen: SearchStackNavigator
    },
    Favorites: {
        screen: FavoritesStackNavigator
    }
})

export default createAppContainer(AppTabNavigator);