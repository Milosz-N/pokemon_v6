import React, { useEffect, useState } from "react";
function Evolution({ current, pokemon, setIndex, setPokemon }) {
  // console.log(pokemon);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  
  
  useEffect(() => {
    if (current.evolution !== "") {
      fetch(`${current.evolution}`)
        .then((res) => res.json())
        .catch((ex) => ex)
        .then((values) => {
          // console.log(values.chain.evolves_to[0].evolves_to) //tablica z trzecimi
          //   console.log(values.chain.evolves_to[0].species.name)  //drugi
          if (values.chain.species != undefined) {
            // console.log(`pierwsza: ` + values.chain.species.name) //pierwsza wartosc
            setFirst(values.chain.species.name);
          }
          if (values.chain.evolves_to.length > 0) {
            //    console.log('tablica z drugimi')
            // console.log(values.chain.evolves_to);
            setSecond(
              values.chain.evolves_to.map((element) => {
                return element.species.name;
              })
            );
            if (values.chain.evolves_to[0].evolves_to.length > 0) {
              // console.log('trzecie');
              // console.log(values.chain.evolves_to[0].evolves_to);
              setThird(
                values.chain.evolves_to[0].evolves_to.map((element) => {
                  return element.species.name;
                })
              );
            }
          }
        });
    }
  }, [current]);
  return (
    <div
      className="container-evolution"
      style={{
        justifyContent: second.length < 1 && "unset",
      }}
    >
      <h2 style={{ width: "100%" }}>Evolution</h2>

      <div className="first-evolution">
        <button
          className="button-evolution"
          style={{
            width: (second.length > 4 || third.length > 4) && "120px",
            height: (second.length > 4 || third.length > 4) && "120px",
            margin:
              (second.length > 4 || third.length > 4) && "auto 10px auto 10px",
          }}
          onClick={() => {
            setIndex(pokemon.find((element) => element.name == first).id);
          }}
        >
          {first != "" && (
            <>
              {" "}
              <img
                className="image-evolution"
                style={{
                  width: (second.length || third.length > 4) > 4 && "80px",
                }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon.find((element) => element.name == first).id
                }.png`}
              />
              <h3>{first}</h3>
            </>
          )}
        </button>
      </div>

      <>{second.length > 0 && <h4>{`>`}</h4>}</>
      <div style={{ gap: (second.length > 4 || third.length > 4) && "5px" }}>
        {second.length > 0 && (
          <>
            {second.map((x, index) => {
              // {pokemon.find((element) => element.name == x).id != undefined && ()}
              if (pokemon.find((element) => element.name == x) != undefined) {
                return (
                  // <h2>{pokemon.find((element) => element.name == x).id}</h2>
                  <button
                  key={`evolution-${index}`}
                    className="button-evolution"
                    style={{
                      width: (second.length > 4 || third.length > 4) && "120px",
                      height:
                        (second.length > 4 || third.length > 4) && "120px",
                    }}
                    onClick={() => {
                      setIndex(pokemon.find((element) => element.name == x).id);
                    }}
                  >
                    <img
                      style={{
                        width:
                          (second.length || third.length > 4) > 4 && "80px",
                      }}
                      className="image-evolution"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                        pokemon.find((element) => element.name == x).id
                      }.png`}
                    />
                    <h3>{x}</h3>
                  </button>
                );
              }
            })}
          </>
        )}
      </div>
      <>{third.length > 0 && <h4>{`>`}</h4>}</>
      <>
        {third.length > 0 && (
          <>
            {third.map((x) => {
              return (
                <button
                key={`evolution-${x}`}
                  className="button-evolution"
                  style={{
                    width: (second.length > 4 || third.length > 4) && "120px",
                    height: (second.length > 4 || third.length > 4) && "120px",
                  }}
                  onClick={() => {
                    setIndex(pokemon.find((element) => element.name == x).id);
                  }}
                >
                  <img
                    style={{
                      width: (second.length || third.length > 4) > 4 && "80px",
                    }}
                    className="image-evolution"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      pokemon.find((element) => element.name == x).id
                    }.png`}
                  />
                  <h3>{x}</h3>
                </button>
              );
            })}
          </>
        )}
      </>
    </div>
  );
}

export default Evolution;
