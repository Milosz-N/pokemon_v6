import "../components/scss/main.scss";
import "../components/scss/popup.scss";
import React, { useEffect } from "react";
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
  const current = pokemon.find((element) => element.id == index);

  useEffect(() => {
    var state = {
      color: "",
      evolution: "",
      genetation: "",
      height: "",
      weight: "",
      abilities: "",
      types: "",
      stats: "",
    };
    // console.log(state)
    if (
      current.color == "" ||
      current.evolution == "" ||
      current.generation == ""
    ) {
      var color = "";
      var evolution = "";
      var genetation = "";
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          // console.log(values);
          color = values.color.name;
          state["color"] = values.color.name;
          evolution = values.evolution_chain.url;
          // state.evolution = values.evolution_chain_url
          genetation = values.generation.name
            .replace("generation-", "")
            .toUpperCase();
          // console.log(state)
        });
      fetch(`https://pokeapi.co/api/v2/pokemon/${current.id}/`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          // console.log(values)
          // console.log(state)
          const newState = pokemon.map((obj) => {
            // console.log(obj)
            if (obj.id == index) {
              return {
                ...obj,
                color: color,
                evolution: evolution,
                genetation: genetation,
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
    // console.log(state)
  }, [current]);
  useEffect(() => {
    if (current.color != "") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          const newState = pokemon.map((obj) => {
            // console.log(obj)
            if (obj.id == index) {
              return {
                ...obj,
                color: values.color.name,
                evolution: values.evolution_chain.url,
                genetation: values.generation.name
                  .replace("generation-", "")
                  .toUpperCase(),
              };
            }

            return obj;
          });
          setPokemon(newState);
        });
    }
  }, [current]);

  // useEffect(() => {
  //   // console.log(current)
  //   if (current.types !== [] && current.damage.length == 0) {
   
  //     current.types.map((element) => {
      
  //       fetch(`${element.type.url}`)
  //         .then((res) => res.json())
  //         .catch((ex) => ex)
  //         .then((values) => {
  //           const newState = pokemon.map((obj, index) => {
  //             if (obj.id == index) {
  //               return {
  //                 ...obj,
  //                 damage: values.damage_relations.double_damage_from.map(
  //                   (element) => {
  //                     return element.name;
  //                   }
  //                 ),
  //               };
  //             }
  //             return obj;
  //           });
  //           setPokemon(newState);
  //         });
  //     });
    
  //   }
  //   // console.log(current)
  // }, [current]);
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
        pokemon={pokemon[current.id - 1]}
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
