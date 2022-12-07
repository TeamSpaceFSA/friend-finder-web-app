import React from "react";

const SingleEventView = ({singleEvent}) => {
    
    console.log("This is our passed prop singleEvent:", singleEvent)
    return(
        <div>
            <h1>This is the single event view</h1>
        </div>
    )
}

export default SingleEventView