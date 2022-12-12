import React from "react";

const AcceptedUsers = () => {
    // grab host information to display on info popup
    const [profName, setName] = useState("")
    const [profimage, setProfileImg] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState("")
    const [activities, setActivities] = useState([])
    const [instagram, setInstagram] = useState("")
    const [facebook, setFacebook] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [tiktok, setTiktok] = useState("")
    const [visible, setVisible] = useState(false)

    const fetchUser = async (userId) => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", userId))
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
}