import React from "react";
import { auth } from "../../app/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Help = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div className="help">FAQ </div>
      ) : (
        <div className="help">
          <img
            src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
            alt=""
            style={{ height: "25px", width: "25px", margin: "3px" }}
            onClick={() => navigate(-1)}
          />
          <div>FAQ</div>
          <div className="newuser-footer">
            <h5 className="newuser-about">
              <Link to="/about">About</Link>
            </h5>
            <h5>
              <Link to="/help">Help</Link>
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default Help;
