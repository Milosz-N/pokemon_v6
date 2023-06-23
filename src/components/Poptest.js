import React, {useState, useEffect} from "react";
import "../components/scss/evolution.scss";
import "../components/scss/main.scss"
function Poptest( {pokemon, setIndex, index, list}) {
    const [evolution, setEvolution] = useState([]);
    const [current, setCurrent] = useState();
    const [Id, setId] = useState(0);
  //  useEffect(()=>{console.log(index)},[index])
  // console.log(current.values.evolves_to.length);
  // console.log(current.values.evolves_to.species.name);
  // console.log(Id)
  // console.log(current.values.species.name)
// console.log(index)
console.log(current)

  // console.log(current.values.evolves_to)
    useEffect(() => {
        // console.log(pokemon.evolution);
        const x = (evolution.find(element =>{
        return element.url == pokemon.evolution
        }))
        
        if(x !== undefined ){ 
          console.log('nie robie')  
            setCurrent(evolution.find(value =>{return((value.url) == pokemon.evolution)}))

        }
        else{
            if (pokemon.evolution !== "" ) {
              console.log("robie")
                // if(evolution.find(element => element.id == current.id) != undefined)
              fetch(`${pokemon.evolution}`)
                .then((res) => res.json())
                .catch((ex) => ex)
                .then((values) => {
                setId(values.id)
                if(!(evolution.find(element => Number.parseInt(element.id) == Number.parseInt(values.id)))){
                    setEvolution([...evolution, {id: values.id, values: values.chain, url: pokemon.evolution}]);
                    
                }
                });
    
              }
    
              setCurrent(evolution.find(value =>{return(Number.parseInt(value.id) == Number.parseInt(Id))}))

        }
     
        // console.log(current)
      
      }, [pokemon]);
      // `url(${Background})`
    return (
    <div className="container-evolution">
        {current != undefined && (
            <>
            <button>
                  <img
                className="image-evolution"
                style={{
                  // width: (second.length || third.length > 4) > 4 && "80px",
                }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  list.find((pokemon) => pokemon.name == current.values.species.name).id

                }.png`}
              />
                            <p>{current.values.species.name }</p>

                </button>
                <
                
                >
                  {current.values.evolves_to !== undefined && (
                    <>
                  <h2
                  
                  >{`>`}</h2>

                    <div>
                     {current.values.evolves_to.map((element => {
                      return(
                        <button className="button-evolution">
                           <img
                className="image-evolution"
                style={{
                  // width: (second.length || third.length > 4) > 4 && "80px",
                }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  list.find((pokemon) => pokemon.name == element.species.name).id
                }.png`}
              />
              <p>{element.species.name}</p>
                        </button>
                      )
                     }))}
                </div>
                </>
                  )}
                  </>
                </>
        )}
   
     
    </div>
  );
}

export default Poptest;