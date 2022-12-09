import React, { useState, useMemo, useCallback, useEffect } from "react";
import { auth, db } from "../../app/FirebaseConfig"
import { onSnapshot, query, collection, doc, getDocs, documentId, where, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EventList = () => {
  const [user] = useAuthState(auth)
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    try{
      const eventCollectionRef = query(collection(db,"events"),where("user","==",user.uid))
      const data = await getDocs(eventCollectionRef)
      setEvents(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }catch(err){
      console.log(err)
    }
  }

  // deleting an event
  const deleteEvent = async (id) => {
    try{
      const delEvent = doc(db,"events",id)
      await deleteDoc(delEvent)
      await fetchEvents()
      toast('Event removed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      {events.map((doc) =>
        <div key={doc.id}>
          <h2>{doc.name}</h2>
          <p>{doc.description}</p>
          <button>Edit</button>
          <button onClick={()=>deleteEvent(doc.id)}>Remove</button>
        </div>)}
      <div>My Events</div>
    </>
  )
}

export default EventList