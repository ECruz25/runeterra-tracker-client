import React, { useState, useEffect, useContext } from "react";
import { getUrl } from "../utils/restClient";
import MatchForm from "./MatchForm";
import Table from "./Table";
import UserContext from "./UserContext";
import Cookie from "js-cookie";
import Dialog from "./Dialog";
import { Typography } from "@material-ui/core";
import { DeckEncoder } from "runeterra";
import cardData from "../utils/card-data.json";

const columns = [
  {
    title: "Deck Id",
    key: "deckid",
    length: 200,
  },
  {
    title: "Champions",
    key: "champions",
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
    const champions = cardData.filter((t) => t.rarity === "Champion");
    const id = Cookie.get("user") ? Cookie.get("user") : null;
    const response = await fetch(`${getUrl()}/Match/?request=${id}`);
    const data = await response.json();
    const builtData = data.map((t) => ({
      ...t,
      champions: championsByDeck(t.deckid, champions),
    }));
    setMatches(builtData);
  };

  const championsByDeck = (deckCode, champions) => {
    const cardCodes = DeckEncoder.decode(deckCode).map((card) => card.code);
    const championsCardsInDeck = champions
      .map((champion) => championsCards(cardCodes, champion))
      .filter((t) => t != null);
    const championsInDeck = championsCardsInDeck.map(
      (c) => champions.filter((t) => t.cardCode === c)[0].name
    );
    return championsInDeck.join(", ");
  };

  const championsCards = (codes, champion) => {
    return codes.filter((c) => c === champion.cardCode)[0];
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
      try {
        DeckEncoder.decode(newMatchValues.deckId);
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
        loadMatches();
      } catch (error) {
        setShowError(true);
        setErrorMessage({
          message: "Verify you've entered a valid deck code",
          title: "Invalid Deck",
        });
      }
    }
  };

  return (
    <div>
      {showError && (
        <Dialog message={errorMessage} setShow={setShowError}></Dialog>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          margin: "60px 100px",
          columnGap: 30,
          marginLeft: 40,
        }}
      >
        <div>
          {username && (
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: 20 }}
            >
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
    </div>
  );
};
