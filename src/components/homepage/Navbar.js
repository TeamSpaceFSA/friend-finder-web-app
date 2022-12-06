import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <Link to="/home"><div>Map</div></Link>
            <div>My Event List</div>
            <div>Create Event</div>
            <Link to="/profile"><div>My Profile</div></Link>
           <Link to="/settings"><div>Settings</div></Link>
        </div>
    )

}

export default Navbar