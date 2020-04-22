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
import Cart from '../Components/Cart'
import Payment from '../Components/Payment'
import Login from '../Components/Login'
import MyInformations from "../Components/MyInformations"
import MyPassword from "../Components/MyPassword"
import Conversations from "../Components/Conversations"
import Messages from "../Components/Messages";

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

const CartStackNavigator = createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: {
            headerShown: false
        }
    },
    Payment: {
        screen: Payment,
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
    MyInformations: {
        screen: MyInformations,
        navigationOptions: {
            title: '',
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0
            }

        }
    },
    MyPassword: {
        screen: MyPassword,
        navigationOptions: {
            title: '',
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0
            }
        }
    },
    Conversations: {
        screen: Conversations,
        navigationOptions: {
            title: 'Conversations',
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0
            }
        }
    },
    Messages: {
        screen: Messages,
        navigationOptions: {
            title: '',
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0
            }
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
        Cart: {
            screen: CartStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/shopping_cart.png')}
                        style={styles.icon}
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
        },
       /* lazy: false*/
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(AppTabNavigator);