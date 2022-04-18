import React, { useState } from "react";
import { titleCase } from "title-case";

const RegistrationForm = ({ handleTabLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault();
    console.log("Registration Button clicked");
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        role: "user",
      }),
    };
    fetch("http://localhost:8000/register", request)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setError("");
          setMessage("User registered successfully");
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
        } else {
          setMessage("");
          setError("error occured");
        }
      });
  };

  const handleLogin = () => {
    handleTabLoginChange(false);
  };

  return (
    <form className="form-fields" onSubmit={handleRegistration}>
      {message && <div className="success">{titleCase(message)}</div>}
      {error && <div className="error">{titleCase(error)}</div>}

      <div className="form-field">
        <label
          htmlFor="firstName"
          id="firstName"
          name="firstName"
          className="label"
        >
          First Name
        </label>{" "}
        <input
          type="text"
          className="text-input"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label
          htmlFor="lastName"
          id="lastName"
          name="lastName"
          className="label"
        >
          Last Name
        </label>{" "}
        <input
          type="text"
          className="text-input"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email" id="email" name="email" className="label">
          Email
        </label>{" "}
        <input
          type="email"
          className="text-input"
          id="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <label
          htmlFor="password"
          id="password"
          name="password"
          className="label"
        >
          Password
        </label>{" "}
        <input
          type="password"
          className="text-input"
          id="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button name="button" className="button-3">
        SIGN UP
      </button>
      <p className="footer">
        Already have account?{" "}
        <button onClick={handleLogin} className="sign-up-now">
          Log In
        </button>
      </p>
    </form>
  );
};
export default RegistrationForm;
