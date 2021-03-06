import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput/TextInput";
import "../assests/stylesheets/Information.css";
import { titleCase } from "title-case";

const Edit = ({ editContact, handleModalClose }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [state, setState] = useState("");
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");

  console.log(editContact.contact_id);
  //api for the saving the data into database will be done here
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("update inforamtion");
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        title: title,
        email: email,
        phone: phone,
        image: editContact.image,
        organization: organization,
        city: city,
        address: address,
        postal: postal,
        state: state,
        contact_id: editContact.contact_id,
        user_id: localStorage.getItem("user"),
      }),
    };
    fetch("http://localhost:8000/contacts", request)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setError("");
          setSucces("");
          setSucces("Contact updated successfully");
          setAddress("");
          setCity("");
          setEmail("");
          setName("");
          setOrganization("");
          setPhone("");
          setPostal("");
          setState("");
          setTitle("");
          handleModalClose(false);
          handleRefresh(true);
        } else {
          setSucces("");
          setError("");
          setError("Server Error Occured");
          handleModalClose(false);
          handleRefresh(true);
        }
      });
  };

  useEffect(() => {
    setName(editContact.name);
    setAddress(editContact.address);
    setOrganization(editContact.organization);
    setCity(editContact.city);
    setEmail(editContact.email);
    setPhone(editContact.phone);
    setPostal(editContact.zip);
    setTitle(editContact.title);
    setState(editContact.state);
  }, [editContact]);

  return (
    <>
      <div className="text-fields">
        <div className="personal-info">
          <h3 className="h3">Personal Information</h3>
          <div>
            <TextInput
              label="Name"
              name="name"
              placeholder="Enter your Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name || ""}
            />
            <TextInput
              label="Title"
              name="title"
              placeholder="Enter your Title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title || ""}
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email || ""}
            />
            <TextInput
              label="Phone"
              name="phone"
              placeholder="Enter your Phone number"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              value={phone || ""}
            />
          </div>
        </div>
        <div className="address-info">
          <h3 className="h3">Address Information</h3>
          <div>
            <TextInput
              label="Organization"
              name="organization"
              placeholder="Enter your Organization"
              onChange={(event) => {
                setOrganization(event.target.value);
              }}
              value={organization || ""}
            />
            <TextInput
              label="Address"
              name="address"
              placeholder="Enter your Address"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              value={address || ""}
            />
            <TextInput
              label="City"
              name="city"
              placeholder="Enter your City"
              onChange={(event) => {
                setCity(event.target.value);
              }}
              value={city || ""}
            />
            <div className="sub-address-info">
              <TextInput
                label="State"
                name="state"
                style={{ width: "54%" }}
                placeholder="Enter your State"
                onChange={(event) => {
                  setState(event.target.value);
                }}
                value={state || ""}
              />
              <TextInput
                label="Postal Code"
                name="postal"
                style={{ width: "55%", marginLeft: "3%" }}
                placeholder="Enter your Postal Code"
                onChange={(event) => {
                  setPostal(event.target.value);
                }}
                value={postal || ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button-container" style={{ maxWidth: "90%" }}>
        <button onClick={handleUpdate} className="button-6">
          Update Info
        </button>
      </div>
    </>
  );
};

export default Edit;
