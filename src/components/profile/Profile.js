import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../app/FirebaseConfig"
import { query, collection, getDocs, where } from "firebase/firestore"

const Profile = () => {
    const [ user ] = useAuthState(auth)
    const [ name, setName ] = useState("")
    const [ image, setProfileImg ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ age, setAge ] = useState("")
    const [ activities, setActivities ] = useState([])
    const navigate = useNavigate()

    const fetchUser = async () => {
    try{
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.username)
        setProfileImg(data.photo)
        setBio(data.bio)
        setAge(data.age)
        setActivities(data.activities)
        console.log(data)
    }catch(err){
        console.log(err)
    }
 }    
 useEffect(()=>{
    fetchUser()
 },[user])
 return(
    <>
    <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
    <Link to="editprofile"><img src="https://i.pinimg.com/originals/53/79/9d/53799d51a62bd28cb04c8a4c57f054c9.png" style={{height:"50px", width:"50px"}}/></Link>
       <div>My profile</div> 
       <h1>{name}</h1>
       <img src={image} style={{height:"50px", width:"50px"}}/>
       <p>Age: {age}</p>
       <p>About me:{bio}</p>
       <p>My interests:</p>
       {activities.map((activity)=>(
        <p key={activity}>{activity}</p>
       ))}

      </> 
    )
        

}

export default Profile