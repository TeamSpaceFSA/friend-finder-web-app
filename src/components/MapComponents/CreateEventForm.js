import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../app/FirebaseConfig"
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";




const CreateEventForm = () => {
    const [ user ] = useAuthState(auth)
    const navigate = useNavigate()
    

    const [ name, setName ] = useState("") //name of event
    const [ description, setDescription ] = useState("") //description of event
    const [ headcount, setHeadcount ] = useState("") //# of people attending event
    const [ startTime, setStartTime ] = useState("") //start time of event
    const [ endTime, setEndTime ] = useState("") //end time of event
    const [ age, setAge ] = useState("") //age range of the event
    const [ activities, setActivities ] = useState([]) //categories associated with event
    const [ location, setLocation ] = useState("") //location of the event
    const [ creator, setCreator ] = useState("") //creator of the event

    const ageRange = [
        { key: "0", value: "---select age---" },
        { key: "1", value: "18-20" },
        { key: "2", value: "21-26" },
        { key: "3", value: "27-34" },
        { key: "4", value: "35-39" },
        { key: "5", value: "40+" },
      ];
    
      const categories = [
        { key: "1", value: "bar" },
        { key: "2", value: "gym" },
        { key: "3", value: "bowling" },
        { key: "4", value: "skating" },
        { key: "5", value: "movies" },
        { key: "6", value: "museum" },
        { key: "7", value: "art gallery" },
        { key: "8", value: "hiking" },
        { key: "9", value: "sight-seeing" },
        { key: "10", value: "foodie" },
        { key: "11", value: "beach" },
        { key: "12", value: "shopping" },
        { key: "13", value: "dancing" },
        { key: "14", value: "studying" },
        { key: "15", value: "painting" },
        { key: "16", value: "cooking class" },
        { key: "17", value: "art classes" },
        { key: "18", value: "park" },
        { key: "19", value: "concerts" },
        { key: "20", value: "arcade" },
        { key: "21", value: "other" },
      ];

    const submit = async (e) => {
        try{
            e.preventDefault();
            await setDoc(doc(db, "events"), {

            })
        } catch (err) {
            console.log(err)
        }
    }

    //click the marker
    //create event form pops up with location already filled in (here is where event is created)
    //fill out the form and click submit
    //send a update request with new information




    return(
        <>
        <div id="CreateEventContainer">
            <form>
                <h1>Create Event</h1>
                <h1>Name Of Event:</h1>
                <input type="text" value={name}
                    onChange={(e) => setName(e.target.value)} />
                <h1>Description:</h1>
                <input type="text" value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <h1>Headcount:</h1>
                <input type="text" value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)} />
                <h1>Start Time:</h1>
                <input type="text" value={startTime}
                    onChange={(e) => setStartTime(e.target.value)} />
                <h1>End Time:</h1>
                <input type="text" value={endTime}
                    onChange={(e) => setEndTime(e.target.value)} />
                <h1>Age Range:</h1>
                    <div className="age-menu">
                        <select className="age-searchBar" onChange={(e)=> setAge(e.target.value)} name="ages">
                            {ageRange.map((age) => (
                            <option key={age.key} className="ageOption">
                                {age.value}
                            </option>
                            ))}
                        </select>
                    </div>
                <h1>Related Activities:</h1>
                    <Multiselect
                        isObject={false}
                        onRemove={(event) => {
                        console.log(event);
                        }}
                        onSelect={(event) => {
                        console.log(event);
                        setActivities(event)
                        }}
                        options={categories.map((category) => category.value)}
                        //option to add pre-selected activities
                        //   selectedValues={["arcade"]}
                        showCheckbox
                    />
                <h1>Location:</h1> {/* How to input selected location as a prop? */}
                <input type="text" value={location}
                    onChange={(e) => setLocation(e.target.value)} />
                <h1>Creator:</h1> {/* How to input user's username as a prop?*/}
                <input type="text" value={creator}
                    onChange={(e) => setCreator(e.target.value)} />
                <button onClick={submit}>Create Event</button>
            </form>
        </div>
        </>
    )

}