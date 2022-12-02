import React from "react";
import { auth } from "../FirebaseConfig";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate()
    const logout = async () => {
        await signOut(auth)
       navigate("/signin")
     }
    return(
        <div>
            <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
            <div>Notifications</div>
            <div>Chat Log</div>
            <Link to="/help"><div>Help</div></Link>
            <Link to="/suggestions"><div>Suggestions</div></Link>
            <Link to="/about"><div>About</div></Link>
            <button onClick={logout}>Logout</button>
        </div>
    )

}

export default Settings