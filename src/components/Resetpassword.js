import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";


const Resetpassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    const resetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            setEmail("")
            alert("Password reset link sent")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={resetPassword}>Send reset link</button>
            </div>
            <h2 onClick={goBack}>Go Back</h2>
        </div>
    )

}

export default Resetpassword