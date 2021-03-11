import React,{useEffect} from "react";
import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector,useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from '../store/places-action';

const PlacesListScreen = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);
    const places = useSelector((state) => {
        return (state.places.places)
    })
    return (
        <FlatList data={places} keyExtractor={(item) => {
            return (item.id)
        }} renderItem={(itemData) => {
            return (
                <PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={itemData.item.address}
                    onSelect={() => {
                        return (
                            props.navigation.navigate('PlaceDetail', { placeTitle: itemData.item.title })
                        )
                    }} />)
        }} />
    )
}

PlacesListScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Places',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item
                        title="Add Place"
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                        onPress={() => {
                            navData.navigation.navigate('NewPlace')
                        }} />

                </HeaderButtons>)
        }
    }
}

const style = StyleSheet.create({})

export default PlacesListScreen;