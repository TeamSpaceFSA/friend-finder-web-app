import React, {useState} from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

const [open, setOpen] = useState(false);

  return (
    <div className="nav-container">
      <div className="nav-trigger" onClick={()=>{setOpen(!open)}}>
        {/* make user's profile pic?? */}
        <img
          src="https://toppng.com/uploads/preview/menu-icon-png-3-lines-11552744384er3xmq5ix5.png"
          alt=""
        />
      </div>
     
      <div className={`nav-dropdown ${open ? 'active' : 'inactive'}`}>
        <h3>New Friend Finder<br/><span>*current user tag*</span></h3>
         <ul>
        <DropdownItem text = {"Notifications"}/>
        <DropdownItem text = {"Chat Log"}/>
        <DropdownItem text = {"About Us"}/>
        <DropdownItem text = {"Suggestions"}/>
        <DropdownItem text = {"Help"}/>
        <DropdownItem img = {"https://cdn.iconscout.com/icon/free/png-256/logout-2477642-2061904.png"} text = {"Log out"}/>
      </ul>
        <Link to="/home">
          <div>Notifications</div>
        </Link>
        <div>Chat Log</div>
        <div>About Us</div>
        <div>Suggestions</div>
        <Link to="/settings">
          <div>Help</div>
        </Link>
        <div>log out</div>
      </div>
    </div>
  );
};

function DropdownItem(){
    return();
}

export default Navbar;
