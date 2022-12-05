import React, { useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

const ProfileSetup = () => {
  const user = auth.currentUser;

  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  const submit = async (e) => {
    try {
      e.preventDefault();
      // const q =
      // const docs = await getDocs(q)
      await setDoc(collection(db, "users", user.uid), {
        photo: image,
        username: username,
        age: age,
        bio: bio,
        activities: activities,
      });
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
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

  const handleAge = async (evt) => {
    evt.preventDefault();
  };

  const handleCategories = async (evt) => {
    evt.preventDefault();
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <h1>Already have a photo? Upload file below</h1>
      <h2>Image file:</h2>
      <input />
      <h1>Username:</h1>
      <input />
      <h1>Age Range:</h1>
      <div className="age-menu">
        <select className="age-searchBar" onChange={handleAge} name="ages">
          {ageRange.map((age) => (
            <option key={age.key} className="ageOption">
              {age.value}
            </option>
          ))}
        </select>
      </div>
      <h1>Bio:</h1>
      <input />
      <h1>Favorite Activities:</h1>
      <div>
        <Multiselect
          isObject={false}
          onRemove={(event) => {
            console.log(event);
          }}
          onSelect={(event) => {
            console.log(event);
          }}
          onKeyPressFn={handleCategories}
          options={categories.map((category) => [category.value])}
        //option to add pre-selected activities
        //   selectedValues={["arcade"]}
          showCheckbox
        />
      </div>
      <button onClick={() => submit}>Create Profile</button>
    </div>
  );
};
export default ProfileSetup;
