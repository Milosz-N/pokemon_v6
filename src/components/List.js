import React from "react";
import Card from "./Card";
import "../components/scss/list.scss";
function List({ pokemon, listItems, setIndex }) {
  return (
    <div className="container-list">
      {pokemon.slice(0, listItems).map((element, index) => {
        return <Card element={element} key={index + 1} setIndex={setIndex} />;
      })}
    </div>
  );
}

export default List;
