import React, { useState, useMemo, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useNavigate } from "react-router-dom";
import { CreateEventForm } from '../index.js'
import { setDoc } from "firebase/firestore";



const CreateEventMap = () => {
    const libraries = ["places"]
    const navigate = useNavigate()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBGp2IIHledlGmrdnK8M7x7QMn3GE6uiIg",
        libraries: libraries,
    })

    
    const [ selected, setSelected] = useState(null);
    const [ markers, setMarkers ] = useState([]);

    //This handles our click event to track the location of where we've placed a marker onto the map.
    const onMapClick = useCallback((e) => {
      navigate("/createEventForm")
      
      setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          },
        ]);
      }, []);



    if (!isLoaded) return (<div>Loading...</div>)

    return (
        <>
        <div>Here is the map!</div>
        <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
        </div>
        <GoogleMap zoom={10} center={{lat: 40.7580, lng: -73.9855}} mapContainerClassName="map-container" onClick={onMapClick}>
            <MarkerF position={{lat: 40.7580, lng: -73.9855}} icon="https://i.imgur.com/OX3qSvl.png"></MarkerF>
            {selected && <MarkerF position={selected}  icon="https://i.imgur.com/OX3qSvl.png" />}
            {markers.map(marker => <MarkerF key={marker.time.toISOString()} position={{lat: marker.lat, lng: marker.lng}}  icon="https://i.imgur.com/OX3qSvl.png"/>)}
        </GoogleMap>
        </>
    )
}

//This creates the autocomplete-address-search-bar that we can use to set locations. 
const PlacesAutocomplete = ({ setSelected }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
    
    //This handles the event of clicking on the address.
    //Somehow, we want to handle clicking the address, and then popping up the create event form.
    //From there, once the create event form is submitted, we want the event to show up.
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








export default CreateEventMap