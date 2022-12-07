import React from "react";
import {useLocation} from 'react-router-dom';

const SingleEventView = () => {
    //useLocation is taking the props/state we passed in from our navigate function (HomeMap.js: line 39)
    const location = useLocation()
    //location.state holds all of our single event data, therefore we define it to make it easier to refer to.
    const event = location.state
    console.log("This is the state we have passed in from the Marker we have clicked", location.state)
    const { name, category, headcount, startTime, endTime, description } = event
    
    return(
        <div>
            <h1>Event: {name}</h1>
            <h2>Description:{description}</h2>
            <h2> # of People: {headcount}</h2>
            <h2>Start:{startTime}</h2>
            <h2>End:{endTime}</h2>
            <h2>Activity:{category ? category.map(cat => (
                <p key={cat}>{cat}</p>
            )): <p>n/a</p>}</h2>
        </div>
    )
}

export default SingleEventView