import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { auth, db } from "../../app/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, query, collection, getDocs, where, arrayUnion } from "firebase/firestore"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleEventView = () => {
  const navigate = useNavigate();
  //useLocation is taking the props/state we passed in from our navigate function (HomeMap.js: line 39)
  const location = useLocation();
  //location.state holds all of our single event data, therefore we define it to make it easier to refer to.
  const event = location.state;
  // console.log("This is the state we have passed in from the Marker we have clicked", location.state)
  const {
    name,
    category,
    headcount,
    startTime,
    description,
    requested,
    accepted,
    amPm,
    date,
    id,
  } = event;

  // grab host information to display on info popup
  const [profName, setName] = useState("");
  const [profimage, setProfileImg] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [activities, setActivities] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [visible, setVisible] = useState(false);

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", event.user));
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

  // toggle use info div state
  const handleClick = () => {
    setVisible((current) => !current);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //User authentication
  const host = event.user;
  const [user] = useAuthState(auth);

  const libraries = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBGp2IIHledlGmrdnK8M7x7QMn3GE6uiIg",
    libraries: libraries,
  });
  if (!isLoaded) return <div>Loading...</div>;
  console.log(event);

  //Event document reference
  const docRef = doc(db, "events", id);
    
    //Request Join event handler
    async function handleRequestJoin(){
        try{
            console.log("This is user", user)
            await updateDoc(docRef, {
                requested: arrayUnion(user.uid)
            });
            toast.success('Request Sent!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        } catch(err){
            console.log(err)
        }
    }
  

  return (
    <>
      <div className="event-single">
        {/* <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{ height: "50px", width: "50px" }} onClick={() => navigate(-1)} /> */}
        <h2>{name}</h2>
        <table>
            <tr>
                <td><strong>Host:</strong></td>
                <td className="center"><div><img className="profileimg"
              onClick={handleClick}
              src={profimage}
              alt=""
              style={{ height: "50px", width: "50px" }}
            />
            <h3>{profName}</h3></div>
            <div className="userFlashcard">
          {visible ? (
          <div className="userInfoDiv">
            <img className="profileimg"
              src={profimage}
              alt=""
              style={{ height: "70px", width: "70px" }}
            />
            <h2>{profName}</h2>
            <h3>
              <strong>Bio</strong>: {bio}
            </h3>
            <h3>
              <strong>Age</strong>: {age}
            </h3>
            <h3>
              <strong>Interests</strong>:
            </h3>
            <div className="interest">
              {activities ? (
                activities.map((activity) => <h3 key={activity}>{activity}</h3>)
              ) : (
                <h3>No interests added.</h3>
              )}
            </div>
            <div className="medialinks">
              {facebook ? (
                <a href={facebook} target="_blank">
                  <img
                    src="https://img.icons8.com/color/512/facebook-new.png"
                    alt=""
                    style={{ height: "30px", width: "30px" }}
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
                    style={{ height: "30px", width: "30px" }}
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
                    style={{ height: "30px", width: "30px" }}
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
                    style={{ height: "30px", width: "30px" }}
                  />
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        </div></td>
            </tr>
            <tr>
                <td><strong>Where:</strong></td>
                <td className="center">{event.location.address}</td>
            </tr>
            <tr>
                <td><strong>Description:</strong></td>
                <td className="center">{description}</td>
            </tr>
            <tr>
                <td><strong>People Invited:</strong></td>
                <td className="center">{headcount}</td>
            </tr>
            <tr>
                <td><strong>When:</strong></td>
                <td className="center">{date}</td>
            </tr>
            <tr>
                <td><strong>Start (EST):</strong></td>
                <td className="center">{startTime}{amPm}</td>
            </tr>
            <tr>
                <td><strong>Categories:</strong></td>
                <td className="event-single-activity">{category ? (
            category.map((cat) => <p key={cat}>{cat}</p>)
          ) : (
            <p>n/a</p>
          )}</td>
            </tr>
        </table>
        {host === user.uid ? null : (
          <button onClick={() => handleRequestJoin()}>Join Event!</button>
        )}
        <div className="event-single-map">
          <GoogleMap
            zoom={60}
            center={{ lat: event.location.lat, lng: event.location.lng }}
            mapContainerClassName="map-container"
          >
            <MarkerF
              position={{ lat: event.location.lat, lng: event.location.lng }}
              icon={event.icon}
            ></MarkerF>
          </GoogleMap>
        </div><div className="space"></div>
      </div>
    </>
  );
};

export default SingleEventView;
