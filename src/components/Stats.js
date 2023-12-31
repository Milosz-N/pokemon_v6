import React from "react";
import "../components/scss/main.scss";
import "../components/scss/stats.scss";
function Stats({ current }) {
  return (
    <>
      <section className="container-stats">
        <h1>Stats</h1>

        {current.stats.map((element) => {
          return (
            <div className="stat" key={element.stat.name}>
              <h3>{element.stat.name}</h3>
              <div>
                <div
                  style={{
                    width:
                      (Number.parseInt(element.base_stat) / 255) * 100 + "%",
                  }}
                ></div>
                <h3>{element.base_stat}</h3>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Stats;
