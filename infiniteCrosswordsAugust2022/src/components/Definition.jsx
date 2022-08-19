import React from "react";
import { useState, useEffect } from "react";

// Maybe this could be a pure js file that returns the definition, idk
const Definition = (props) => {

    const [definition, setDefinition] = useState('Press Start to Begin (Maybe funny definition here)');

    useEffect(() => {
        if (!props.word) return;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.word}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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