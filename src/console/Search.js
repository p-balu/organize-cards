import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput/TextInput";
import "../assests/stylesheets/Search.css";
import Table from "./Table";
import SearchTable from "./SearchTable";

const Search = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [contact, setContact] = useState([]);
  const [refresh, setRefresh] = useState(true);

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
        setContacts([]);
        setContact(data[0]);
      });
  };

  const handleRefresh = (value) => {
    console.log(value);
    setRefresh(value);
  };

  console.log("refresh", refresh);

  useEffect(() => {
    if (refresh) {
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: localStorage.getItem("user"),
        }),
      };
      fetch("http://localhost:8000/get-user-contacts", request)
        .then((res) => res.json())
        .then((data) => {
          setContact([]);
          setContacts(data);
          setRefresh(false);
        });
    }
  }, [refresh]);

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

      {contacts.length > 0 ? (
        <Table contacts={contacts} handleRefresh={handleRefresh} />
      ) : (
        <SearchTable contact={contact} />
      )}
    </>
  );
};
export default Search;
