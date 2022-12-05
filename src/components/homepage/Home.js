import React from "react";
import { auth } from "../../app/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { HomeMap } from '../index';
import { Navbar } from '../index'

const Home = () => {
    return(
        <div>
            <HomeMap />
            <Navbar/>
            Welcome!
        </div>
    )
}

export default Home