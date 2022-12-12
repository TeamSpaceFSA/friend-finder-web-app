import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../app/FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";

const FriendsList = () => {
    const [ user ] = useAuthState(auth)
    const [ friends, setFriends ] = useState("")
    const navigate = useNavigate()

    const fetchFriends = async () => {
        try{
            const q = query(collection(db,"friendslist"), where("uid", "==",user.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0].data()
            console.log(data)
            setFriends(data.friend)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchFriends()
    },[user])
    return(
        <div className="friendslist">
             <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" alt="" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
            <h2>Friends:</h2>
            {friends ? friends.map((friend)=>{
                <p>{friend}</p>
            }): <h2>Create or join an event to make friends!</h2>}
        </div>
    )
}

export default FriendsList