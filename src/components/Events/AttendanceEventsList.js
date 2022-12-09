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
import { allEvents, fetchAcceptedEvents } from "./attendanceEventsSlice";

const EventsListFiltered = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const events = useSelector(allEvents);

    //Separating event types
    const acceptedEvents = events.acceptedEvents
    const rejectedEvents = events.rejectedEvents
    const hostedEvents = events.hostedEvents
    
    useEffect(() => {
        dispatch(fetchAcceptedEvents())
    }, [dispatch]);
    


    

    console.log(allEvents)

    return (
        <div>

        </div>
    )
}

export default EventsListFiltered