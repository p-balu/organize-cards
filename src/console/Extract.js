import React, { useState, useEffect } from "react";
import "../assests/stylesheets/Extract.css";
import Add from "./Add";
import Search from "./Search";

const ContainerHeader = ({ active, handleActive }) => {
  const [buttonClass, setButtonClass] = useState("");
  const [buttonClass1, setButtonClass1] = useState("");

  const handleExtract = () => {
    handleActive(true);
  };

  useEffect(() => {
    console.log("entered", active);
    const buttonClass = active ? "button1 active" : "button1";
    const buttonClass1 = active ? "button1" : "button1 active";
    setButtonClass(buttonClass);
    setButtonClass1(buttonClass1);
  }, [active]);

  const handleMyContacts = () => {
    handleActive(false);
  };

  return (
    <div className="container-header">
      <button className={buttonClass} onClick={handleExtract}>
        Extract and Add
      </button>
      <button className={buttonClass1} onClick={handleMyContacts}>
        My Contacts
      </button>
    </div>
  );
};
const Extract = () => {
  const [active, setActive] = useState(true);

  const handleActive = (value) => {
    setActive(value);
  };

  return (
    <div className="container-5">
      <ContainerHeader active={active} handleActive={handleActive} />
      {active == true ? <Add /> : <Search />}
    </div>
  );
};
export default Extract;
