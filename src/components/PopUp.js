import "../components/scss/main.scss";
import "../components/scss/popup.scss";
import React, { useEffect } from "react";
import Header from "./Header";
import Description from "./Description";
import Stats from "./Stats";
import Evolution from "./Evolution";
import Varieties from "./Varieties";
function Popup({
  index,
  setIndex,
  pokemon,
  setPokemon,
  evolution,
  setEvolution,
  varieties,
  setVarieties
}) {
  const current = pokemon.find((element) => element.id == index);
  useEffect(() => {
    if (current.color == "") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
        values.varieties.map(element => {if(element.is_default == false){
            // console.log(element.pokemon.url)
          }})
          // console.log(values.varieties)
          const newState = pokemon.map((obj) => {
            if (obj.id == current.id) {
              return {
                ...obj,
                flavor_text:
                  values.flavor_text_entries[0] !== undefined &&
                  values.flavor_text_entries.find((element) => {
                    return element.language.name == "en";
                  }),
                color: values.color.name,
                evolution: values.evolution_chain.url,
                habitat: values.habitat !== null && values.habitat.name,
                generation: values.generation.name
                  .replace("generation-", "")
                  .toUpperCase(),
                  varieties:  values.varieties.filter(element => (element.is_default == false)).map(element => {return element.pokemon.url})
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

    if (current.evolution !== "" && current.evolution_array.length < 1) {
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

    if (current.weaknesses.length < 1 && current.types.length !== 0) {
      current.types.map((element) => {
        fetch(`${element.type.url}`)
          .then((res) => res.json())
          .catch((ex) => ex)
          .then((values) => {
            const newState = pokemon.map((obj, index) => {
              if (Number.parseInt(index) == Number.parseInt(current.id - 1)) {
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
  }, [current]);
  // useEffect(()=>{console.log(current)},[current])
  return (
    <div
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
      <Description current={current} />
      {/* {current.varieties.length > 0 &&       */}
       {/* <Varieties current={current.varieties} id={current.id} setVariertes={setVarieties} varieties={varieties}/> */}
{/* } */}
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
