import React, { useState, useMemo, useCallback, useEffect } from "react";
import { auth, db } from "../../app/FirebaseConfig"
import { onSnapshot, query, collection, doc, getDocs, documentId, where, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const EventList = () => {
  const [user] = useAuthState(auth)
  const [events, setEvents] = useState([])

  //Fetching all events created by user
  const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"), where("user", "==", user.uid))
      const doc = await getDocs(q)
      const locations = []
      for (let i = 0; i < doc.docs.length; i++) {
        const data = doc.docs[i].data()
        locations.push(data)
      }
      setEvents(locations)
    } catch (err) {
      console.log(err)
    }
  }

  // editing an event
  const editEvent = async () => {

  }
  // deleting an event
  const deleteEvent = async () => {
    try{
    }catch(err){
      console.log(err)
    }
  }

  //Fetch all events everytime the page is loaded.
  useEffect(() => {
    fetchEvents()
  }, [])

  //We want to be able to filter events by 

  return (
    <>
      <div>Event List</div>
      {events.map(event =>
        <div>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <button>Edit</button>
          <button>Remove</button>
        </div>)}
      <div>My Events</div>
    </>
  )
}

export default EventList