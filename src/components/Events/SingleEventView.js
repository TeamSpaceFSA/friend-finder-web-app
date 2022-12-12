import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { auth, db } from "../../app/FirebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

const SingleEventView = () => {
    const navigate = useNavigate()
    //useLocation is taking the props/state we passed in from our navigate function (HomeMap.js: line 39)
    const location = useLocation()
    //location.state holds all of our single event data, therefore we define it to make it easier to refer to.
    const event = location.state
    // console.log("This is the state we have passed in from the Marker we have clicked", location.state)
    const { name, category, headcount, startTime, description, requested, amPm, date, id } = event

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

    //Accept reject button event handling
    /**
     * Inserts associated user ID into accepted array in event document, removes from rejected array if necessary
     */
    function handleAccept(){

    }

    /**
     * Inserts associated user ID into rejected array in event document, removes from accepted array if necessary
     */
    function handleReject(){

    }
   

    return (
        <>
        <div className="event-single">
            {/* <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{ height: "50px", width: "50px" }} onClick={() => navigate(-1)} /> */}
            <h2>{name}</h2>
            <div><h3>Host:<img onClick={handleClick} src={profimage} alt="" style={{ height: "50px", width: "50px"}}/>{profName}</h3></div>
            {visible ? <div className="userInfoDiv">
                <img src={profimage} alt="" style={{ height: "85px", width: "85px"}}/>
                <h2>{profName}</h2>
                <h3><strong>Bio</strong>: {bio}</h3>
                <h3><strong>Age</strong>: {age}</h3>
                <h3><strong>Interests</strong>:</h3>
                <div className="interest">{activities ? activities.map((activity) => (
                <h3  key={activity}>{activity}</h3>
            )) : <h3>No interests added.</h3>}</div>
                   <div className="medialinks">
                {facebook ? <a href={facebook} target="_blank"><img src="https://img.icons8.com/color/512/facebook-new.png" alt="" style={{ height: "30px", width: "30px" }}/></a>: ""}
                {instagram ? <a href={instagram} target="_blank"><img src="https://img.icons8.com/color/512/instagram-new.png" alt="" style={{ height: "30px", width: "30px" }}/></a>: ""}
                {tiktok ? <a href={tiktok} target="_blank"><img src="https://img.icons8.com/color/512/tiktok.png" alt="" style={{ height: "30px", width: "30px" }}/></a>: ""}
                {whatsapp ? <a href={whatsapp} target="_blank"><img src="https://img.icons8.com/color/512/whatsapp.png" alt="" style={{ height: "30px", width: "30px" }}/></a>: ""}
                </div>
            </div> : ""}
            <div><h3>Where:</h3>{event.location.address}</div>
            <div><h3>Description:</h3>{description}</div>
            <div><h3># of People:</h3> {headcount}</div>
            <h3>When:</h3><div>{date}</div>
            <h3>Start(EST):</h3><div>{startTime}{amPm}</div>
            <h3>Activities:{category ? category.map(cat => (
                <p key={cat}>{cat}</p>
            )) : <p>n/a</p>}</h3>

            {/* If user is event host, provide attendance management functionality */}
            {host == user ? <div>
                {/* map requested users and link accept and reject buttons to each user */}
                {requested.map( user => (
                    <div classname="attendee">
                        <div classname='attendeeInformation'>
                            <img src={user.photo} alt='user profile'></img>
                            <div>{user.name}</div>
                            <button onClick={handleAccept}>Accept</button>
                            <button onClick={handleReject}>Reject</button>
                        </div>
                    </div>
                ) )}
            </div> : null}</div>
<div className="event-single-map">
            <GoogleMap  zoom={60}  center={{ lat: event.location.lat, lng: event.location.lng }} mapContainerClassName="map-container">
                <MarkerF position={{ lat: event.location.lat, lng: event.location.lng }} icon={event.icon}></MarkerF>
            </GoogleMap></div>
            </>
    )
}

export default SingleEventView