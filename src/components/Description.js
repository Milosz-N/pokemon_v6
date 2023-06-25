import React from "react";
import "../components/scss/main.scss";
import "../components/scss/description.scss";
function Description({ current }) {
  return (
    <>
      <img
        className="img-description"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${current.id}.png`}
        style={{ backgroundColor: `${current.color}` }}
      />
      <div className="container-description">
        <h3>Height</h3>
        <h2
          key={Number.parseFloat(current.height / 10).toFixed(1) + current.name}
        >
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
        <h3>Weight</h3>
        <h2 key={Number.parseFloat(current.weight / 10).toFixed(1)}>
          {(Number.isInteger(current.weight / 10)
            ? Number.parseInt(current.weight / 10)
            : Number.parseFloat(current.weight / 10).toFixed(1)) + " kg "}
          {(Number.isInteger((current.weight * 2.20462262) / 10)
            ? Number.parseFloat((current.weight * 2.20462262) / 10)
            : Number.parseFloat((current.weight * 2.20462262) / 10).toFixed(
                1
              )) + " lbs"}{" "}
        </h2>

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
          <h3>Weakness</h3>
          <h2>
            {current.damage.map((element) => {
              return element + " ";
            })}
          </h2>
        </div>
      </div>
    </>
  );
}

export default Description;