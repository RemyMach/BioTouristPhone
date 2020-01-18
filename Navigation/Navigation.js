import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
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

/*const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'FavoriteFilms'
        }
    },
    FavoritesFilm: {
        screen: Favorites,
        navigationOptions: {
            title: 'FavoriteFilms2'
        }
    }
})

const AppTabNavigator = createBottomTabNavigator({
    HomePage: {
        screen: SearchStacknavigator
    },
    Favorites: {
        screen: FavoritesStackNavigator
    }
})*/

export default createAppContainer(SearchStackNavigator);