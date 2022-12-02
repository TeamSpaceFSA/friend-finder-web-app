import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth"
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading, error] = useAuthState(auth)

    const navigate = useNavigate()
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/home");
    }, [user, loading])

    const logIn = async() => {
        try{
          await signInWithEmailAndPassword(auth, email, password)
        }catch(err){
          console.log(err)
          alert("Incorrect Email and/or Password. Please try again")
        }
      }
    return (
        <div>
            <h1>Email:</h1>
            <input type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <h1>Password:</h1>
            <input type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button onClick={()=>logIn}>Sign In</button>
                <h1>Don't have an account?<Link to="/">Sign Up</Link> </h1>
        </div>
    )
}

export default SignIn