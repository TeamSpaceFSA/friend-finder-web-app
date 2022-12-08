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
import { allEvents, fetchFutureEvents } from "./attendanceEventsSlice";
​
const EventsList = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const events = useSelector(allEvents);
    
    useEffect(() => {
        dispatch(fetchFutureEvents)
    })
​
    let allEvents = [...events];
    //events is a reference to state. State cannot be altered directly, so we deepcopy it here into a new mutable object allEvents.
​
    console.log(allEvents)
​
    return (
        <div>
​
        </div>
    )
}
​
export default EventsList