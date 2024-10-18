import React from "react";
import "./footer.css";
import {useSelector} from "react-redux"
const Footer = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen); // Get sidebar state
  return (
    <div id="footer" className={`footer ${!isSidebarOpen ? "footerOpen" : ""}`}>
      <div className="about">
        <div className="header ">
          <h3>Who we are:</h3>
        </div>
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            asperiores dolore aut sapiente culpa soluta voluptatibus illo. Magni
            expedita dolorem illum
          </p>
        </div>
        <div className="text">
          <i className="fa-solid fa-phone">&nbsp;+216 54 431 522</i>
          <br />
          <i className="fa-solid fa-location-dot">&nbsp;&nbsp;Gabes center</i>
          <br />
          <i className="fa-solid fa-envelope">&nbsp;&nbsp;deivengo@gmail.com</i>
        </div>
      </div>
      <div className="copy">
        <p>&copy; Baboucha 2024</p>
      </div>
    </div>
  );
};

export default Footer;
