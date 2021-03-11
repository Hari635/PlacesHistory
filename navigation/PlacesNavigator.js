import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from "react-native";
import PlacesListScreen from "../Screens/PlacesListScreen";
import PlaceDetailScreen from "../Screens/PlaceDetailScreen";
import NewPlaceScreen from "../Screens/NewPlaceScreen";
import MapScreens from "../Screens/MapScreens";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PlacesNavigator=createStackNavigator({
    Places:PlacesListScreen,
    PlaceDetail:PlaceDetailScreen,
    NewPlace:NewPlaceScreen,
    Map:MapScreens
},
{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS==='android'?Colors.primary:''
        },
        headerTintColor:Platform.OS ==='android'?'white':Colors.primary
    }
}
)

export default createAppContainer(PlacesNavigator)