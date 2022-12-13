import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../app/FirebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Toggle from "../toggle/Toggle";
import { toast } from "react-toastify";

const Footer = () => {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.username);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

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

  const handleNotifications = async (evt) => {
    try {
      evt.preventDefault();
      //turn off
      toast.dismiss();
    } catch (err) {
      console.log(err);
      //turn on if off
    }
  };

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <footer>
        <section>
          <Link to={"/home"}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/paper-fold-map-chart-location-1024.png"
              alt=""
            />
          </Link>
          <Link to={"/profile/eventList"}>
            <img
              src="https://cdn0.iconfinder.com/data/icons/business-line-33/32/calendar-1024.png"
              alt=""
            />
          </Link>
          <Link to={"/profile/createEventForm"}>
            <img
              className="footer-addIcon"
              src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Circle_Plus-1024.png"
              alt=""
            />
          </Link>
          <Link to={"/profile"}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/web-mobile-app-basics/100/TiNY2_BASICS_Profile-512.png"
              alt=""
            />
          </Link>
          <div className="nav-container" ref={menuRef}>
            <div
              className="nav-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/freeline/32/Settings_gear_setting_tools-1024.png"
                alt=""
              />
            </div>

            <div className={`nav-dropdown ${open ? "active" : "inactive"}`}>
              <h3>
                <strong>New Friends+</strong>
                <br />
                <span>@{name}</span>
              </h3>
              <ul>
                {/* <DropdownItem text={"Notifications"} /> */}
                <li>
                  <Toggle
                    onChange={(evt) => console.log(evt)}
                    onClick={handleNotifications}
                    label="Notifications"
                  />
                </li>
                {/* <DropdownItem text={"Chat Log"} /> */}
                <Link to="/profile/editprofile">
                  <DropdownItem text={"Edit Profile"} />
                </Link>
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
    </>
  );
};

function DropdownItem(props) {
  return (
    <li className="nav-dropItem">
      {/* <img src={props.img} alt="" /> */}
      <h6>{props.text}</h6>
    </li>
  );
}

export default Footer;
