import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../app/FirebaseConfig";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setEmail("");
      toast.info("Password reset link sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {/* <img
          src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
          alt=""
          style={{ height: "25px", width: "25px", margin: "3px" }}
          onClick={() => navigate(-1)}
        /> */}
      <div className="logIn">
      <img
          src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-4-1/1024/lock4-1024.png"
          alt=""
          style={{ height: "60px", width: "60px", margin: "0px" }}
        />
        <h2 className="forgot-header">Trouble logging in?</h2>
        <div className="signIn-msg">
          Enter your email and we'll send you a link to reset your password.
        </div>
        <input className="forgot-input"
          type="text"
          placeholder="Email"
          size={30}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={resetPassword}><div className="logIn-btn-name">Send reset link</div></button>

        <h3 className="logIn-again">
          <Link to={"/signin"}>Back to login</Link>
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
    </>
  );
};

export default Resetpassword;
