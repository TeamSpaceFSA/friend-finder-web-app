import React, { useState, useMemo, useCallback, useEffect } from "react";
import { db } from "../../app/FirebaseConfig"
import { onSnapshot, query, collection, doc, getDocs, documentId } from "firebase/firestore";

const EventList =() => {
    
    const [events, setEvents] = useState([])
    
    //Fetching all event data from Firebase
    const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"))
      const doc = await getDocs(q)
      const locations = []
      for (let i = 0; i < doc.docs.length; i++) {
        const data = doc.docs[i].data()
        locations.push(data)
      }
      setEvents(locations)
    } catch (err) {
      console.log(err)
    }}

    //Fetch all events everytime the page is loaded.
    useEffect(() => {
        fetchEvents()
    }, [])

    //We want to be able to filter events by 
    
    return (
        <>
        <div>Event List</div>
        {events.map(event => <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
        </div>)}
        <div>My Events</div>
        </>
    )
}

export default EventList