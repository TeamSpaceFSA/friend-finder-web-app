import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../../app/FirebaseConfig"
import { collection, query, getDocs, where, addDoc, setDoc, doc } from "firebase/firestore";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    const [ user, loading ] = useAuthState(auth)
    useEffect(() => {
        if (user) {
            navigate("/home")};
    }, [user])

    const regSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username,
                email,
                password
            })
            navigate("/setupprofile")
        } catch (err) {
            console.log(err)
            toast.error('Unable to sign up. Please try again', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
    const googleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            const user = res.user
            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    phoneNum: user.phoneNumber
                })
            }
            navigate("/home")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Friend Finder App</h1>
            <div>
                <h1>Username:</h1>
                <input type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <h1>Email:</h1>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <h1>Password:</h1>
                <input type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={regSignUp}>Sign Up</button>
            </div>
            <h1>Or</h1>
            <button onClick={googleSignIn}>Sign Up with Google</button>
            <h2>Already have an account? <Link to="/signin">Sign In</Link> </h2>
        </div>
    )
}

export default SignUp