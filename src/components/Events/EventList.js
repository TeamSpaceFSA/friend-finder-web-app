import React, { useState, useEffect } from "react";
import { auth, db } from "../../app/FirebaseConfig"
import { query, collection, doc, getDocs, where, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [user] = useAuthState(auth)
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

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

  const [ selectedEvent, setSelectedEvent ] = useState("")

  const viewEditEvent = () => {
    // Here, we pass the variable 'selectedMarker' as a value for our key 'state' so our SingleEventView 
    // component recognizes which event we are referring to.
    navigate("/editEventView", {state: selectedEvent})
    console.log("Here is the selectedEvent", selectedEvent)
  }

  //Fetch all events everytime the page is loaded.
  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <>
      <div>Event List</div>
      <div>My Events:</div> 
      {events.map((doc) =>
        <div key={doc.id} onClick={() => setSelectedEvent(doc)}>
          <h2>{doc.name}</h2>
          <p>{doc.description}</p>
          <button onClick={() => {
            viewEditEvent(selectedEvent)}}>Edit</button>
          <button onClick={()=>deleteEvent(doc.id)}>Remove</button>
        </div>)}

    </>
  )
}
export default EventList