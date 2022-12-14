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
            <h2>My New Friends</h2>
            <h3 onClick={handleClick}><em>Friend Requests(1)</em></h3>
            {visible ?<div className="newfriend">
            <p>Green Potato</p>
            <button>                      <img src="https://cdn2.iconfinder.com/data/icons/funtime-objects-part-2/60/005_056_okay_approve_check_test_good_vote-1024.png" alt="" style={{ height: "20px", width: "20px" }}/>
</button>
            <button>                        <img src="https://cdn1.iconfinder.com/data/icons/smallicons-controls/32/614397-x-1024.png" alt="" style={{ height: "20px", width: "20px" }}/>
</button>
             </div> : null}
            <h3 onClick={click}><em>Friends(4)</em></h3>
            {hidden ? <div >
               <p className="newfriend">Winter</p> 
               <p className="newfriend">sunpancakes</p>
               <p className="newfriend">kiwiCoffee</p>
               <p className="newfriend">Lightningbear</p>
            </div>: null}
            
            {/* {friends.requested ? friends.requested.map((friend)=>{
                <p>{friend}</p>
            }): <h2>Create or join an event to make friends!</h2>} */}
        <div className="space"></div></div>
    )
}

export default FriendsList