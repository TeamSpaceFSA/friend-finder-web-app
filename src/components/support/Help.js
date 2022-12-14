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
        <div className="help">
          <div className="help-container">
          <h2 >FAQ </h2>
          <div className="help-msg">Questions? We're here to help. &#128522;</div>
          <div className="creator">
            <p><strong>Q</strong>: As a event host, why can't I remove users from my events?</p>
            <p><strong>A</strong>: <em>Upon users' requests to your event, you have the option to approve or deny who attends.  Once approves, alerts are sent out to the attendees, then it's time to party!  So be sure to review users' profiles before accepting!</em></p>
          </div>
          <div className="creator">
            <p><strong>Q</strong>: How do I find people that I already know?</p>
            <p><strong>A</strong>: <em>The point of New Friends+ is to make... New Friends+, hehe. If you looking to locate someone you are already aquainted with, maybe try Facebook.</em></p>
          </div>
          <div className="creator">
            <p><strong>Q</strong>: What if I double-booked for two events?</p>
            <p><strong>A</strong>: <em>No worries! You can always remove an event from your event list but please, be mindful of your schedule. When a user approves you, they'll be looking forward to meeting you as a potential new friend!!</em></p>
          </div>
          <div className="creator">
            <p><strong>Q</strong>: Can I message my friends on this app?</p>
            <p><strong>A</strong>: <em>Messaging is coming soon!! However, it will only be a feature to further solidy event details. Once you make a new friend, you no longer need the app! We then give you access to contact information to grow your new friendship outside if the app. </em></p>
          </div>
        </div></div>
      ) : (
        <div className="help">
          <img
            src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-1024.png"
            alt=""
            style={{ height: "30px", width: "30px", margin: "3px" }}
            onClick={() => navigate(-1)}
          />
          <div className="help-container">
          <h2 >FAQ </h2>
          <div className="help-msg">Questions? We're here to help. &#128522;</div>
          <div className="creator">
            <p><strong>Q</strong>: As a event host, why can't I remove users from my events?</p>
            <p><strong>A</strong>: <em>Upon users' requests to your event, you have the option to approve or deny who attends.  Once approves, alerts are sent out to the attendees, then it's time to party!  So be sure to review users' profiles before accepting!</em></p>
          </div>
          <div className="creator">
            <p><strong>Q</strong>: How do I find people that I already know?</p>
            <p><strong>A</strong>: <em>The point of New Friends+ is to make... New Friends+, hehe. If you looking to locate someone you are already aquainted with, maybe try Facebook.</em></p>
          </div>
          <div className="creator">
            <p><strong>Q</strong>: What if I double-booked for two events?</p>
            <p><strong>A</strong>: <em>No worries! You can always remove an event from your event list but please, be mindful of your schedule. When a user approves you, they'll be looking forward to meeting you as a potential new friend!!</em></p>
          </div>
          <div className="creator">
            <p><strong>Q</strong>: Can I message my friends on this app?</p>
            <p><strong>A</strong>: <em>Messaging is coming soon!! However, it will only be a feature to further solidy event details. Once you make a new friend, you no longer need the app! We then give you access to contact information to grow your new friendship outside if the app. </em></p>
          </div>
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
        
      )}<div className="space">&nbsp;</div>
    </>
  );
};

export default Help;
