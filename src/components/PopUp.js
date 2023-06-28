import "../components/scss/main.scss";
import "../components/scss/popup.scss";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Description from "./Description";
import Stats from "./Stats";
import Evolution from "./Evolution";
function Popup({
  index,
  setIndex,
  pokemon,
  setPokemon,
  evolution,
  setEvolution,
}) {
  const [windowHeight, setWindowHeight] = useState(undefined);
  const current = pokemon.find((element) => element.id == index);

  useEffect(() => {
    if (current.color == "") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          // console.log(values)
          const newState = pokemon.map((obj, index) => {
            if (obj.id == current.id) {
              return {
                ...obj,

                color: values.color.name,
                evolution: values.evolution_chain.url,
                habitat: values.habitat !== null && values.habitat.name,
                generation: values.generation.name
                  .replace("generation-", "")
                  .toUpperCase(),
              };
            }

            return obj;
          });
          setPokemon(newState);
        });
    }
    if (current.types.length == 0 || current.abilities.length == 0) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${current.id}/`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          const newState = pokemon.map((obj) => {
            if (obj.id == current.id) {
              return {
                ...obj,
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

    if (current.weaknesses.length === 0 && current.types.length !== 0) {
      //  console.log(current.types);
      current.types.map((element) => {
        // console.log(element.type.url)
        fetch(`${element.type.url}`)
          .then((res) => res.json())
          .catch((ex) => ex)
          .then((values) => {
            // console.log(values.damage_relations.double_damage_from)
            const newState = pokemon.map((obj, index) => {
              if (obj.types == current.types) {
                return {
                  ...obj,
                  weaknesses: values.damage_relations.double_damage_from.map(
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

    if (current.evolution !== "") {
      // console.log('fetch')
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
    if (Number.parseInt(window.innerHeight) < 800) {
      setWindowHeight("10px");
    } else {
      setWindowHeight("unset");
    }
  }, [current, index]);

  // useEffect(()=>{console.log(current)},[current])
  useEffect(()=>{},[current.weaknesses])
  return (
    <div
      style={{ bottom: `${windowHeight}` }}
      className="container-popup                                                                                         "
    >
      <button
        className="close"
        onClick={() => {
          setIndex(-1);
        }}
      >
        X
      </button>
      <Header
        next={pokemon[current.id]}
        prev={pokemon[current.id - 2]}
        setIndex={setIndex}
        current={current}
        min={pokemon[0]}
        max={pokemon[pokemon.length - 1]}
      />
      <Description
        current={current}
        pokemon={pokemon}
        setPokemon={setPokemon}
        index={index}
      />
      <Stats current={current} />
      <Evolution
        pokemon={current}
        setIndex={setIndex}
        index={index}
        list={pokemon}
        evolution={evolution}
        setEvolution={setEvolution}
      />
    </div>
  );
}

export default Popup;
