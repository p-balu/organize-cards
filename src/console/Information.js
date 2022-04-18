import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput/TextInput";
import "../assests/stylesheets/Information.css";
import { titleCase } from "title-case";

const Information = ({ extractedData, image }) => {
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

  //api for the saving the data into database will be done here
  const handleSave = (event) => {
    event.preventDefault();
    console.log("save inforamtion");
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        title: title,
        email: email,
        phone: phone,
        image: image,
        organization: organization,
        city: city,
        address: address,
        postal: postal,
        state: state,
        user_id: localStorage.getItem("user"),
      }),
    };
    fetch("http://localhost:8000/contacts", request)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setError("");
          setSucces("");
          setSucces("Contact saved successfully");
          setAddress("");
          setCity("");
          setEmail("");
          setName("");
          setOrganization("");
          setPhone("");
          setPostal("");
          setState("");
          setTitle("");
        } else {
          setSucces("");
          setError("");
          setError("Server Error Occured");
        }
      });
  };

  useEffect(() => {
    if (extractedData.name !== undefined) {
      setName(extractedData.name.join());
    }
    if (extractedData.address !== undefined) {
      setAddress(extractedData.address.join());
    }
    if (extractedData.organization !== undefined) {
      setOrganization(extractedData.organization.join());
    }
    if (extractedData.city !== undefined) {
      setCity(extractedData.city.join());
    }
    if (extractedData.email !== undefined) {
      setEmail(extractedData.email.join());
    }
    if (extractedData.phone !== undefined) {
      setPhone(extractedData.phone[1]);
    }
    if (extractedData.zip !== undefined) {
      setPostal(extractedData.zip.join());
    }
    if (extractedData.title !== undefined) {
      setTitle(extractedData.title.join());
    }
    if (extractedData.state !== undefined) {
      setState(extractedData.state.join());
    }
  }, [extractedData]);

  return (
    <>
      {success && <div className="success">{titleCase(success)}</div>}
      {error && <div className="error">{titleCase(error)}</div>}{" "}
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
        <button onClick={handleSave} className="button-6">
          Save Info
        </button>
      </div>
    </>
  );
};

export default Information;
