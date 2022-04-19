import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.production.min";
import { titleCase } from "title-case";
import "../assests/stylesheets/Table.css";
import Modal from "../components/Modal/Modal";
import Edit from "./Edit";

const SearchTable = ({ contact }) => {
  return (
    <>
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
          </tr>
        </thead>
        <tbody>
          {Object.keys(contact).length === 0 ? (
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
              <td>{contact.name}</td>
              <td>{contact.organization}</td>
              <td>{contact.title}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>{contact.city}</td>
              <td>{contact.postal}</td>
              <td>{contact.state}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SearchTable;
