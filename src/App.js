import { useState, useEffect } from "react";
import List from "./components/List";
// import Popup from "./components/Popup.js";
import "../src/components/scss/main.scss";
import Popup from "./components/PopUp";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [index, setIndex] = useState(-1); // -1 - nie ma popup
  const [listItems, setListItems] = useState(30);
  const [evolution, setEvolution] = useState([]);
  const [varieties, setVarieties] = useState([]);

  const [pokemon, setPokemon] = useState(
    new Array(1010).fill({
      name: "",
      id: "",
      color: "",
      evolution: "",
      height: "",
      weight: "",
      abilities: [],
      types: [],
      stats: [],
      generation: "",
      weaknesses: [],
      habitat: "",
      evolution_array: [],
      flavor_text: "",
      varieties: ""
    })
  );
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1010`)
      .then((response) => response.json())
      .then((response) => {
        setPokemon(
          [...pokemon].map((object, index) => {
            return {
              ...object,
              name: response.results[index].name,
              id: response.results[index].url.split("/")[
                response.results[index].url.split("/").length - 2
              ],
            };
          })
        );
      });
  }, []);
  useEffect(() => {
    const newFilteredPokemon = pokemon.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchField) ||
        item.id.toString().includes(searchField)
      );
    });

    setFilteredPokemon(newFilteredPokemon);
  }, [pokemon, searchField]);
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  return (
    <div className="App">
      <input
        type="search"
        onChange={onSearchChange}
        placeholder="Search by Name or Id"
      />
      <>
        <List
          pokemon={filteredPokemon}
          listItems={listItems}
          setIndex={setIndex}
          index={index}
        />
        {searchField == [] && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="btn-next"
              onClick={() => setListItems(listItems + 30)}
            >
              Show more...
            </button>
          </div>
        )}
      </>
      <>
        {index != -1 && (
          <Popup
            index={index}
            setIndex={setIndex}
            pokemon={pokemon}
            setPokemon={setPokemon}
            evolution={evolution}
            setEvolution={setEvolution}
            varieties={varieties}
            setVarieties={setVarieties}
          />
        )}
      </>
    </div>
  );
};

export default App;
