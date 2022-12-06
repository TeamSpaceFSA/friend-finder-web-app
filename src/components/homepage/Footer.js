import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../app/FirebaseConfig";
import { signOut } from "firebase/auth";

const Footer = () => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();
  useEffect(() => {
    let dropHandler = (evt) => {
      if (!menuRef.current.contains(evt.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", dropHandler);

    return () => {
      document.removeEventListener("mousedown", dropHandler);
    };
  });

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <div>
        <footer>
          <section>
            <Link to={"/home"}><img src="https://cdn0.iconfinder.com/data/icons/real-estate-and-homes-2/85/map_location_pin_marker-1024.png" alt=""/></Link>
            <Link><img src="https://cdn0.iconfinder.com/data/icons/business-line-33/32/calendar-1024.png" alt=""/></Link>
            <Link><img src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Circle_Plus-1024.png" alt="" /></Link>
            <Link to={"/profile"}><img src="https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-1024.png" alt="" /></Link>
            <div className="nav-container" ref={menuRef}>
              <div
                className="nav-trigger"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <img
                  src="https://cdn3.iconfinder.com/data/icons/ui-icons-part-1/36/Gear_Small-512.png"
                  alt=""
                />
              </div>

              <div className={`nav-dropdown ${open ? "active" : "inactive"}`}>
                <h3>
                  New Friend Finder
                  <br />
                  <span>*current user tag*</span>
                </h3>
                <ul>
                  <DropdownItem text={"Notifications"} />
                  <DropdownItem text={"Chat Log"} />
                  <Link to="/about">
                    <DropdownItem text={"About Us"} />
                  </Link>
                  <Link to="/suggestions">
                    <DropdownItem text={"Suggestions"} />
                  </Link>
                  <Link to="/help">
                    <DropdownItem text={"Help"} />
                  </Link>
                  {/* <DropdownItem 
                    img={
                      "https://cdn.iconscout.com/icon/free/png-256/logout-2477642-2061904.png"
                    }
                    text={"Log out"}
                  /> */}
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </footer>
      </div>
    </>
  );
};

function DropdownItem(props) {
  return (
    <li className="nav-dropItem">
      <img src={props.img} alt="" />
      <h6>{props.text}</h6>
    </li>
  );
}

export default Footer;
