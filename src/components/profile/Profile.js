import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../app/FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";

import Footer from "../homepage/Footer";

const Profile = () => {
    const [user] = useAuthState(auth)
    const [name, setName] = useState("")
    const [image, setProfileImg] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState("")
    const [activities, setActivities] = useState([])
    const [instagram, setInstagram] = useState("")
    const [facebook, setFacebook] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [tiktok, setTiktok] = useState("")
    const navigate = useNavigate()

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
            setFacebook(data.fb)
            setInstagram(data.insta)
            setWhatsapp(data.whatsapp)
            setTiktok(data.tiktok)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [user])
    return (
        <>
            <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" alt="" style={{ height: "50px", width: "50px" }} onClick={() => navigate("/home")} />
            <Link to="editprofile"><img src="https://i.pinimg.com/originals/53/79/9d/53799d51a62bd28cb04c8a4c57f054c9.png" style={{ height: "50px", width: "50px" }} alt="" /></Link>
            <div>My profile</div>
            <h1>{name}</h1>
            <img src={image} alt="" style={{ height: "50px", width: "50px" }} />
            <p>Age: {age}</p>
            <p>About me:{bio}</p>
            <p>My interests:</p>
            {activities ? activities.map((activity) => (
                <p key={activity}>{activity}</p>
            )) : <p>No activities yet</p>}
            <Link to="friendslist"><button><img src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/contacts-1024.png" width={35}
                height={35} alt="" /></button></Link>
                <div className="medialinks">
                {facebook ? <a href={facebook} target="_blank"><img src="https://img.icons8.com/color/512/facebook-new.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {instagram ? <a href={instagram} target="_blank"><img src="https://img.icons8.com/color/512/instagram-new.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {tiktok ? <a href={tiktok} target="_blank"><img src="https://img.icons8.com/color/512/tiktok.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {whatsapp ? <a href={whatsapp} target="_blank"><img src="https://img.icons8.com/color/512/whatsapp.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                </div>
        </>
    )


}

export default Profile;
