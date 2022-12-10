import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../../app/FirebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  setDoc,
  doc,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const regSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        password,
      });
      navigate("/setupprofile");
    } catch (err) {
      console.log(err);
      toast.error("Unable to sign up. Please try again", {
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
  // text logo
  // https://images.cooltext.com/5633399.png

  return (
    <div>
      <div className="logIn">
        <img
          src="https://images.cooltext.com/5633399.png"
          alt="New Friends"
          style={{ height: "40px", width: "240px" }}
        />
        <div className="signIn-msg">
          Sign up to meet new people and make new friends.
        </div>
       
        <button onClick={googleSignIn}>
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
            type="text"
            placeholder="Email"
            size={30}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            size={30}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={regSignUp}>Sign Up</button>
        </div>

        <h3 className="logIn-again">
          Already have an account? <Link to="/signin">Sign In</Link>
        </h3>
      </div>
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

export default SignUp;
