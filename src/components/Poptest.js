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
// console.log(current.values.evolves_to[0])

  // console.log(current.values.evolves_to)
    useEffect(() => {
        // console.log(pokemon.evolution);
        const x = (evolution.find(element =>{
        return element.url == pokemon.evolution
        }))
        
        if(x !== undefined ){ 
          // console.log('nie robie')  
            setCurrent(evolution.find(value =>{return((value.url) == pokemon.evolution)}))

        }
        else{
            if (pokemon.evolution !== "" ) {
              // console.log("robie")
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
      function getOccurrence(array, value) {
        console.log(value)
        var count = 0;
        var arr = [];
        // array.forEach((v) => (v.name === value && ( arr.push(v.id) )));
        // console.log(count)
        if(array.find((pokemon) => pokemon.name == value ) !== undefined){
          // console.log(arr)
          // console.log(value[0].id)
          // return array[0].id
          console.log('jest wiekszy niz zero')
          console.log(array.find((pokemon) => pokemon.name == value ).id )

        }
        else{
          console.log('jest mniejszy')
          console.log(array.find((pokemon) => pokemon.name.includes(value)).id )
          // return(array.find((pokemon) => pokemon.name == value).id)
        }
    }
      // `url(${Background})`
    return (
    <div className="container-evolution">
        {current != undefined && (
          
            <>
            <button
             onClick={() => {
              setIndex(list.find((pokemon) => pokemon.name == current.values.species.name) != undefined ?list.find((pokemon) => pokemon.name == current.values.species.name).id: list.find((pokemon) => pokemon.name.includes(current.values.species.name)).id
              );
            }}
            >
                  <img
                className="image-evolution"
                
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  list.find((pokemon) => pokemon.name == current.values.species.name) != undefined ?list.find((pokemon) => pokemon.name == current.values.species.name).id: list.find((pokemon) => pokemon.name.includes(current.values.species.name)).id

                }.png`}
              />
                            <p>{current.values.species.name }</p>

                </button>
                <>
                  {current.values.evolves_to.length > 0 && (
                    <>
                  <h2
                  
                  >{`>`}</h2>

                    <div>
                     {current.values.evolves_to.map((element => {
                      // getOccurrence(list, element.species.name)
                      return(
                        <button className="button-evolution"
                        onClick={() => {
                          setIndex(list.find((pokemon) => pokemon.name == element.species.name ) !== undefined ? list.find((pokemon) => pokemon.name == element.species.name ).id : list.find((pokemon) => pokemon.name.includes(element.species.name)).id
                          );
                        }}
                        >
                           <img
                className="image-evolution"
                style={{
                  // width: (second.length || third.length > 4) > 4 && "80px",
                }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  // list.find((pokemon) => pokemon.name == element.species.name).id
                  list.find((pokemon) => pokemon.name == element.species.name ) !== undefined ? list.find((pokemon) => pokemon.name == element.species.name ).id : list.find((pokemon) => pokemon.name.includes(element.species.name)).id
                  // getOccurrence(list, element.species.name)
                }.png`}
              />
              <p>{element.species.name}</p>
                        </button>
                      )
                     }))}
                </div>
                {/* current.values.evolves_to[0] */}
                {current.values.evolves_to[0] != undefined &&current.values.evolves_to[0].evolves_to.length > 0 && (<>
                                  <h2  >{`>`}</h2>

                  <div>

                    
                  {  current.values.evolves_to[0].evolves_to.map((element) => {
                return (
                  <button className="button-evolution"
                  onClick={() => {
                    setIndex(                  list.find((pokemon) => pokemon.name == element.species.name ) !== undefined ? list.find((pokemon) => pokemon.name == element.species.name ).id : list.find((pokemon) => pokemon.name.includes(element.species.name)).id
                    );
                  }}
                  >
                               <img
                className="image-evolution"
                style={{
                }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  list.find((pokemon) => pokemon.name == element.species.name ) !== undefined ? list.find((pokemon) => pokemon.name == element.species.name ).id : list.find((pokemon) => pokemon.name.includes(element.species.name)).id
                }.png`}
              />
              <p>{element.species.name}</p>
                  </button>
                );
              })}
                  </div>
</>)}
   
                </>
                  )}
                  </>
                </>
        )}
   
     
    </div>
  );
}

export default Poptest;