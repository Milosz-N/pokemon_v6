import React from "react";
import "../components/scss/main.scss";
import "../components/scss/header.scss";
function Header({ next, prev, setIndex, current, min, max }) {
  return (
    <>
      <header>
        <button
          onClick={() => {
            setIndex((current) =>
              prev !== undefined
                ? Number.parseInt(current) - 1
                : Number.parseInt(max.id)
            );
          }}
        >
          <h3>◀</h3>
          <div
            style={{
              backgroundImage: `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                prev !== undefined
                  ? Number.parseInt(current.id) - 1
                  : Number.parseInt(max.id)
              }.png")`,
            }}
          ></div>
          <h3>
            {prev !== undefined
              ? prev.name + " #" + prev.id
              : max.name + " #" + max.id}
          </h3>
        </button>
        <h1>
          {current.name} #{current.id}
        </h1>
        <button
          onClick={() => {
            setIndex((current) =>
              next !== undefined
                ? Number.parseInt(current) + 1
                : Number.parseInt(min.id)
            );
          }}
        >
          <div
            style={{
              backgroundImage: `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                next !== undefined
                  ? Number.parseInt(current.id) + 1
                  : Number.parseInt(min.id)
              }.png")`,
            }}
          ></div>
          <h3>►</h3>

          <h3>
            {next !== undefined
              ? next.name + " #" + next.id
              : min.name + " #" + min.id}
          </h3>
        </button>
      </header>
    </>
  );
}

export default Header;
