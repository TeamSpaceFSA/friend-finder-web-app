import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../app/FirebaseConfig"
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore"
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [image, setProfileImg] = useState("")
  const [bio, setBio] = useState("")
  const [age, setAge] = useState("")
  const [activities, setActivities] = useState([])

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.username)
      setProfileImg(data.photo)
      setBio(data.bio)
      setAge(data.age)
      setActivities(data.activities)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [user])

  const submit = async (e) => {
    try {
      e.preventDefault();
      console.log(user.uid)
      console.log(user)
      await updateDoc(doc(db, "users", user.uid), {
        photo: image,
        username: name,
        age: age,
        bio: bio,
        activities: activities,
        uid: user.uid
      });
      navigate("/profile")
      toast('😊 Profile Updated!', {
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

  return (
    <div>
      <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{ height: "50px", width: "50px" }} onClick={() => navigate(-1)} />
      <h1>Edit Profile</h1>
      <form>
        <h2>Image file:</h2>
        <input type="text" value={image}
          onChange={(e) => setProfileImg(e.target.value)} />
        <h1>Username:</h1>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <h1>Age Range:</h1>
        <div className="age-menu">
          <select className="age-searchBar" onChange={(e) => setAge(e.target.value)} name="ages" value={age}>
            {ageRange.map((age) => (
              <option key={age.key} className="ageOption">
                {age.value}
              </option>
            ))}
          </select>
        </div>
        <h1>Bio:</h1>
        <input type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)} />
        <h1>Favorite Activities:</h1>
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
          selectedValues={activities}
          showCheckbox
        />
        <button onClick={submit}>Update Profile</button>
      </form>
    </div>
  )

}

export default EditProfile