import React from "react";
// import { toast } from "react-toastify";
import "./Toggle.css"

const Toggle = ({ label }) => {

// const handleNotifications = () => {
//     toast.dismiss()
// }

  return (
    <div className="container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" id={label} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default Toggle
