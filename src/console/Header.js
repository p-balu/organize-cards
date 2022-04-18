import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Login from "./Login";
const Header = () => {
  const ref = useRef(null);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  //event handlers
  const handleLogin = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleModalClose = (value) => {
    setShow(value);
  };

  return (
    <>
      <div className="header">
        <div>
          <h2>Organize Business Cards</h2>
        </div>
        <div className="navLinks">
          {localStorage.getItem("user") !== null &&
          localStorage.getItem("user").length > 0 ? (
            <button className="link1" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="link1" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
      <div>
        <Modal show={show} handleClose={handleClose} text="log">
          <Login handleModalClose={handleModalClose} />
        </Modal>
      </div>
    </>
  );
};

export default Header;
