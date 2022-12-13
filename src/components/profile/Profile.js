import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../app/FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";

import Footer from "../homepage/Footer";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [image, setProfileImg] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [activities, setActivities] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tiktok, setTiktok] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.username);
      setProfileImg(data.photo);
      setBio(data.bio);
      setAge(data.age);
      setActivities(data.activities);
      setFacebook(data.fb);
      setInstagram(data.insta);
      setWhatsapp(data.whatsapp);
      setTiktok(data.tiktok);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [user]);
  return (
    <>
      <div className="profileView">
        {/* <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" alt="" style={{ height: "50px", width: "50px" }} onClick={() => navigate("/home")} /> */}
        <div className="profileView-user">
          <div className="profileView-img">
            <img src={image} alt="" style={{ height: "80px", width: "80px" }} />
            <p>
              <strong>{age} years</strong>
            </p>
          </div>
          <div className="profileView-name">
            <h3>
              <strong>@{name}</strong>
            </h3>
            <Link to="friendslist">
              <button>My Friends</button>
            </Link>
            <div className="btn2">
              <Link to="editprofile">
                <button>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
        <p>
          <em>{bio}</em>
        </p>
        <hr></hr>

        <div className="profileView-activities">
          <p>
            <strong>My interests include..</strong>
          </p>
          <div>
            {activities ? (
              activities.map((activity) => <p key={activity}>{activity}</p>)
            ) : (
              <p>No activities yet</p>
            )}
          </div>
        </div>
        <hr></hr>
        <div>Find me here!</div>
        <div>
          <img
            src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/arrow-down-1024.png"
            alt=""
            style={{ height: "20px", width: "20px" }}
          />
        </div>
        <div className="medialinks">
          {facebook ? (
            <a href={facebook} target="_blank">
              <img
                src="https://img.icons8.com/color/512/facebook-new.png"
                alt=""
                style={{ height: "35px", width: "35px" }}
              />
            </a>
          ) : (
            ""
          )}
          {instagram ? (
            <a href={instagram} target="_blank">
              <img
                src="https://img.icons8.com/color/512/instagram-new.png"
                alt=""
                style={{ height: "35px", width: "35px" }}
              />
            </a>
          ) : (
            ""
          )}
          {tiktok ? (
            <a href={tiktok} target="_blank">
              <img
                src="https://img.icons8.com/color/512/tiktok.png"
                alt=""
                style={{ height: "35px", width: "35px" }}
              />
            </a>
          ) : (
            ""
          )}
          {whatsapp ? (
            <a href={whatsapp} target="_blank">
              <img
                src="https://img.icons8.com/color/512/whatsapp.png"
                alt=""
                style={{ height: "35px", width: "35px" }}
              />
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
