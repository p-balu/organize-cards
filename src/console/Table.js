import React, { useState } from "react";
import { Link } from "react-router-dom";
import { titleCase } from "title-case";
import "../assests/stylesheets/Table.css";
import Modal from "../components/Modal/Modal";
import Edit from "./Edit";
const Table = ({ contacts }) => {
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState([]);
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");

  const handleEdit = (event, contactId) => {
    event.preventDefault();
    setShow(true);
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_id: contactId,
      }),
    };
    fetch("http://localhost:8000/get-contact", request)
      .then((res) => res.json())
      .then((data) => {
        setContact(data.Items[0]);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleModalClose = (value) => {
    setShow(value);
  };

  const handleDelete = (event, contactId) => {
    event.preventDefault();
    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_id: contactId,
      }),
    };
    fetch("http://localhost:8000/delete-contact", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.ResponseMetadata.HTTPStatusCode == 200) {
          setSucces("Contact deleted successfully");
        } else {
          setError("Server Error Occured");
        }
      });
  };
  return (
    <>
      {success && <div className="success">{titleCase(success)}</div>}
      {error && <div className="error">{titleCase(error)}</div>}{" "}
      <h3 className="h3">Search Results</h3>
      <table
        className="table table-striped"
        style={{
          textAlign: "center",
          color: "black",
          background: "white",
          marginBottom: "6%",
        }}
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Organization</th>
            <th scope="col">Title</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Zip</th>
            <th scope="col">State</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(contacts).length === 0 ? (
            <tr>
              <td
                colSpan="10"
                style={{
                  fontSize: "2rem",
                  fontWeight: "500",
                  marginTop: "2%",
                  textAlign: "center",
                }}
              >
                No Search results found
              </td>
            </tr>
          ) : (
            <tr>
              <td>{contacts.name}</td>
              <td>{contacts.organization}</td>
              <td>{contacts.title}</td>
              <td>{contacts.email}</td>
              <td>{contacts.phone}</td>
              <td>{contacts.address}</td>
              <td>{contacts.city}</td>
              <td>{contacts.zip}</td>
              <td>{contacts.state}</td>
              <td>
                <button
                  onClick={(event) => {
                    handleEdit(event, contacts.contact_id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(event) => {
                    handleDelete(event, contacts.contact_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Modal
          show={show}
          handleClose={handleClose}
          style={{ width: "70%" }}
          text="log"
        >
          <Edit handleModalClose={handleModalClose} contact={contact} />
        </Modal>
      </div>
    </>
  );
};

export default Table;
