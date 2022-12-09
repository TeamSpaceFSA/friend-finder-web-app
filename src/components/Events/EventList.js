import React, { useState, useMemo, useCallback, useEffect } from "react";
import { auth, db } from "../../app/FirebaseConfig"
import { onSnapshot, query, collection, doc, getDocs, documentId, where, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { NumberPicker } from "react-widgets";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [user] = useAuthState(auth)
  const [events, setEvents] = useState([])
  const [ selected, setSelected] = useState(null);
  const [name, setName] = useState("")
  const [ description, setDescription ] = useState("")
  const [ headcount, setHeadcount ] = useState("")
  const [ startTime, setStartTime ] = useState("")
  const [ age, setAge ] = useState("")
  const [ activities, setActivities ] = useState("")
  const [ date, setDate ] = useState("")
  const [ mornAft, setMornAft ] = useState("")
  const [ icon, setIcon ] = useState("")

  const navigate = useNavigate()

  const timeRange = [
    { key: "0", value: "---select time---"},
    { key: "1", value: "12:00"},
    { key: "2", value: "1:00"},
    { key: "3", value: "2:00"},
    { key: "4", value: "3:00"},
    { key: "5", value: "4:00"},
    { key: "6", value: "5:00"},
    { key: "7", value: "6:00"},
    { key: "8", value: "7:00"},
    { key: "9", value: "8:00"},
    { key: "10", value: "9:00"},
    { key: "11", value: "10:00"},
    { key: "12", value: "11:00"}
];

const amPM = [
  { key: "0", value: "---AM / PM---"},
  { key: "1", value: "AM"},
  { key: "2", value: "PM"}
]

const ageRange = [
    { key: "0", value: "---select age---" },
    { key: "1", value: "18-20" },
    { key: "2", value: "21-26" },
    { key: "3", value: "27-34" },
    { key: "4", value: "35-39" },
    { key: "5", value: "40+" },
  ];
// key is the category, value is the icon img link
  const categories = [
    { key: "bar", value: "https://i.imgur.com/kAT7Tux.png"},
    { key: "gym",  value: "https://i.imgur.com/Laj8Vax.png"},
    { key: "bowling", value: "https://i.imgur.com/q8E53YA.png" },
    { key: "skating", value: "https://i.imgur.com/q8E53YA.png" },
    { key: "movies", value: "https://i.imgur.com/2j1RFp3.png" },
    { key: "museum", value: "https://i.imgur.com/aHp0rTZ.png" },
    { key: "art gallery", value: "https://i.imgur.com/gfCp9pF.png", },
    { key: "hiking", value: "https://i.imgur.com/q8E53YA.png" },
    { key: "sight-seeing", value: "https://i.imgur.com/Q6KfnsT.png" },
    { key: "foodie", value: "https://i.imgur.com/sckBLS5.png" },
    { key: "beach", value: "https://i.imgur.com/WVZRwfu.png" },
    { key: "shopping", value: "https://i.imgur.com/ln9hhKg.png"},
    { key: "dancing", value: "https://i.imgur.com/c1ftBzM.png" },
    { key: "studying", value: "https://i.imgur.com/n6O9vmP.png" },
    { key: "painting", value: "https://i.imgur.com/q8E53YA.png" },
    { key: "cooking class", value: "https://i.imgur.com/6Avb5MI.png" },
    { key: "art classes", value: "https://i.imgur.com/BHPdsgy.png" },
    { key: "park", value: "https://i.imgur.com/HFRMicZ.png" },
    { key: "concerts", value: "https://i.imgur.com/fvHYF32.png" },
    { key: "arcade", value: "https://i.imgur.com/78AAJJz.png" },
    { key: "other", value: "https://i.imgur.com/CCLrVtI.png" },
  ];
  const cat = [
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

  const updateEvent = async(id) => {
    try{
     await updateDoc(doc(db,"events",id),{
      name:name,
      description: description,
      location: selected,
      category:activities,
      headcount: headcount,
      startTime: startTime,
      age: age,
      user: user.uid,
      amPm: mornAft,
      date: date,
      icon: icon
    })}catch(err){
      console.log(err)
    }
  }

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

  //We want to be able to filter events by 
  return (
    <>
      <div>Event List</div>
      <div>My Events:</div>

        {/* {events.map((doc)=>
        // <div key={doc.id}>
        //   <form key={doc.id}>
        //     Event:<input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        //     Location:<PlacesAutocomplete defaultValue={doc.location.address} setSelected={setSelected} />
        //     Description:<textarea type="text" defaultValue={doc.description} onChange={(e)=>setDescription(e.target.value)}/>
        //     # of People:
        //     <NumberPicker min={1} defaultValue={doc.headcount} onChange={headcount => setHeadcount(headcount)} />
        //     Age Range:<div className="age-menu">
        //                 <select className="age-searchBar"  defaultValue={doc.age} onChange={(e)=> setAge(e.target.value)} name="ages">
        //                     {ageRange.map((age) => (
        //                     <option key={age.key} className="ageOption">
        //                         {age.value}
        //                     </option>
        //                     ))}
        //                 </select>
        //             </div>
        //     Date: <input type="date" defaultValue={doc.date}
        //             onChange={(e) => setDate(e.target.value)} />
        //     Start:<div className="age-menu">
        //                 <select className="age-searchBar" defaultValue={doc.startTime} onChange={(e)=> setStartTime(e.target.value)} name="ages">
        //                     {timeRange.map((time) => (
        //                     <option key={time.key} className="ageOption">
        //                         {time.value}
        //                     </option>
        //                     ))}
        //                 </select>
        //                 <select className="age-searchBar" defaultValue={doc.amPm} onChange={(e)=> setMornAft(e.target.value)} name="ages">
        //                     {amPM.map((time) => (
        //                     <option key={time.key} className="ageOption">
        //                         {time.value}
        //                     </option>
        //                     ))}
        //                 </select>
        //             </div>
        //     Activity: <div>
        //             <select className="activityBar" defaultValue={doc.icon} onChange={e=>setIcon(e.target.value)}>
        //                 {categories.map((category)=>(
        //                     <option key={category.key} value={category.value} className="activityOption">
        //                         {category.key}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>
        //         Additional Activities:<Multiselect
        //   isObject={false}
        //   onRemove={(event) => {
        //     console.log(event);
        //   }}
        //   onSelect={(event) => {
        //     console.log(event);
        //     setActivities(event)
        //   }}
        //   options={cat.map((category) => category.value)}
        //   selectedValues={doc.category}
        //   showCheckbox
        // />
        //   </form>
        //   <button onClick={()=>updateEvent(doc.id)}>Submit Changes</button>
        //    <button onClick={()=>deleteEvent(doc.id)}>Remove Event</button>
        // </div>
        // )} */}

        {events.map((doc)=>
        <div key={doc.id}>
          <form key={doc.id}>
            Event:<input type="text" defaultValue={doc.name} onChange={(e)=>setName(e.target.value && doc.name)}/>
            Location:{doc.location.address}
            <PlacesAutocomplete defaultValue={doc.location.address} setSelected={setSelected} />
            Description:<textarea type="text" defaultValue={doc.description} onChange={(e)=>setDescription(e.target.value)}/>
            # of People:
            <NumberPicker min={1} defaultValue={doc.headcount} onChange={headcount => setHeadcount(headcount)} />
            Age Range:<div className="age-menu">
                        <select className="age-searchBar"  defaultValue={doc.age} onChange={(e)=> setAge(e.target.value)} name="ages">
                            {ageRange.map((age) => (
                            <option key={age.key} className="ageOption">
                                {age.value}
                            </option>
                            ))}
                        </select>
                    </div>
            Date: <input type="date" defaultValue={doc.date}
                    onChange={(e) => setDate(e.target.value)} />
            Start:<div className="age-menu">
                        <select className="age-searchBar" defaultValue={doc.startTime} onChange={(e)=> setStartTime(e.target.value)} name="ages">
                            {timeRange.map((time) => (
                            <option key={time.key} className="ageOption">
                                {time.value}
                            </option>
                            ))}
                        </select>
                        <select className="age-searchBar" defaultValue={doc.amPm} onChange={(e)=> setMornAft(e.target.value)} name="ages">
                            {amPM.map((time) => (
                            <option key={time.key} className="ageOption">
                                {time.value}
                            </option>
                            ))}
                        </select>
                    </div>
            Activity: <div>
                    <select className="activityBar" defaultValue={doc.icon} onChange={e=>setIcon(e.target.value)}>
                        {categories.map((category)=>(
                            <option key={category.key} value={category.value} className="activityOption">
                                {category.key}
                            </option>
                        ))}
                    </select>
                </div>
                Additional Activities:<Multiselect
          isObject={false}
          onRemove={(event) => {
            console.log(event);
          }}
          onSelect={(event) => {
            console.log(event);
            setActivities(event)
          }}
          options={cat.map((category) => category.value)}
          selectedValues={doc.category}
          showCheckbox
        />
          </form>
          <button onClick={()=>updateEvent(doc.id)}>Submit Changes</button>
           <button onClick={()=>deleteEvent(doc.id)}>Remove Event</button>
        </div>
        )}

      <div>Attending Events:</div>
       
      {events.map((doc) =>
        <div key={doc.id} onClick={() => setSelectedEvent(doc)}>
          <h2>{doc.name}</h2>
          <p>{doc.description}</p>
          <button onClick={() => viewEditEvent(selectedEvent)}>Edit</button>
          <button onClick={()=>deleteEvent(doc.id)}>Remove</button>
        </div>)}

    </>
  )
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  
  //This handles the event of clicking on the address.
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng, address });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder={"Change address"}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
export default EventList