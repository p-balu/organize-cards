import React, { useEffect, useState } from "react";
import { titleCase } from "title-case";
import { CSVLink, CSVDownload } from "react-csv";

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (refresh) {
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: localStorage.getItem("user"),
        }),
      };
      fetch("http://localhost:8000/get-all-data", request)
        .then((res) => res.json())
        .then((data) => {
          setContacts(data);
          setRefresh(false);
        });
    }
  }, [refresh]);

  const handleDelete = (event, contactId) => {
    event.preventDefault();
    console.log(contactId);
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
          setSuccess("Contact deleted successfully");
          setRefresh(true);
        } else {
          setError("Server Error Occured");
          setRefresh(true);
        }
      });
  };

  return (
    <>
      {success && <div className="success">{titleCase(success)}</div>}
      {error && <div className="error">{titleCase(error)}</div>}{" "}
      <h3 className="h3">Contacts</h3>
      {contacts.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "8%",
          }}
        >
          <CSVLink
            data={contacts}
            style={{ listStyle: "none", textDecoration: "none" }}
          >
            Download csv file
          </CSVLink>
        </div>
      )}
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
            <tr j>
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
                <td>{contact.zip}</td>
                <td>{contact.state}</td>
                <td>
                  <button
                    onClick={(event) => {
                      handleDelete(event, contact.contact_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
