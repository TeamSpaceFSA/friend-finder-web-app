import React, { useState, useEffect } from "react";
import { auth, db } from "../../app/FirebaseConfig";
import {
  query,
  collection,
  doc,
  getDocs,
  where,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { OneEventInList, EventsListFiltered } from "../index.js";

const EventList = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [hidden, setHidden] = useState(events.map(() => true));
  // fetch a pending user profiles from an event
  const [selectedEvent, setSelectedEvent] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const eventCollectionRef = query(
        collection(db, "events"),
        where("user", "==", user.uid)
      );
      const data = await getDocs(eventCollectionRef);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  //Fetches requested user information
  // const fetchreqUsers = async (userid) => {
  //   try{
  //     const q = query(collection(db,"users"),where("uid","==",userid))
  //     const doc = await getDocs(q)
  //             const data = doc.docs[0].data()
  //             setName(data.username)
  //             setProfileImg(data.photo)
  //             setBio(data.bio)
  //             setAge(data.age)
  //             setActivities(data.activities)

  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  // deleting an event
  const deleteEvent = async (id) => {
    try {
      const delEvent = doc(db, "events", id);
      await deleteDoc(delEvent);
      await fetchEvents();
      toast("Event removed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const viewEditEvent = () => {
    // Here, we pass the variable 'selectedMarker' as a value for our key 'state' so our SingleEventView
    // component recognizes which event we are referring to.
    navigate("/editEventView", { state: selectedEvent });
  };

  const viewOneUser = () => {
    navigate("/eventInList", { state: userId });
  };

  // toggle edit button visibility
  const handleClick = (index) => {
    const visible = [...hidden];
    visible[index] = !visible[index];
    setHidden(visible);
  };

  //Fetch all events everytime the page is loaded.
  useEffect(() => {
    fetchEvents();
    // fetchreqUsers()
  }, []);

  // useEffect(() => {
  //   fetchreqUsers()
  // },[events])

  //Accept Reject event handlers
  async function handleAccept(docId, userId) {
    try {
      await updateDoc(doc(db, "events", docId), {
        accepted: arrayUnion(userId),
        requested: arrayRemove(userId),
      });
      toast.success("Participant Added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleReject(docId, userId) {
    try {
      console.log("This is user", userId);
      await updateDoc(doc(db, "events", docId), {
        requested: arrayRemove(userId),
      });
      toast.success("Participant Removed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="eventlist">
        <img
          src="https://cdn4.iconfinder.com/data/icons/entertainment-6/64/confetti-party0A-birthday0A-fun-celebration0A-1024.png"
          alt=""
          style={{ height: "50px", width: "50px" }}
        />
        <h2 className="eventlist-h2">My Events</h2>
        <div className="eventlist-msg">Click on an event title to make an edit.</div>
        {events.map((doc, index) => (
          <div
            className="eventlist-card"
            key={doc.id}
            onClick={() => setSelectedEvent(doc)}
          >
            <h2 onClick={() => handleClick(index)}>{doc.name}</h2>
            <p>
              <em>{doc.description}</em>
            </p>
            {hidden[index] && (
              <button
                onClick={() => {
                  viewEditEvent(selectedEvent);
                }}
              >
                Edit
              </button>
            )}
            <button onClick={() => deleteEvent(doc.id)}>Remove</button>
            <hr className="eventhr"></hr>
            <div className="eventlist-requestMsg">*accept/deny requests by clicking the check or 'X'*</div>

            {/* <button onClick={() => fetchreqUsers(selectedEvent)}>Fetch Req Users</button> */}
            {/* Map out requesting users and put buttons next to them to accept/reject */}
            {console.log("This is the problem ", doc.requested)}
            {doc.requested ? (
              doc.requested.map((user) => (
                <div className="attendee">
                              <hr className="eventhr"></hr>

                  <div className="attendeeInformation">
                    {/* <img src={user.photo} alt='user profile'></img>
                            <div>{user.name}</div> */}
                    <div className="attendeeProfile">
                      <div value={user}>
                        <img
                          src="https://t3.ftcdn.net/jpg/03/42/99/68/360_F_342996846_tHMepJOsXWwbvMpG7uiYpE68wbfQ9e4s.jpg"
                          onClick={() => setUserId(user)}
                          alt=""
                          style={{ height: "50px", width: "50px" }}
                        />
                      </div>
                      <button onClick={() => viewOneUser()}>Profile</button>
                    </div>
                    <div className="accept-reject">
                      <button onClick={() => handleAccept(doc.id, user)}>
                      <img src="https://cdn2.iconfinder.com/data/icons/funtime-objects-part-2/60/005_056_okay_approve_check_test_good_vote-1024.png" alt="" style={{ height: "30px", width: "30px" }}/>
                      </button>
                      <button onClick={() => handleReject(doc.id, user)}>
                        <img src="https://cdn1.iconfinder.com/data/icons/smallicons-controls/32/614397-x-1024.png" alt="" style={{ height: "30px", width: "30px" }}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No requests yet!</p>
            )}
            {doc.accepted
              ? doc.accepted.map((user) => (
                  <div>
                    {/* <h3>Participants:</h3> */}
                    <div value={user}>
                      <img
                        src="https://t3.ftcdn.net/jpg/03/42/99/68/360_F_342996846_tHMepJOsXWwbvMpG7uiYpE68wbfQ9e4s.jpg"
                        onClick={() => setUserId(user)}
                        alt=""
                        style={{ height: "50px", width: "50px" }}
                      />
                    </div>
                    <button onClick={() => viewOneUser()}>View Profile</button>
                  </div>
                ))
              : null}
          </div>
        ))}

        <h2 className="eventlist-h2">Requested Events</h2>
        <div className="eventlist-msg">
          Here are events from other users you are looking to attend.
        </div>
        <div className="eventlist-card"><EventsListFiltered /></div>
      </div>
    </>
  );
};
export default EventList;
