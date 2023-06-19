import "../components/scss/main.scss";

import React, { useEffect, useState } from "react";
import Evolution from "./Evolution";
function PopUp({ index, setIndex, pokemon, setPokemon }) {
  const current = pokemon.find((element) => element.id == index);
  var types = [];
  useEffect(() => {
    var color = "";
    var evolution = "";
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
      .then((res) => res.json())
      .catch((ex) => ex)
      .then((values) => {
        color = values.color.name;
        evolution = values.evolution_chain.url;
      });
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`)
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
  }, [index]);


  useEffect(() => {
    console.log(current.damage)
    if (current.types.length > 0 && current.damage.length  == 0) {
      console.log(current.id === 1);
      current.types.map(element => {
        // console.log(element.type.url)
        fetch(`${element.type.url}`)
        .then(res => res.json())
        .catch(ex => ex)
        .then(values => {
types.push(element.name);
console.log(values)
const newState = (pokemon.map((obj, index) => {
  if (index == Number.parseInt(current.id - 1)) {
    return {
      ...obj,
      damage: values.damage_relations.double_damage_from.map(element=>{return element.name})
    };
  }

  return obj;
}))

// console.log(newState)
setPokemon(newState)    
 

}

)
})
   
    }
   
  }, [current]);
  console.log(pokemon)
  return (
    <div className="container-popUp">
      <div className="header">
        <div>
          {pokemon[current.id - 2] != undefined && (
            <button
              className="btn-small"
              onClick={() => {
                setIndex((current) => current - 1);
              }}
            >
              <div
                className="image-small"
                style={{
                  backgroundImage: `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    Number.parseInt(current.id) - 1
                  }.png")`,
                }}
              ></div>
              <p>
                {" "}
                ← {pokemon[current.id - 2].name} #{pokemon[current.id - 2].id}
              </p>
            </button>
          )}
        </div>
        <div>
          <h1>
            {current.name} #{current.id}
          </h1>
        </div>
        <div>
          {pokemon[current.id] != undefined && (
            <button
              className="btn-small"
              onClick={() => {
                setIndex((current) => Number.parseInt(current) + 1);
              }}
            >
              <div
                className="image-small"
                style={{
                  backgroundImage: `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    Number.parseInt(current.id) + 1
                  }.png")`,
                }}
              ></div>
              <p>
                {pokemon[current.id].name} #{pokemon[current.id].id} →
              </p>
            </button>
          )}
        </div>
      </div>
      <span
        onClick={() => {
          setIndex(-1);
        }}
      >
        X
      </span>
      <img
        className="description-img"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${current.id}.png`}
        // key={`${element.id}`}
      />
      <div className="description">
        <legend>Height</legend>
        <h2>{current.height}</h2>
        <legend>Weight</legend>
        <h2>{current.weight}</h2>
        <div className="container-abilities">
        <legend>Type</legend>

          {current.types.map((element) => {
            return (<h2 className="abilities">{element.type.name}</h2> );
          })}
        </div>
        <div className="container-abilities">
        <legend>Abilities</legend>

          {current.abilities.map((element) => {
            return (
               <h2 className="abilities">{element.ability.name}</h2>
           );
          })}
          </div>
          <div className="container-abilities">
        <legend>Weakness</legend>

          {current.damage.map((element) => {
            return (
               <h2 className="abilities">{element}</h2>
           );
          })}
          </div>
          
      </div>

      <section className="bar-container">
        <h2 style={{ width: "100%" }}>Stats</h2>

        {current.stats.map((element) => {
          return (
            <div style={{ width: "30%" }}
            key={element.stat.name}
            >
              <legend>{element.stat.name}</legend>
              <legend
                className="bar"
                style={{
                  width: (Number.parseInt(element.base_stat) / 255) * 100 + "%",
                }}
              >
                <p>{element.base_stat}</p>
              </legend>
            </div>
          );
        })}
      </section>
      <Evolution current={current} pokemon={pokemon} setIndex={setIndex} />
    </div>
  );
}

export default PopUp;
