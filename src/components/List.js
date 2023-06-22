import React from "react";
import Card from "./Card";
function List({ pokemon, listItems, setIndex, setPokeomn }) {
  return (
    <div className="container">

      {pokemon.slice(0, listItems).map((element, index) => {
        return <Card element={element} key={index + 1} setIndex={setIndex} setPokemon={setPokeomn} pokemon={pokemon} />;
      })}
     
    </div>
  );
}

export default List;
