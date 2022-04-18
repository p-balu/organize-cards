import React, { useEffect, useState } from "react";
import "../assests/stylesheets/LoginRegistrationModal.css";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
const Login = ({ handleModalClose }) => {
  const [active, setActive] = useState(true);
  const [tab, setTab] = useState(false);
  const [buttonClass, setButtonClass] = useState("");
  const [buttonClass1, setButtonClass1] = useState("");

  const handleLogin = () => {
    setActive(true);
    setTab(false);
  };

  useEffect(() => {
    console.log("entered", active);
    const buttonClass = active ? "button1 active" : "button1";
    const buttonClass1 = active ? "button1" : "button1 active";
    setButtonClass(buttonClass);
    setButtonClass1(buttonClass1);
  }, [active]);

  const handleSignUp = () => {
    console.log("signup clicked");
    setActive(false);
    setTab(true);
  };

  const handleTabChange = (value) => {
    console.log(value);
    setTab(value);
    setActive(false);
  };

  const handleTabLoginChange = (value) => {
    setTab(value);
    setActive(true);
  };

  const handleModalLoginClose = (value) => {
    handleModalClose(value);
  };
  return (
    <>
      <div className="modal-header">
        <button className={buttonClass} onClick={handleLogin}>
          Log In
        </button>
        <button className={buttonClass1} onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
      {tab == false ? (
        <LoginForm
          handleTabChange={handleTabChange}
          handleModalLoginClose={handleModalLoginClose}
        />
      ) : (
        <RegistrationForm handleTabLoginChange={handleTabLoginChange} />
      )}
    </>
  );
};
export default Login;
