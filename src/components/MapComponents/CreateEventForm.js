import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../app/FirebaseConfig"
import { doc, setDoc, collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { NumberPicker } from "react-widgets";

const CreateEventForm = () => {
    const [ user ] = useAuthState(auth)
    const navigate = useNavigate()

    //This state is needed for our address search bar functionality to handle the selected address.
    const [ selected, setSelected] = useState(null);

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

    //This allows us to create a new event in Firebase when the user clicks the 'create event' button at
    //the bottom of the CreateEventForm.
    const submit = async (e) => {
        try{
            e.preventDefault();
            await addDoc(collection(db, "events"), {
                name: name,
                category: activities,
                description: description,
                headcount: headcount,
                startTime: startTime,
                endTime: endTime,
                age: age,
                location: selected,
                user: user.uid
            });
            navigate("/home");
        } catch (err) {
            console.log(err)
        }
    }


    return(
        <>
        <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
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
                    <NumberPicker value={headcount} onChange={headcount => setHeadcount(headcount)} />
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
                <h1>Location:</h1>
                <PlacesAutocomplete setSelected={setSelected} />
                <button onClick={submit}>Create Event</button>
            </form>
        </div>
        </>
    )

};

//This creates the autocomplete-address-search-bar that we can use to set locations for the event.
//This is implemented on line 129.
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
      setSelected({ lat, lng });
    };
  
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
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

export default CreateEventForm;