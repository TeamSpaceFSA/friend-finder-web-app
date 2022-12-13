import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../app/FirebaseConfig"
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore"
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
// import { allEvents } from "./attendanceEventsSlice";

//Upcoming feature, not yet available

const EventsListFiltered = () => {
    const [user] = useAuthState(auth);
    // const dispatch = useDispatch();
    // const events = useSelector(allEvents);
    const [ events, setEvents ] = useState([])


    //Separating event types
    // const acceptedEvents = events.acceptedEvents
    // const rejectedEvents = events.rejectedEvents
    // const hostedEvents = events.hostedEvents
    
    // useEffect(() => {
    //     dispatch(fetchAcceptedEvents())
    // }, [dispatch]);
    
    
    const fetchAcceptedEvents = async () => {
        try {
            const q = query(collection(db, "events"), 
            where("accepted", "array-contains", user.uid));
            const data = await getDocs(q);
            setEvents(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
            
            // return events 
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchAcceptedEvents()
    }, []);
    console.log("This is events", events)

    return (
        <div>
            
            {events.map((doc,index) =>
            <div key={doc.id}>
            <h2>Event:{doc.name}</h2>
            <h4>Date: {doc.date}, Time: {doc.startTime} {doc.amPm}</h4>
            <p>Plan:{doc.description}</p>
            </div>)}
        </div>
    )
}

export default EventsListFiltered
