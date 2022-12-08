import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const SingleEventView = () => {
    const navigate = useNavigate()
    //useLocation is taking the props/state we passed in from our navigate function (HomeMap.js: line 39)
    const location = useLocation()
    //location.state holds all of our single event data, therefore we define it to make it easier to refer to.
    const event = location.state
    console.log("This is the state we have passed in from the Marker we have clicked", location.state)
    const { name, category, headcount, startTime, endTime, description } = event

    const libraries = ["places"]
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBGp2IIHledlGmrdnK8M7x7QMn3GE6uiIg",
        libraries: libraries,
    })
    if (!isLoaded) return (<div>Loading...</div>)
    console.log(event)
    return(
        <div>
             <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
            <h1>Event: {name}</h1>
            <h2>Description:{description}</h2>
            <h2> # of People: {headcount}</h2>
            <h2>Start:{startTime}</h2>
            {/* <h2>End:{endTime}</h2> */}
            <h2>Activity:{category ? category.map(cat => (
                <p key={cat}>{cat}</p>
            )): <p>n/a</p>}</h2> 
            <GoogleMap zoom={60} center={{lat: event.location.lat, lng: event.location.lng}} mapContainerClassName="map-container">
            <MarkerF position={{lat: event.location.lat, lng: event.location.lng}} icon={event.icon}></MarkerF>
        </GoogleMap>
        </div>
    )
}

export default SingleEventView