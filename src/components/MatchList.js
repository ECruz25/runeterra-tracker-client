import React, { useState, useEffect, useContext } from "react";
import { getUrl } from "../utils/restClient";
import MatchForm from "./MatchForm";
import Table from "./Table";
import UserContext from "./UserContext";
import Cookie from "js-cookie";
import Dialog from "./Dialog";
import { Typography } from "@material-ui/core";

const columns = [
  {
    title: "Deck Id",
    key: "deckid",
  },
  {
    title: "Result",
    key: "result",
  },
  {
    title: "Date",
    key: "date",
  },
];

export default () => {
  const [matches, setMatches] = useState([]);
  const [newMatchValues, setNewMatchValues] = useState({});
  const [username, setUsername] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadMatches();
    const name = Cookie.get("username") ? Cookie.get("username") : null;
    setUsername(name);
  }, []);

  const onChange = (field, value) => {
    const newFormValues = {
      ...newMatchValues,
      [field]: value,
    };
    setNewMatchValues(newFormValues);
  };

  const loadMatches = async () => {
    const id = Cookie.get("user") ? Cookie.get("user") : null;
    const response = await fetch(`${getUrl()}/Match/?request=${id}`);
    const data = await response.json();
    setMatches(data);
  };

  const submitNewMatch = async (e) => {
    e.preventDefault();
    if (!newMatchValues.deckId) {
      setShowError(true);
      setErrorMessage({
        message: "Check values you have entered",
        title: "Missing Deck Id",
      });
    } else {
      const requestObject = {
        accountId: 7,
        deckId: newMatchValues.deckId,
        result: newMatchValues.win ? "WIN" : "LOSS",
      };
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify(requestObject),
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${getUrl()}/Match`, fetchOptions);
      setNewMatchValues({});
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
        margin: "60px 100px",
        columnGap: 30,
      }}
    >
      {showError && (
        <Dialog message={errorMessage} setShow={setShowError}></Dialog>
      )}
      <div>
        {username && (
          <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
            {`Hi, ${username}`}
          </Typography>
        )}
        <Table data={matches} columns={columns} />
      </div>
      <div>
        <Typography component="h2" variant="h6" style={{ marginBottom: 10 }}>
          Just played a match? Add it to your history
        </Typography>
        <MatchForm onChange={onChange} onSubmit={submitNewMatch} />
      </div>
    </div>
  );
};
