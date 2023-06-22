import React, { useEffect, useState } from "react";
// import "../components/scss/mainn.scss";
import "../components/scss/main.scss";

function Card({ element, setIndex, setPokemon }) {
  const [color, setColor] = useState("");
  useEffect(() => {
    if (element.id != "" && element.color == '') {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${element.id}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          setColor(values.color.name);
          

        });
    }
    
    // console.log(pokemon)
  }, [element]);
  return (
    <button
      style={{ backgroundColor: `${color}` }}
      className="list-btn"
      onClick={() => {
        setIndex((current) => element.id);
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`}
        key={`${element.id}`}
      />
      <h3
        style={{
          ...(color == "black" && { color: "white" }),
        }}
      >
        #{element.id}
      </h3>
      <h3
        style={{
          ...(color == "black" && { color: "white" }),
        }}
      >
        {element.name}
      </h3>
    </button>
  );
}

export default Card;

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1005.png
