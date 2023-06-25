import React from "react";
import "../components/scss/main.scss";
import "../components/scss/header.scss";
function Header({ next, prev, setIndex, current }) {
  return (
    <>
      <header>
        <div className="container-btn-small">
          {prev != undefined && (
            <button
              onClick={() => {
                setIndex((current) => current - 1);
              }}
            >
              <h3>←</h3>
              <div
                className="image-small"
                style={{
                  backgroundImage: `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    Number.parseInt(current.id) - 1
                  }.png")`,
                }}
              ></div>
              <h3>{prev.name + " #" + prev.id}</h3>
            </button>
          )}
        </div>
        <h1>
          {current.name} #{current.id}
        </h1>
        <div className="container-btn-small">
          {next != undefined && (
            <button
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
              <h3>→</h3>
              <h3>{next.name + " #" + next.id}</h3>
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
