import React, {useEffect, useState} from "react";
import "../components/scss/main.scss";
import "../components/scss/variertes.scss";

function Varieties({ current, id, setVariertes, varieties }) {
    // console.log(curr?ent);
    // console.log(current)
   
   useEffect(()=>{
    // console.log(current[0]);
    // current.map(element =>{
    //     console.log(element)
    // }) 
    current.length > 0 &&  current.map(element =>{
        // console.log(element);
        fetch(`${element}`)
   
    .then((res) => res.json())
    .catch((ex) => ex)
    .then((values) => {
        console.log(values)
        
    })
        
    }) 
  
    ;   },[current])
    return (
   <section className="container-variertes">
    <h1>Varieties</h1>
    <div>
        <button className="button-evolution">

        </button>
    </div>
   </section>
  );
}

export default Varieties;