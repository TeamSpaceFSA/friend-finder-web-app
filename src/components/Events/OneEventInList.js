import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from "../../app/FirebaseConfig"
import { doc, query, collection, getDocs, where } from "firebase/firestore"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const OneEventInList = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const user = location.state
    const [profName, setName] = useState("")
    const [profimage, setProfileImg] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState("")
    const [activities, setActivities] = useState([])
    const [instagram, setInstagram] = useState("")
    const [facebook, setFacebook] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [tiktok, setTiktok] = useState("")
    const [visible, setVisible] = useState(true)

    const fetchUser = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user))
            const doc = await getDocs(q)
            const data = doc.docs[0].data()
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

    const friendReq = () => {
        setVisible(current => !current)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
        <img src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-1024.png" alt="" style={{ height: "40px", width: "40px" }} onClick={() => navigate(-1)} />
        <div className="userInfoDiv">
            {visible ? <button onClick={friendReq}>Request to Join!</button>:<button onClick={friendReq}>Friend Request Sent!</button>}
            <h1>{profName}</h1>
            <img src={profimage} alt="" style={{ height: "100px", width: "100px"}}/>
                <h4>{bio}</h4>
                <h4>{age}</h4>
                <h4>Favorites</h4>
                {activities ? activities.map((activity) => (
                <h4 key={activity}>{activity}</h4>
            )) : <p>No activities yet</p>}
                   <div className="medialinks">
                {facebook ? <a href={facebook} target="_blank"><img src="https://img.icons8.com/color/512/facebook-new.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {instagram ? <a href={instagram} target="_blank"><img src="https://img.icons8.com/color/512/instagram-new.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {tiktok ? <a href={tiktok} target="_blank"><img src="https://img.icons8.com/color/512/tiktok.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                {whatsapp ? <a href={whatsapp} target="_blank"><img src="https://img.icons8.com/color/512/whatsapp.png" alt="" style={{ height: "50px", width: "50px" }}/></a>: ""}
                </div><div className="space"></div>
        </div>
        </>
    )
}

export default OneEventInList;