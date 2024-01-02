import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const Deck = () => {
  const BASE_URL = `https://deckofcardsapi.com/api/deck`;
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  function getNewDeck() {
    setIsShuffling(true);
    axios
      .get(`${BASE_URL}/new/shuffle`)
      .then((response) => {
        setDeck(response.data);
        setDrawnCards([]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsShuffling(false);
      });
  }

  //After page loads fetch deck from api
  useEffect(() => {
    getNewDeck();
  }, []);

  //draw a new card and update state of drawnCards array, and state of deck to track remaining cards.
  function drawACard() {
    if (deck.remaining === 0) {
      alert("Error: no cards remaining.");
      return;
    }
    axios
      .get(`${BASE_URL}/${deck.deck_id}/draw`)
      .then((res) => {
        if (res.data.remaining === 0) {
          alert("Error: no cards remaining.");
        }
        setDrawnCards((prevCards) => [...prevCards, ...res.data.cards]);
        setDeck((prevDeck) => ({ ...prevDeck, remaining: res.data.remaining }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div
        className="btn-controls"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={drawACard}
          disabled={isShuffling}
          style={{ marginRight: "1rem" }}
        >
          Draw a card
        </button>
        <button onClick={getNewDeck} disabled={isShuffling}>
          New Shuffled Deck
        </button>
      </div>

      <div className="card-container">
        {drawnCards.map((c, index) => (
          <Card
            key={`${c.code}-${c.value}-${c.suit}`}
            image={c.image}
            zIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
