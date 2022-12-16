import React, { useState } from "react";
import { connect } from "react-redux";
import { showFirstLetter } from "../actions/ShowFirstLetter";
import { revealLetter } from "../actions/RevealLetter";
// Additional buttons for the crossword game, such as potentially:
// Most / all of these could be accomplished utilizing the Flags.js reducer
// 1) always show first letter
// 2) give a hint -> (maybe pull more info than definition) -> could show up in a modal
// 3) reveal a letter -> reveals another letter of the word somehow
const CrosswordButtons = (props) => {
    // console.log('in CrosswordButtons props.flags is:',props.flags );
    
    const [isShowingFirstLetter, setShowingFirstLetter] = useState(true); 
    const [lettersRevealed, setLettersRevealed] = useState(0); 
    // Maybe have multiple possible states for the hint such as synonyms, other definitions, etc. 

    const giveHint = () => {
        // This can be entirely handled here to not overcomplicate,
        // just need to pull current word from state
        // Could also pull x and y if I want the modal over the word... 
        const currWord = props.words.filter(word => !word.showLetters)[0].word;
        // console.log('current word in Give hint in CrosswordButtons is:', currWord);
        // Fetch more information such as synonyms, other definitions, parts of speech etc. 
        let synonym = '';
        let altDefintion = '';
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currWord}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data[0].meanings);
            for ( let i = 0; i < data[0].meanings.length; i++) {
                // already have meanings[0].definitions[0] as base definition so don't use i == 0
                // and for now I am just grabbing one alternative definition then stopping
                if (i !== 0 && !altDefintion) {
                    altDefintion = data[0].meanings[i].definitions[0].definition;
                }
                if (!synonym && data[0].meanings[i].synonyms.length > 0) {
                    synonym = data[0].meanings[i].synonyms[0]; // This will only get the first synonym!
                }
            }
            // go through data[0].meanings array, look for any synonyms or an alternative definitions
            // setDefinition( data[0].meanings[0].definitions[0].definition );
        })
        .then(() => { 
            props.giveHint(synonym, altDefintion)
        });
    }

    const clickedShowFirstLetter = () => {
        setShowingFirstLetter(!isShowingFirstLetter);
        props.dispatch(showFirstLetter());
    }

    const clickedRevealLetter = () => {
        setLettersRevealed(lettersRevealed + 1);
        props.dispatch(revealLetter());
        // console.log('dispatched to revealLetter', props.flags[0]);
    }

    return (
        <div>
            <button onClick={clickedShowFirstLetter} className='showFirstLetterButton'> 
                {isShowingFirstLetter ? 'Hide First Letters' : 'Show First Letters'} 
            </button>
            <button onClick={giveHint} disabled={props.words.length === 0}> Give Me A Hint </button>
            <button onClick={clickedRevealLetter} disabled={props.words.length === 0}> 
                Reveal A Letter {lettersRevealed ? lettersRevealed + ' Revealed' : ''} 
            </button>
        </div>
    )
}
const mapStateToProps = (state, props) => {
    return { flags:state.flags, words:state.words} 
}

export default connect(mapStateToProps)(CrosswordButtons);