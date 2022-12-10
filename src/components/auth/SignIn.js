import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../app/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/home");
    }
  }, [user, loading]);

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);
    } catch (err) {
      console.log(err);
      toast.error("Incorrect Email and/or Password. Please try again", {
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
  };

  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          phoneNum: user.phoneNumber,
        });
      }
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div >
        <div className="logIn">
        <img src="https://images.cooltext.com/5633399.png" alt="New Friends" style={{ height: "40px", width: "240px" }}/>

        <button className="logInGoogle" onClick={googleSignIn}>
          <img
            src="https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"
            alt=""
            style={{ height: "20px", width: "20px" }}
          />
          Sign In with Google
        </button> <div className="logIn-or">
          <div>__________</div>
          <div className="or">OR</div>
          <div>__________</div>
        </div>

      <div>
        <input
          type="text" placeholder="Email" size={30}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text" placeholder="Password" size={30}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button onClick={logIn}>Log in</button>
      </div>
      <div className="forgot">
        <Link to="/resetpassword">Forgot password?</Link>
      </div>
     
      <h3 className="no-logIn">
        Don't have an account?<Link to="/">Sign Up</Link>
      </h3></div>
      <div className="newuser-footer">
        <h5 className="newuser-about">
          <Link to="/about">About</Link>
        </h5>
        <h5>
          <Link to="/help">Help</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignIn;
