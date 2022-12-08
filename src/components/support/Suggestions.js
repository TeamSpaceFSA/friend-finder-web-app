import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Suggestions = () => {
    const navigate = useNavigate()
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()
        emailjs.sendForm('service_3jw893d','template_6qlxifj', form.current,'AqgOIi6VWptFhDlEm')
        .then((result)=>{
            toast('😊 Message Sent!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.log(result)
        },(err)=>{
            console.log(err)
        })
        e.target.reset()
    }
return(
    <div>
        <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/>
        <form ref={form} onSubmit={sendEmail}>
        <h1>Name:</h1>
        <input type="text" name="user_name"/>
        <h1>Email:</h1>
        <input type="text" name="user_email"/>
        <h1>Subject:</h1>
        <input type="text" name="subject"/>
        <h1>Message:</h1>
        <textarea name="message"/>
        <input type="submit" value="Send"/>
        </form>
    </div>
)
}

export default Suggestions