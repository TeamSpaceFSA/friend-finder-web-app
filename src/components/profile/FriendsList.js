import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../app/FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";

const FriendsList = () => {
    const [ user ] = useAuthState(auth)
    const [ friends, setFriends ] = useState("")
    const [visible, setVisible] = useState(false)
    const [hidden, setHidden] = useState(false)
    const navigate = useNavigate()

    const fetchFriends = async () => {
        try{
            const q = query(collection(db,"friendslist"), where("uid", "==",user.uid))
            const data = await getDocs(q)
            setFriends(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = () => {
        setVisible(current => !current)
    }
    const click = () => {
        setHidden(current => !current)
    }

    useEffect(()=>{
        fetchFriends()
    },[user])
    
    return(
        <div className="friendslist">
             <img src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/contacts-1024.png" alt="" style={{height:"55px", width:"50px"}}/>
            
            <h3 onClick={handleClick}>Friend Requests(1)</h3>
            {visible ?<div>
            <p>greenPotato</p>
            <button>✓</button>
            <button>X</button>
             </div> : null}
            <h3 onClick={click}>Friends(4)</h3>
            {hidden ? <div>
               <p>Winter</p> 
               <p>sunpancakes</p>
               <p>kiwiCoffee</p>
               <p>Lightningbear</p>
            </div>: null}
            
            {/* {friends.requested ? friends.requested.map((friend)=>{
                <p>{friend}</p>
            }): <h2>Create or join an event to make friends!</h2>} */}
        </div>
    )
}

export default FriendsList