import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Favorites from '../Components/Favorites'
import HomePage from '../Components/HomePage'
import MyProfile from '../Components/MyProfile'
import ProfileContent from '../Components/ProfileContent'
import Register from '../Components/Register'
import Map from '../Components/Map'
import Login from '../Components/Login'


const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: HomePage,
        navigationOptions: {
            headerShown: false
        }
    }
});

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            headerShown: false
        }
    }
});

const MapStackNavigator = createStackNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            headerShown: false
        }
    }
})

const ProfileStackNavigator = createStackNavigator({
    ProfileContent: {
        screen: ProfileContent,
        navigationOptions: {
            headerShown: false
        }
    },
    MyProfile: {
        screen: MyProfile,
        navigationOptions: {
            headerShown: false
        }
    },
    login: {
        screen : Login,
        navigationOptions: {
            title:"login"
        }
    },
    register: {
        screen: Register,
        navigationOptions: {
            title:"register"
        }
    }
})

const AppTabNavigator = createBottomTabNavigator(
    {
        Search: {
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
        },
        Map: {
            screen: MapStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/map.png')}
                        style={styles.icon_map}
                    />
                }
            }
        },
        Profil: {
            screen: ProfileStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_tag_face.png')}
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
    },
    icon_map: {
        width: 25,
        height: 25
    }
})

export default createAppContainer(AppTabNavigator);