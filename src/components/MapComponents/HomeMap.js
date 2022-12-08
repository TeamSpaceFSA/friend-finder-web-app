import React, { useState, useMemo, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, InfoWindowF } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { db } from "../../app/FirebaseConfig"
import { onSnapshot, query, collection, doc, getDocs, documentId } from "firebase/firestore";

const HomeMap = () => {
  //Need 'libraries' for Google Maps API.
  const libraries = ["places"]
  const navigate = useNavigate()
  
  //This is the 'events' state so we can change/modify our state of All Events.
  const [events, setEvents] = useState([])

  //This is simply something we need for our maps to show up. Can't really explain how it works besides the fact that
  //we need our API Key for Google Maps to be somewhere on the page.
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBGp2IIHledlGmrdnK8M7x7QMn3GE6uiIg",
    libraries: libraries,
  })

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
    }
  }

  //This is the function that routes us to our SingleEventView.js component page.
  const viewSingleEvent = () => {
    // Here, we pass the variable 'selectedMarker' as a value for our key 'state' so our SingleEventView 
    // component recognizes which event we are referring to.
    navigate("/singleEventView", {state: selectedMarker})
    console.log("Here is the selectedMarker", selectedMarker)
  }

  //Fetch all events everytime the page is loaded.
  useEffect(() => {
    fetchEvents()
  }, [])

  
  // const [selected, setSelected] = useState(null); //This was the state for our SearchBar autocomplete functionality. Since we took the searchbar out of the Homepage for right now,
  // I've commented it out as well as the <PlacesAutoComplete /> div & the PlacesAutoComplete function on line 84. Commented it out for now in case we want to bring it back later.
  const [markers, setMarkers] = useState([]);
  const [ selectedMarker, setSelectedMarker ] = useState("")




  if (!isLoaded) return (<div>Loading...</div>)
  return (
    <>
      <div>Available Events</div>
      <div className="places-container">
        {/* <PlacesAutocomplete setSelected={setSelected} /> */}
      </div>
      <GoogleMap zoom={10} center={{ lat: 40.7580, lng: -73.9855 }} mapContainerClassName="map-container">
        {markers.map(marker => <MarkerF key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} icon="https://i.imgur.com/OX3qSvl.png" />)}
        {console.log(events)}
        {events.map(event => <MarkerF key={event.name} position={{ lat: event.location.lat, lng: event.location.lng }} icon={event.icon} onClick={() => setSelectedMarker(event)}/>)}
        {selectedMarker && <InfoWindowF key={selectedMarker.name} position={{lat: selectedMarker.location.lat, lng: selectedMarker.location.lng}}>
            <>
            <h1>{selectedMarker.name}</h1>
            <p>{selectedMarker.description}</p>
            <button onClick={() => viewSingleEvent(selectedMarker)}>Event Details</button>
            
            </>
          </InfoWindowF>}
      </GoogleMap>
    </>
  )
}

//This creates the autocomplete-address-search-bar that we can use to set locations. 
// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   //This handles the event of clicking on the address.
//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };








export default HomeMap