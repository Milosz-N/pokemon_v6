import React from "react";
import "../components/scss/main.scss";
import "../components/scss/description.scss";
function Description({ current }) {
  return (
    <section className="container-description">
      <img
        className="img-description"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${current.id}.png`}
        style={{ backgroundColor: `${current.color}` }}
      />
      <div className="list-description">
        {current.flavor_text != "" && (
          <h1>{current.flavor_text.flavor_text}</h1>
        )}

        {current.habitat !== false && (
          <>
            {" "}
            <div>
              <h3>Habitat</h3>
              <h2>{current.habitat}</h2>
            </div>
          </>
        )}
        <div>
          <h3>Weight</h3>

          <h2>
            {" "}
            {(Number.isInteger(current.height / 10)
              ? Number.parseInt(current.height / 10)
              : Number.parseFloat(current.height / 10).toFixed(1)) +
              " m " +
              (Number.isInteger((current.height * 3.2808399) / 10)
                ? Number.parseInt((current.height * 3.2808399) / 10)
                : Number.parseFloat((current.height * 3.2808399) / 10).toFixed(
                    1
                  )) +
              " ft"}
          </h2>
        </div>
        <div>
          <h3>Height</h3>

          <h2>
            {(Number.isInteger(current.weight / 10)
              ? Number.parseInt(current.weight / 10)
              : Number.parseFloat(current.weight / 10).toFixed(1)) + " kg "}
            {(Number.isInteger((current.weight * 2.20462262) / 10)
              ? Number.parseFloat((current.weight * 2.20462262) / 10)
              : Number.parseFloat((current.weight * 2.20462262) / 10).toFixed(
                  1
                )) + " lbs"}{" "}
          </h2>
        </div>
        <div>
          <h3>Generation</h3>
          <h2>{current.generation}</h2>
        </div>

        <div>
          <h3>Type</h3>
          <h2>
            {current.types.map((element) => {
              return element.type.name + " ";
            })}
          </h2>
        </div>
        <div>
          <h3>Abilities</h3>
          <h2>
            {current.abilities.map((element) => {
              return element.ability.name + " ";
            })}
          </h2>
        </div>
        <div>
          <h3>Weaknesses</h3>
          <h2>
            {current.weaknesses.map((element) => {
              return element + " ";
            })}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Description;
