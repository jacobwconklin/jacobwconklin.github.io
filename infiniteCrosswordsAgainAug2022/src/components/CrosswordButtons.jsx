import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "@mui/material";
import { showFirstLetter } from "../actions/ShowFirstLetter";
import { revealLetter } from "../actions/RevealLetter";
// Additional buttons for the crossword game, such as potentially:
// Most / all of these could be accomplished utilizing the Flags.js reducer
// 1) always show first letter
// 2) give a hint -> (maybe pull more info than definition) -> could show up in a modal
// 3) reveal a letter -> reveals another letter of the word somehow
const CrosswordButtons = (props) => {
    // console.log('in CrosswordButtons props.flags is:',props.flags );
    
    const [isShowingFirstLetter, setShowingFirstLetter] = useState(false); 
    const [lettersRevealed, setLettersRevealed] = useState(0); // can delete this too
    const [currentWord, setCurrWord] = useState(''); // temporary remove this

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const giveHint = () => {
        // This can be entirely handled here to not overcomplicate,
        // just need to pull current word from state
        // Could also pull x and y if I want the modal over the word... 
        const currWord = props.words.filter(word => !word.showLetters)[0].word;
        // console.log('current word in Give hint in CrosswordButtons is:', currWord);
        /* Fetch more information such as synonyms, other definitions, parts of speech etc. 
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currWord}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setDefinition( data[0].meanings[0].definitions[0].definition );
        });
        */
        setCurrWord(currWord);
        handleOpen();
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
            <Modal 
                style={{backgroundColor: 'gold', width: 400, height: 100, marginTop: 50, marginLeft: 50, opacity:'100%'}}
                open={open}
                onClose={handleClose}
            > 
            <div>
                <p> Hint Modal! wip </p>
                <p> word is: {currentWord}</p>
            </div>
            </Modal>
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