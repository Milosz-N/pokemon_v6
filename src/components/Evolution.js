import React, { useState, useEffect } from "react";
import "../components/scss/evolution.scss";
import "../components/scss/main.scss";
function Evolution({ pokemon, setIndex, list }) {
  const [evolution, setEvolution] = useState([]);
  const [current, setCurrent] = useState();
  const [Id, setId] = useState(0);
 
  useEffect(() => {
    const x = evolution.find((element) => {
      return element.url === pokemon.evolution;
    });
    if (x !== undefined) {
      setCurrent(
        evolution.find((value) => {
          return value.url === pokemon.evolution;
        })
      );
    } else {
      if (pokemon.evolution !== "") {
        fetch(`${pokemon.evolution}`)
          .then((res) => res.json())
          .catch((ex) => ex)
          .then((values) => {
            setId(values.id);
            if (
              !evolution.find(
                (element) =>
                  Number.parseInt(element.id) == Number.parseInt(values.id)
              )
            ) {
              setEvolution([
                ...evolution,
                { id: values.id, values: values.chain, url: pokemon.evolution },
              ]);
            }
          });
      }

      setCurrent(
        evolution.find((value) => {
          return Number.parseInt(value.id) == Number.parseInt(Id);
        })
      );
    }
  }, [pokemon]);

  // `url(${Background})`
  return (
    <section className="container-evolution">
      <h1>Evolution</h1>

      {current != undefined && (
        <>
          <button
            onClick={() => {
              setIndex(
                list.find(
                  (pokemon) => pokemon.name == current.values.species.name
                ) != undefined
                  ? list.find(
                      (pokemon) => pokemon.name == current.values.species.name
                    ).id
                  : list.find((pokemon) =>
                      pokemon.name.includes(current.values.species.name)
                    ).id
              );
            }}
          >
            <img
              className="image-evolution"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                list.find(
                  (pokemon) => pokemon.name == current.values.species.name
                ) != undefined
                  ? list.find(
                      (pokemon) => pokemon.name == current.values.species.name
                    ).id
                  : list.find((pokemon) =>
                      pokemon.name.includes(current.values.species.name)
                    ).id
              }.png`}
            />
            <h3 className="header-evolution">{current.values.species.name}</h3>
          </button>
          <>
            {current.values.evolves_to.length > 0 && (
              <>
                <h2>{`>`}</h2>

                <div
  style={{
    maxWidth: `${current.values.evolves_to[0].evolves_to.length == 0 ? `520px` : current.values.evolves_to[0].evolves_to.length == 1 ? `250px` : `120px`}`,
  }}          
        >
                  {current.values.evolves_to.map((element) => {
                    return (

                      
                    <>
                      <button
                        className="button-evolution"
                        key={`${
                          list.find(
                            (pokemon) => pokemon.name == element.species.name
                          ) !== undefined
                            ? list.find(
                                (pokemon) =>
                                  pokemon.name == element.species.name
                              ).id
                            : list.find((pokemon) =>
                                pokemon.name.includes(element.species.name)
                              ).id
                        }`}
                        onClick={() => {
                          setIndex(
                            list.find(
                              (pokemon) => pokemon.name == element.species.name
                            ) !== undefined
                              ? list.find(
                                  (pokemon) =>
                                    pokemon.name == element.species.name
                                ).id
                              : list.find((pokemon) =>
                                  pokemon.name.includes(element.species.name)
                                ).id
                          );
                        }}
                      >
                        <img
                          className="image-evolution"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                            list.find(
                              (pokemon) => pokemon.name == element.species.name
                            ) !== undefined
                              ? list.find(
                                  (pokemon) =>
                                    pokemon.name == element.species.name
                                ).id
                              : list.find((pokemon) =>
                                  pokemon.name.includes(element.species.name)
                                ).id
                          }.png`}
                        />
                        <h3 className="header-evolution">
                          {element.species.name}
                        </h3>
                      </button>
         
                
                    </>
                    );
                  })}
                </div>
                
                {current.values.evolves_to[0] != undefined &&
                  current.values.evolves_to[0].evolves_to.length > 0 && (
                    <>
                      <h2>{`>`}</h2>

                      <div>
                        {current.values.evolves_to[0].evolves_to.map(
                          (element) => {
                            return (
                              <>
                                      <button
                                className="button-evolution"
                                onClick={() => {
                                  setIndex(
                                    list.find(
                                      (pokemon) =>
                                        pokemon.name == element.species.name
                                    ) !== undefined
                                      ? list.find(
                                          (pokemon) =>
                                            pokemon.name == element.species.name
                                        ).id
                                      : list.find((pokemon) =>
                                          pokemon.name.includes(
                                            element.species.name
                                          )
                                        ).id
                                  );
                                }}
                              >
                                <img
                                  className="image-evolution"
                                  style={{}}
                                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                                    list.find(
                                      (pokemon) =>
                                        pokemon.name == element.species.name
                                    ) !== undefined
                                      ? list.find(
                                          (pokemon) =>
                                            pokemon.name == element.species.name
                                        ).id
                                      : list.find((pokemon) =>
                                          pokemon.name.includes(
                                            element.species.name
                                          )
                                        ).id
                                  }.png`}
                                />
                                <h3 className="header-evolution">
                                  {element.species.name}
                                </h3>
                              </button>
                             
                              </>
                      
                            );
                          }
                        )}
                      </div>
                    </>
                  )}
              </>
            )}
          </>
        </>
      )}
    </section>
  );
}

export default Evolution;
