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
        <div>
          <div className="help">FAQ </div>
          <div className="creator">
            <p>"Q: As a event host, why can't I remove users from my events?"</p>
            <p>"A: As creators, we decided to not include that functionality to prevent hosts from flip-flopping on their attendance decisions to improve the experience for guests"</p>
          </div>
          <div className="creator">
            <p>"Q: How do I find people that I already know?"</p>
            <p>"A: The whole point of the app is to make new friends. There is no way to directly search for people to encourage exploration."</p>
          </div>
          <div className="creator">
            <p>"Q: What if I double-booked for two events?"</p>
            <p>"A: As a user, it's your responsibility to be diligent about your schedule. However, you can always remove the event from your schedule as a user."</p>
          </div>
          <div className="creator">
            <p>"Q: Can I message my friends on this app?"</p>
            <p>"A: Not yet! In-app messaging functionality will be available in the near future."</p>
          </div>
        </div>
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
