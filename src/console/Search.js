import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput/TextInput";
import "../assests/stylesheets/Search.css";
import Table from "./Table";
const Search = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: search,
      }),
    };
    fetch("http://localhost:8000/contacts/find", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            console.log(i);
            if (data[i].user_id == localStorage.getItem("user")) {
              setContacts(data[i]);
            }
          }
        }
      });
  };


  return (
    <>
      <form className="search-container" onSubmit={handleSubmit}>
        <TextInput
          label=""
          name="search"
          className="search-input-field"
          placeholder="Search by Name"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
      </form>

      <Table contacts={contacts} />
    </>
  );
};
export default Search;
