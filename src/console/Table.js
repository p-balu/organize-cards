import React, { useState, useEffect } from "react";
import { titleCase } from "title-case";
import "../assests/stylesheets/Table.css";
import Modal from "../components/Modal/Modal";
import Edit from "./Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faEdit,
  faDeaf,
  faDeleteLeft,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
const Table = ({ contacts, handleRefresh }) => {
  const [show, setShow] = useState(false);
  const [editContact, setEditContact] = useState([]);
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
        setEditContact(data.Items[0]);
        handleRefresh(true);
      });
  };

  const handleClose = () => {
    setShow(false);
    handleRefresh(true);
  };

  const handleModalClose = (value) => {
    setSucces("");
    setError("");
    setShow(value);
    handleRefresh(true);
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
          console.log("entered");
          setSucces("Contact deleted successfully");
          handleRefresh(true);
          setError("");
          console.log("entered1");
        } else {
          setError("Server Error Occured");
          handleRefresh(true);
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
          {contacts.length === 0 || contacts === undefined ? (
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
            contacts.map((contact, id) => (
              <tr key={id}>
                <td>{contact.name}</td>
                <td>{contact.organization}</td>
                <td>{contact.title}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td>{contact.city}</td>
                <td>{contact.postal}</td>
                <td>{contact.state}</td>
                <td>
                  <button
                    onClick={(event) => {
                      handleEdit(event, contact.contact_id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={(event) => {
                      handleDelete(event, contact.contact_id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    <FontAwesomeIcon icon={faRemove} />
                  </button>
                </td>
              </tr>
            ))
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
          <Edit handleModalClose={handleModalClose} editContact={editContact} />
        </Modal>
      </div>
    </>
  );
};

export default Table;
