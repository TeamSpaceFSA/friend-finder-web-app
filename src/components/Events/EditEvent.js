import React, {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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

const EditEvent = () => {
    const [user] = useAuthState(auth)
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
      name:aname,
      description: adescription,
      location: selected,
      category:aactivities,
      headcount: aheadcount,
      startTime: astartTime,
      age: aage,
      user: user.uid,
      amPm: amornAft,
      date: adate,
      icon: aicon
    })
    toast('Event updated! Please wait for changes to take effect', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/profile/eventList")
    }catch(err){
      console.log(err)
    }
  }

    const location = useLocation()

    const event = location.state

    const { name, category, headcount, startTime, description,age,amPm,date,icon,id } = event

    const [ selected, setSelected] = useState(null);
    const [aname, setName] = useState(name)
    const [ adescription, setDescription ] = useState(description)
  const [ aheadcount, setHeadcount ] = useState(headcount)
  const [ astartTime, setStartTime ] = useState(startTime)
  const [ aage, setAge ] = useState(age)
  const [ aactivities, setActivities ] = useState(category)
  const [ adate, setDate ] = useState(date)
  const [ amornAft, setMornAft ] = useState(amPm)
  const [ aicon, setIcon ] = useState(icon)
    
    console.log("This is the event we clicked on", event)
    
    return(
        <div>
        <form key={id}>
          Event:<input type="text" value={aname} onChange={(e)=>setName(e.target.value)}/>
        Location:{event.location.address}
        <PlacesAutocomplete value={event.location.address} setSelected={setSelected} />
        Description:<textarea type="text" value={adescription} onChange={(e)=>setDescription(e.target.value)}/>
        # of People:
        <NumberPicker min={1} value={aheadcount} onChange={headcount => setHeadcount(headcount)} />
        Age Range:<div className="age-menu">
    <select className="age-searchBar"  value={aage} onChange={(e)=> setAge(e.target.value)} name="ages">
            {ageRange.map((age) => (
                    <option key={age.key} className="ageOption">
                             {age.value}
                           </option>
                       ))}
                    </select>
                    </div>
            Date: <input type="date" value={adate}
                    onChange={(e) => setDate(e.target.value)} />
            Start:<div className="age-menu">
                       <select className="age-searchBar" value={astartTime} onChange={(e)=> setStartTime(e.target.value)} name="ages">
                        {timeRange.map((time) => (
                           <option key={time.key} className="ageOption">
                               {time.value}
                           </option>
                           ))}
                    </select>
                        <select className="age-searchBar" value={amornAft} onChange={(e)=> setMornAft(e.target.value)} name="ages">
                            {amPM.map((time) => (
                           <option key={time.key} className="ageOption">
                                {time.value}
                           </option>
                           ))}
                       </select>
                    </div>
        Activity: <div>
                <select className="activityBar" value={aicon} onChange={e=>setIcon(e.target.value)}>
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
          selectedValues={aactivities}
          showCheckbox
        />
          </form>
          {selected == null ? <button disabled={true} onClick={()=>updateEvent(id)}>Submit Changes</button> : <button onClick={()=>updateEvent(id)}>Submit Changes</button>}
         </div>
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
          placeholder={"Please reconfirm address when updating"}
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

export default EditEvent