import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div>
        <footer>
          <section>
            <Link to={"/home"}>MAP ICON</Link>
            <Link>FRIENDS LIST ICON</Link>
            <Link>CREATE EVENT ICON</Link>
            <Link>PROFILE ICON</Link>
            <Link>SETTINGS DROPDOWN</Link>
          </section>
        </footer>
      </div>
    </>
  );
};

export default Footer;
