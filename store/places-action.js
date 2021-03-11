import { Title } from "native-base"
import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helper/db";
export const ADD_PLACES = "ADD_PLACES"
export const SET_PLACES = 'SET_PLACES';
import ENV from "../env";


export const addPlace = (title, imageUri,location) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            location.lat
            },${location.lng}&key=${ENV.googleApiKey}`
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if (!resData.results) {
            throw new Error('Something went wrong!');
        }

        const address = resData.results[0].formatted_address;

        if (imageUri === null) {
            dispatch({
                type: ADD_PLACES,
                placeData: { title: title, imageUri: null }
            })
        } else {
            const file = imageUri.split('/').pop()
            const newPath = FileSystem.documentDirectory + file
            try {
                await FileSystem.moveAsync({
                    from: imageUri,
                    to: newPath
                })
                const dbResult = await insertPlace(
                    title,
                    newPath,
                    address,
                    location.lat,
                    location.lng
                );
                console.log(dbResult);
                dispatch({
                    type: ADD_PLACES, placeData: {
                        id: dbResult.insertId, title: title, image: newPath, address: address,
                        coords: {
                            lat: location.lat,
                            lng: location.lng
                        }
                    }
                });

            } catch (err) {
                console.log(err);
                throw err
            }
        }
    }

}
export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};