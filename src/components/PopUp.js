import "../components/scss/main.scss";

import React, { useEffect, useState } from "react";
import Evolution from "./Evolution";
function PopUp({ index, setIndex, pokemon, setPokemon }) {
  const current = pokemon.find((element) => element.id == index);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
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
    if (current.evolution !== "") {
      fetch(`${current.evolution}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          // console.log(values.chain.evolves_to[0].species.name)  //drugi
          setFirst(values.chain.species.name);
          // console.log(pokemon.find(element=> element.name == values.chain.species.name).id)
          if (
            values.chain.evolves_to[0] != undefined &&
            values.chain.evolves_to[0].species.name != undefined
          ) {
            // console.log(values.chain.evolves_to[0].species.name);
            setSecond(values.chain.evolves_to[0].species.name);
          }
          if (
            values.chain.evolves_to[0] != undefined &&
            values.chain.evolves_to[0].evolves_to[0] != undefined
          ) {
            // console.log(values.chain.evolves_to[0].evolves_to[0].species.name); //trzeci
            setThird(values.chain.evolves_to[0].evolves_to[0].species.name);
          }
        });
    }
  }, [current]);
  return (
    <div className="container-popUp">
      <header>
    <div>
          {pokemon[current.id - 2] != undefined && (
            <button
            className="btn-small"
              onClick={() => {
                setIndex((current) => current - 1);
              }}
            >
              <div className="image-small"
              style={{backgroundImage:`url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Number.parseInt(current.id) -1}.png")`}}
              >

              </div>
               {/* <img
        className="description-img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Number.parseInt(current.id) -1}.png`}
          // key={`${element.id}`}
        /> */}
              {/* https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png */}

              <p>  ← {pokemon[current.id - 2].name } #{pokemon[current.id - 2].id}
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
                <div className="image-small"
              style={{backgroundImage:`url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Number.parseInt(current.id) +1}.png")`}}
              >

              </div>
              <p>

              
              {pokemon[current.id].name} #{pokemon[current.id].id} →
           </p>
          
           
            </button>
          )}
          </div>
      </header>
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
      <div
      className="description"
      >
            <legend>Height</legend>
            <h2>{current.height}</h2>
            <legend>Weight</legend>
            <h2>{current.weight}</h2>
          <legend>Type</legend>
          <h2>
            {current.types.map((element) => {
              return element.type.name + " ";
            })}
          </h2>
          <legend>Abilities</legend>
          <h2>
            {current.abilities.map((element) => {
              return element.ability.name + " ";
            })}
          </h2>
      </div>

      <section className="bar-container">
        <h2
          style={{width: '100%'}}
        >
          Stats
        </h2>

        {current.stats.map((element) => {
          return (
            <div
            style={{width:'45%'}}
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
      <Evolution
      current={current}
      pokemon={pokemon}
      setIndex={setIndex}
      />
    </div>
  );
}

export default PopUp;
