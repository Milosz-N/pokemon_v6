import React from "react";
import "../components/scss/list.scss";
function ButtonEvolution({ list, element, setIndex }) {
  return (
    <>
      <button
      className="button-evolution"
        onClick={() => {
          setIndex(
            list.find((pokemon) => pokemon.name == element.species.name) !==
              undefined
              ? list.find((pokemon) => pokemon.name == element.species.name).id
              : list.find((pokemon) =>
                  pokemon.name.includes(element.species.name)
                ).id
          );
        }}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            list.find((pokemon) => pokemon.name == element.species.name) !==
            undefined
              ? list.find((pokemon) => pokemon.name == element.species.name).id
              : list.find((pokemon) =>
                  pokemon.name.includes(element.species.name)
                ).id
          }.png`}
        />
        <h3 className="header-evolution">{element.species.name}</h3>
      </button>
    </>
  );
}

export default ButtonEvolution;
