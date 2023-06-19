import React from "react";
import Card from "./Card";
function List({ pokemon, listItems, setIndex }) {
  return (
    <div className="container">
      {pokemon.slice(0, listItems).map((element, index) => {
        return <Card element={element} key={index + 1} setIndex={setIndex} />;
      })}
    </div>
  );
}

export default List;
