import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';



const EditEvent = () => {
    const location = useLocation()

    const event = location.state

    const { name, category, headcount, startTime, description } = event
    
    console.log("This is the event we clicked on", event)
    
    return(
        <div>
            <h1>Event: {name}</h1>
            <h2>Description:{description}</h2>
            <h2> # of People: {headcount}</h2>
            <h2>Start:{startTime}</h2>
        </div>
    )
}

export default EditEvent