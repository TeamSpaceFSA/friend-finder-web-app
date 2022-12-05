import React from "react";
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";




const HomeMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBGp2IIHledlGmrdnK8M7x7QMn3GE6uiIg"
    })


    if (!isLoaded) return (<div>Loading...</div>)

    return (
        <>
        <div>Here is the map!</div>
        <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container">
            <MarkerF position={{lat: 44.352152, lng: -80.526216}} icon="https://i.imgur.com/OX3qSvl.png"></MarkerF>
        </GoogleMap>
        </>
    )
}





export default HomeMap