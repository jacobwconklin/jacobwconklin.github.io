import React from "react";
import { useState, useEffect } from "react";

// Maybe this could be a pure js file that returns the definition, idk
const Definition = (props) => {

    const [definition, setDefinition] = useState('Press Start to Begin');

    useEffect(() => {
        if (!props.isStarted) {
            setDefinition('Press Start to Begin');
        } else {
            console.log('curr word in Definition.jsx is', props.word);
            if (!props.word) return;

            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.word}`)
            .then(response => response.json())
            .then(data => {
                if (data[0].hasOwnProperty('meanings')) {
                    setDefinition( data[0].meanings[0].definitions[0].definition )
                    // TODO check if definition has the word in it, if it does try switching the definition.
                    // IE. if definition.includes(props.word) { see if other definition is available, 
                    // and if so setDefintion again }
                } else {
                    setDefinition( 'No definition found, word is: ' + props.word);
                }
            });
        }
        
        // should run whenever props.word changes
      }, [props.word, props.isStarted]);

    return (
        <div>
            <h3>{definition}</h3>
        </div>
    )
}

export default Definition;