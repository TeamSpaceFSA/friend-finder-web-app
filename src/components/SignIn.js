import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, query, getDocs, where, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading] = useAuthState(auth)

    const navigate = useNavigate()
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/home")};
    }, [user, loading])

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser)
        } catch (err) {
            console.log(err)
            toast.error('Incorrect Email and/or Password. Please try again', {
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
                await addDoc(collection(db, "users"), {
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
            <div>
                <h1>Email:</h1>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <h1>Password:</h1>
                <input type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button onClick={logIn}>Sign In</button>
            </div>
            <div>
                <Link to="/resetpassword">Forgot password?</Link>
            </div>
            <div>
                <button onClick={googleSignIn}>Google Sign In</button>
            </div>
            <h1>Don't have an account?<Link to="/">Sign Up</Link> </h1>
        </div>
    )
}

export default SignIn