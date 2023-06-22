import Card from "./Card";
import React, {useState, useEffect} from "react";
function Poptest( {pokemon}) {
    const [evolution, setEvolution] = useState([]);
    const [current, setCurrent] = useState();
    const [Id, setId] = useState(0);
   
    useEffect(() => {
        // console.log(pokemon.evolution);
        const x = (evolution.find(element =>{
        return element.url == pokemon.evolution
        }))
        
        if(x !== undefined  ){
            setCurrent(evolution.find(value =>{return((value.url) == pokemon.evolution)}))

        }
        else{
            if (pokemon.evolution !== "" ) {
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
      
    return (
    <div className="container">
        {current != undefined && (
            <h2>{current.values.species.name}</h2>
        )}
   
     
    </div>
  );
}

export default Poptest;