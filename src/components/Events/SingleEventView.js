import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { auth, db } from "../../app/FirebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, query, collection, getDocs, where } from "firebase/firestore"
// import { toast } from "react-toastify";

const SingleEventView = () => {
    const navigate = useNavigate()
    //useLocation is taking the props/state we passed in from our navigate function (HomeMap.js: line 39)
    const location = useLocation()
    //location.state holds all of our single event data, therefore we define it to make it easier to refer to.
    const event = location.state
    // console.log("This is the state we have passed in from the Marker we have clicked", location.state)
    const { name, category, headcount, startTime, description, requested, accepted, rejected, amPm, date, id } = event

    //Local state for manipulation of accepted, rejected arrays
    const [acceptedArr, setAccepted] = useState(accepted)
    const [rejectedArr, setRejected] = useState(rejected)


    // grab host information to display on info popup
    const [profName, setName] = useState("")
    const [profimage, setProfileImg] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState("")
    const [activities, setActivities] = useState([])
    const [instagram, setInstagram] = useState("")
    const [facebook, setFacebook] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [tiktok, setTiktok] = useState("")
    const [visible, setVisible] = useState(false)

    const fetchUser = async () => {
        try{
            const q = query(collection(db,"users"),where("uid", "==", event.user))
            const doc = await getDocs(q)
            const data = doc.docs[0].data()
            setName(data.username)
            setProfileImg(data.photo)
            setBio(data.bio)
            setAge(data.age)
            setActivities(data.activities)
            setFacebook(data.fb)
            setInstagram(data.insta)
            setWhatsapp(data.whatsapp)
            setTiktok(data.tiktok)
        }catch(err){
            console.log(err)
        }
    }

    // toggle use info div state
    const handleClick = () => {
        setVisible(current => !current)
    }

    useEffect(()=>{
        fetchUser()
    },[])


    //User authentication 
    const host = event.user
    const [user] = useAuthState(auth);

    const libraries = ["places"]
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBGp2IIHledlGmrdnK8M7x7QMn3GE6uiIg",
        libraries: libraries,
    })
    if (!isLoaded) return (<div>Loading...</div>)
    console.log(event)

    //Event document reference
    const docRef = doc(db, "events", id)

    //Accept Reject event handlers
    async function handleAccept(user) {
        try{
            //Filter out user from rejected list if inside
            setRejected( (rejectedArr) => rejectedArr.filter(element => element !== user))

            //Add to accepted list
            setAccepted( (acceptedArr) => [...acceptedArr, user]);

            //Push local state to firestore
            await updateDoc(docRef, {
                rejected: rejectedArr,
                accepted: acceptedArr
            });
            // toast('Guest accepted', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //   });
        } catch(err){
            console.log(err)
        }
    }

    async function handleReject(user) {
        try{
            //Filter out user from accepted list if inside
            setAccepted( (acceptedArr) => acceptedArr.filter(element => element !== user))

            //Add to rejected list
            setRejected( (rejectedArr) => [...rejectedArr, user])

            //Push local state to firestore
            await updateDoc(docRef, {
                rejected: rejected,
                accepted: accepted
            });
            // toast('Guest rejected', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //   });
        } catch(err){
            console.log(err)
        }
    }
   

    return (
        <div>
            <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{ height: "50px", width: "50px" }} onClick={() => navigate(-1)} />
            <h1>Event: {name}</h1>
            <h3 onClick={handleClick}>Host:<img src={profimage} style={{ height: "50px", width: "50px"}}/>{profName}</h3>
            {visible ? <div className="userInfoDiv">
                <img src={profimage} style={{ height: "100px", width: "100px"}}/>
                <h2>{profName}</h2>
                <h4>{bio}</h4>
                <h4>{age}</h4>
                <h4>Favorites:</h4>
                {activities ? activities.map((activity) => (
                <h4 key={activity}>{activity}</h4>
            )) : <p>No activities yet</p>}
                   <div className="medialinks">
                {facebook ? <a href={facebook} target="_blank"><img src="https://img.icons8.com/color/512/facebook-new.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {instagram ? <a href={instagram} target="_blank"><img src="https://img.icons8.com/color/512/instagram-new.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {tiktok ? <a href={tiktok} target="_blank"><img src="https://img.icons8.com/color/512/tiktok.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {whatsapp ? <a href={whatsapp} target="_blank"><img src="https://img.icons8.com/color/512/whatsapp.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                </div>
            </div> : ""}
            <h3>Where: {event.location.address}</h3>
            <h3>Description:{description}</h3>
            <h3> # of People: {headcount}</h3>
            <h3>When:{date}</h3>
            <h3>Start(EST):{startTime}{amPm}</h3>
            <h3>Activities:{category ? category.map(cat => (
                <p key={cat}>{cat}</p>
            )) : <p>n/a</p>}</h3>

            {/* If user is event host, provide attendance management functionality */}
            {host == user ? <div>
                {/* map requested users and link accept and reject buttons to each user */}
                {requested.map(user => (
                    <div classname="attendee">
                        <div classname='attendeeInformation'>
                            <img src={user.photo} alt='user profile'></img>
                            <div>{user.name}</div>
                            <button onClick={() => handleAccept(user)}>Accept</button>
                            <button onClick={() => handleReject(user)}>Reject</button>
                        </div>
                    </div>
                ))}
            </div> : null}

            <GoogleMap zoom={60} center={{ lat: event.location.lat, lng: event.location.lng }} mapContainerClassName="map-container">
                <MarkerF position={{ lat: event.location.lat, lng: event.location.lng }} icon={event.icon}></MarkerF>
            </GoogleMap>
        </div>
    )
}

export default SingleEventView