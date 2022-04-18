import React, { useState } from "react";
import Image from "../assests/images/image.jpg";
import "../assests/stylesheets/LandingPage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LandingPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  //get started onClick event handler
  const handleClick = (event) => {
    event.preventDefault();
    console.log("get started clicked");
    navigate("/extract");
  };
  console.log;
  return (
    <>
      <div className="container">
        <div className="container-1">
          <p className="text-1">Artificial Intelligence</p>
          <p className="text-2">Business Card Detector</p>
        </div>
        <div className="container-2">
          <img src={Image} alt="sketch" className="image-sketch" />
        </div>
      </div>
    </>
  );
};
export default LandingPage;
