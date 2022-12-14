import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Suggestions = () => {
  // const navigate = useNavigate()
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_3jw893d",
        "template_6qlxifj",
        form.current,
        "AqgOIi6VWptFhDlEm"
      )
      .then(
        (result) => {
          toast("😊 Message Sent!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(result);
        },
        (err) => {
          console.log(err);
        }
      );
    e.target.reset();
  };
  return (
    <div className="suggestions">
      {/* <img src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png" style={{height:"50px", width:"50px"}} onClick={()=>navigate(-1)}/> */}
      <img
        src="https://cdn0.iconfinder.com/data/icons/random-1-1/100/chat-1024.png"
        alt=""
        style={{height:"130px", width:"130px"}}
      />
      <h2 className="suggestions-header">We want to hear from you!</h2>
      <div className="suggestions-msg">Suggestions, questions, success stories, a hello.. Whatever it may be, we are always looking forward to hear from you!! </div>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" placeholder="Name" name="user_name" size={33}/>
        <input type="text" placeholder="Email" name="user_email" size={33}/>
        <br></br>
        <div>
            <h3>Your message here..</h3>
        <input type="text" placeholder="Subject" name="subject" size={33}/>
        <textarea name="message" placeholder=" Message" />
        <button classname="btn">
        <input  type="submit" value="Send" /></button> </div>
      </form>
      <div className="space"></div>
    </div>
  );
};

export default Suggestions;
