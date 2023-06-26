import "../components/scss/main.scss";
import "../components/scss/popup.scss";
import React, { useEffect } from "react";
import Header from "./Header";
import Description from "./Description";
import Stats from "./Stats";
import Evolution from "./Evolution";
function Popup({ index, setIndex, pokemon, setPokemon }) {
  const current = pokemon.find((element) => element.id == index);
  useEffect(() => {
    if (current.id !== "" ) {
      var color = "";
      var evolution = "";
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${current.id}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          color = values.color.name;
          evolution = values.evolution_chain.url;

        });
      fetch(`https://pokeapi.co/api/v2/pokemon/${current.id}/`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          const newState = pokemon.map((obj) => {
            if (obj.id == index) {
              return {
                ...obj,
                color: color,
                evolution: evolution,
                height: values.height,
                weight: values.weight,
                abilities: values.abilities,
                types: values.types,
                stats: values.stats,
              };
            }

            return obj;
          });
          setPokemon(newState);
        });
    }
  }, [index]);

  useEffect(() => {
    if (current.types.length > 0 && current.damage.length == 0) {
      current.types.map((element) => {
        fetch(`${element.type.url}`)
          .then((res) => res.json())
          .catch((ex) => ex)
          .then((values) => {
            const newState = pokemon.map((obj, index) => {
              if (index == Number.parseInt(current.id - 1)) {
                return {
                  ...obj,
                  damage: values.damage_relations.double_damage_from.map(
                    (element) => {
                      return element.name;
                    }
                  ),
                };
              }
              return obj;
            });
            setPokemon(newState);
          });
      });
    }
  }, [current]);
  useEffect(() => {
    if (current.evolution !== ``) {
      fetch(`${current.evolution}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          const newState = pokemon.map((obj, index) => {
            if (Number.parseInt(index) == Number.parseInt(current.id - 1)) {
              return {
                ...obj,
                evolution_array: values,
              };
            }

            return obj;
          });
          setPokemon(newState);
        });
    }
  }, [current.evolution]);
  return (
    <div className="container-popup                                                                                           ">
      <span
        onClick={() => {
          setIndex(-1);
        }}
      >
        X
      </span>
      <Header
        next={pokemon[current.id]}
        prev={pokemon[current.id - 2]}
        setIndex={setIndex}
        current={current}
      />
      <Description current={current} />
      <Stats current={current} />
      <Evolution
        pokemon={pokemon[current.id-1]}
        setIndex={setIndex}
        index={index}
        list={pokemon}
      />
    </div>
  );
}

export default Popup;
