import React from "react";
import "../components/scss/main.scss";
import "../components/scss/list.scss";

function Card({ element, setIndex }) {
  return (
    <button
      onClick={() => {
        setIndex((current) => element.id);
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`}
        // key={`${element.id}`}
      />

      <h2>{element.name + " #" + element.id}</h2>
    </button>
  );
}

export default Card;
