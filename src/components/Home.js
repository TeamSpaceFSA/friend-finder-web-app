import React from "react";
import { auth } from "../FirebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate()
    const logout = async () => {
        await signOut(auth)
       navigate("/signin")
     }
    return(
        <div>Welcome!
            <button onClick={()=>logout}>Logout</button>
        </div>
    )
}

export default Home