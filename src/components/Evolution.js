import React, { useState, useEffect } from "react";
import "../components/scss/evolution.scss";
import "../components/scss/main.scss";
import ButtonEvolution from "./ButtonEvolution";
function Evolution({
  pokemon,
  setIndex,
  index,
  list,
  evolution,
  setEvolution,
}) {
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

            setEvolution([
              ...evolution,
              { id: values.id, values: values.chain, url: pokemon.evolution },
            ]);
            // }
          });
      }

      setCurrent(
        evolution.find((value) => {
          return Number.parseInt(value.id) == Number.parseInt(Id);
        })
      );
    }
  }, [index, pokemon, list]);
  return (
    <>
      <section className="container-evolution">
        <h1>Evolution</h1>
        <div>
          {current != undefined && (
            <>
              <div
                style={{
                  width: "max-content",
                  height: "max-content",
                }}
              >
                <ButtonEvolution
                  list={list}
                  element={current.values}
                  setIndex={setIndex}
                />
              </div>
              {current.values.evolves_to.length > 0 && <h2></h2>}

              <>
                {current.values.evolves_to.length > 0 && (
                  <>
                    <div>
                      {current.values.evolves_to.map((element) => {
                        return (
                          <>
                            <ButtonEvolution
                              list={list}
                              element={element}
                              setIndex={setIndex}
                            />
                          </>
                        );
                      })}
                    </div>

                    {current.values.evolves_to[0] != undefined &&
                      current.values.evolves_to[0].evolves_to.length > 0 && (
                        <>
                          <h2></h2>

                          <div>
                            {current.values.evolves_to[0].evolves_to.map(
                              (element) => {
                                return (
                                  <>
                                    <ButtonEvolution
                                      list={list}
                                      element={element}
                                      setIndex={setIndex}
                                    />
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
        </div>
      </section>
    </>
  );
}

export default Evolution;
