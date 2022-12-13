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
             <img src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/contacts-1024.png" alt="" style={{height:"55px", width:"50px"}}/>
            {friends ? friends.map((friend)=>{
                <p>{friend}</p>
            }): <h3>Create or join an event to make friends!</h3>}
        </div>
    )
}

export default FriendsList