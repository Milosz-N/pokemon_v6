import React from "react";
import Card from "./Card";
import "../components/scss/list.scss";
function List({ pokemon, listItems, setIndex, index }) {
  return (
    <div
      className="container-list"
      style={{ opacity: index > 0 ? "0.5" : "1" }}
    >
      {pokemon.slice(0, listItems).map((element, index) => {
        return <Card element={element} key={index} setIndex={setIndex} />;
      })}
    </div>
  );
}

export default List;
