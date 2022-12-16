// Input form for users' guesses. Should update single source of truth with user's word
// Checks that length matches and could start / end word with correct letter if desired
import React from 'react';
import { useState } from 'react';
import { connect } from "react-redux";
import { clearWords } from '../actions/ClearWords';
import CrosswordButtons from './CrosswordButtons';
import { changeTheme } from '../actions/ChangeTheme';

const GuessInput = (props) => {
    // const [stateText = 'defaultValue', setText] = useState([]);
    const [formText, setFormText] = useState([]);
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [synonym, setSynonym] = useState(''); 
    const [altDefintion, setAltDefinition] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const guess = e.target[0].value.trim();
        // setText(guess);
        setFormText(''); // Empty out / reset form after submission
        // console.log('user word is: ', guess);
        // submit function from CrosswordBuilder is passed down here:
        if (props.submitWord(guess)) {
            setShowHint(false);
            setSynonym('');
            setAltDefinition('');
        }
           
    }

    const startOrResetGame = () => {
        if (!gameIsStarted) {
            setGameIsStarted(true);
            props.startGame();
        } else {
            // Reset ongoing game
            // console.log('in guessinput checking that props.dispatch exists:', props.dispatch);
            props.dispatch(clearWords());
            setGameIsStarted(false);
        }
    }

    const giveHint = (synonym, altDefinition) => {
        setSynonym(synonym);
        setAltDefinition(altDefinition);
        setShowHint(true);
    }

    //jsx for the form users enter their word into
    return (
        <div style={{}}>
            <br></br>
            <button onClick={() => props.dispatch(changeTheme())}>
                THEME
            </button>
            <form onSubmit={onSubmit} style={{
                display:'inline',
                paddingLeft:'5px'
                }}>
                <input 
                    className='GuessInput'
                    placeholder="Type your guess here" 
                    type='text' 
                    value={formText}
                    onChange={e => setFormText(e.target.value)}
                /> {/* TODO on change also build out little fake single word overtop 
                of current word with like green letters to show user where they are typing */}
                <button>
                    I'M SURE
                </button>
            </form>
            <CrosswordButtons giveHint={giveHint}/>
            {/* Start game button could double as reset button maybe */}
            <button onClick={startOrResetGame}>{ gameIsStarted ? 'RESET' : 'START' }</button>
            {/* to display user's guess: <h1> Your Guess:  {stateText}</h1> */}
            {
                /* Add suport so show the word the user is typing on the crossword puzzle as they type 
                <WordBeingTyped text={formText}/> */
            }
            {
                showHint && 
                <div>
                    { synonym && 
                        <p>Synonym: {synonym} </p>
                    }
                    { altDefintion && 
                        <p>Alternative Definition: {altDefintion} </p>
                    }
                    { !synonym && !altDefintion && 
                        <p> Unfortunately there is no Hint Available </p>
                    }
                </div>
            }
        </div>
    )

}


export default connect()(GuessInput);