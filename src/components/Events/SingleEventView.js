import React from "react";
import {useLocation} from 'react-router-dom';

const SingleEventView = () => {
    //useLocation is taking the props/state we passed in from our navigate function (HomeMap.js: line 39)
    const location = useLocation()
    //location.state holds all of our single event data, therefore we define it to make it easier to refer to.
    const event = location.state
    console.log("This is the state we have passed in from the Marker we have clicked", location.state)

    
    return(
        <div>
            <h1>This is the single event view</h1>
            <h1>Name: {event.name}</h1>
        </div>
    )
}

export default SingleEventView