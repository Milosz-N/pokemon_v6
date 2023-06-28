import React from "react";
import "../components/scss/main.scss";
import "../components/scss/stats.scss";
function Stats({ current }) {
  return (
    <>
      <section className="container-stats">
        <h1>Stats</h1>

        {current.stats.map((element,index) => {
          return (
            <div className="stat"
            key={index}
            >
              <h3
              key = {element.stat.name}
              >{element.stat.name}</h3>
              <div
                              key={(Number.parseInt(element.base_stat) / 255) * 100}

              >
                <div
                                key={(Number.parseInt(element.base_stat) / 255)}

                  style={{
                    width:
                      (Number.parseInt(element.base_stat) / 255) * 100 + "%",
                  }}
                ></div>
                <h3
                key={element.base_stat}
                >{element.base_stat}</h3>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Stats;
