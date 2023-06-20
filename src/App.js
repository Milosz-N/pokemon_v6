import { useState, useEffect, Suspense } from "react";
import List from "./components/List";
import PopUp from "./components/PopUp.js";
import "../src/components/scss/main.scss";

const App = () => {
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1005.png
  const [searchField, setSearchField] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [index, setIndex] = useState(-1); // -1 - nie ma popup

  const [pokemon, setPokemon] = useState(
    new Array(1010).fill({
      name: "",
      id: "",
      color: "",
      evolution: "",
      height: "",
      weight: "",
      category: "",
      abilities: [],
      types: [],
      stats: [],
      damage: [],
     evolution_array: ''
     
    })
  );
  
  const [listItems, setListItems] = useState(50);
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
      return item.name.toLocaleLowerCase().includes(searchField);
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
        placeholder="Search by Name"
      />
      <Suspense fallback={<h2>czekaj</h2>}>

      <List
        pokemon={filteredPokemon}
        listItems={listItems}
        setIndex={setIndex}
      />
      </Suspense>

      {index > 0 && (
        <PopUp
          index={index}
          setIndex={setIndex}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      )}
      {searchField == []  && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <button
            className="btn-next"
            onClick={() => setListItems(listItems + 50)}
          >
            Show more...
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
