import React, { useState, useEffect, useContext } from "react";
import { getUrl } from "../utils/restClient";
import MatchForm from "./MatchForm";
import Table from "./Table";
import UserContext from "./UserContext";
import Cookie from "js-cookie";

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
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [newMatchValues, setNewMatchValues] = useState({});
  const [winrate, setWinrate] = useState(1);

  useEffect(() => {
    loadMatches();
    loadWinrate();
  }, []);

  const onChange = (field, value) => {
    const newFormValues = {
      ...newMatchValues,
      [field]: value,
    };
    setNewMatchValues(newFormValues);
  };

  const loadWinrate = async () => {
    const id = Cookie.get("user") ? Cookie.get("user") : null;
    const response = await fetch(`${getUrl()}/Account/Winrate?account=${id}`);
    const data = await response.json();
    setWinrate(data);
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
      return;
    }
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
      <Table data={matches} columns={columns} />
      <MatchForm onChange={onChange} onSubmit={submitNewMatch} />
    </div>
  );
};
