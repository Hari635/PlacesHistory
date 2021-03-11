import React, { useState, useCallback } from "react";
import { Button, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-action";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {

    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedLocation, setSelectedLocation] = useState();


    const dispatch = useDispatch()

    const imageHandler = (uri) => {
        setSelectedImage(uri)
    }

    const savePlaceHandler = () => {
        if (selectedImage) {
            dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
        } else {
            dispatch(placesActions.addPlace(titleValue, null, selectedLocation))
        }

        props.navigation.goBack()
    }
    const titleChangeHandler = (text) => {
        setTitleValue(text)
    }

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);


    return (
        <ScrollView>
            <View style={styles.form} >
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler}
                    value={titleValue} />
                <ImagePicker onImageTaken={imageHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
                <Button title='Save Place' color={Colors.primary}
                    onPress={() => {
                        savePlaceHandler()
                    }} />
            </View>
        </ScrollView>
    )
}
NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}
const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    }
})

export default NewPlaceScreen;