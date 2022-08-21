import React from "react";
import { useState, useEffect } from "react";

// Maybe this could be a pure js file that returns the definition, idk
const Definition = (props) => {

    const [definition, setDefinition] = useState('Press Start to Begin');

    useEffect(() => {
        if (!props.word) return;
        // if we are doing pokemons, get their definition from 
        // https://pokeapi.co/api/v2/pokemon/${pokemonName}
        // And / or get a picture from 
        // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIDNumber}.png

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.word}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setDefinition( data[0].meanings[0].definitions[0].definition );
        });
        // should run whenever props.word changes
      }, [props.word]);

    return (
        <div>
            <h3>{definition}</h3>
        </div>
    )
}

export default Definition;