// Input form for users' guesses. Should update single source of truth with user's word
// Checks that length matches and could start / end word with correct letter if desired
import React from 'react';
import { useState } from 'react';
import { connect } from "react-redux";
import TimedButtons from './TimedButtons';
import { changeTheme } from '../actions/ChangeTheme';

const GuessInput = (props) => {
    // const [stateText = 'defaultValue', setText] = useState([]);
    const [showHint, setShowHint] = useState(false);
    const [synonym, setSynonym] = useState(''); 
    const [altDefintion, setAltDefinition] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const guess = e.target[0].value.trim();
        // setText(guess);
        props.setFormText(''); // Empty out / reset form after submission
        e.target[0].value = '';
        // console.log('user word is: ', guess);
        // submit function from CrosswordBuilder is passed down here:
        if (props.submitWord(guess)) {
            setShowHint(false);
        }
    }

    const giveHint = (synonym, altDefinition) => {
        setSynonym(synonym);
        setAltDefinition(altDefinition);
        setShowHint(!showHint);
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
                    disabled={!props.isStarted}
                    className='GuessInput'
                    placeholder="Type your guess here" 
                    type='text' 
                    onChange={e => props.setFormText(e.target.value)}
                /> {/* TODO on change also build out little fake single word overtop 
                of current word with like green letters to show user where they are typing */}
                <button>
                    I'M SURE
                </button>
            </form>
            <TimedButtons 
                giveHint={giveHint} 
                currentWord={props.currentWord}
                // increaseLettersRevealed={props.increaseLettersRevealed}
            />
            {/* Start game button could double as reset button maybe */}
            <button onClick={props.startEndGame}>{ props.isStarted ? 'END' : 'START' }</button>
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