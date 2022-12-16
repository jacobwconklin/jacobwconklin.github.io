import React from 'react';
import { useState } from 'react';
import { connect } from "react-redux";
import { clearWords } from '../actions/ClearWords';
import CheckCorrectness from '../components/CheckCorrectness'

const SpeedGuessInput = (props) => {
    const [formText, setFormText] = useState([]);
    const [gameIsStarted, setGameIsStarted] = useState(false);

    const startOrResetGame = () => {
        // Start new game
        if (!gameIsStarted) {
            setGameIsStarted(true);
            props.startGame();
        } else {
            // Reset ongoing game
            // TODO need to turn off the timer!
            props.dispatch(clearWords());
            setGameIsStarted(false);
            props.resetGame();
        }
    }

    const pressedEnter = (e) => {
        e.preventDefault();
        setFormText('');
    }
    
    const displayAndCheckChange = (e) => {
        e.preventDefault();
        const currTypedWord = e.target.value;
        setFormText(currTypedWord); // Allows user's typed word to be displayed
        if (CheckCorrectness(props.correctWord, currTypedWord.trim())) {
            setFormText(''); // Empty out / reset form after correct word is typed
            // submit function from CrosswordBuilder is passed down here:
            props.submitWord();
        }
    }

    //jsx for the form users enter their word into
    return (
        <div style={{}}>
            <form onSubmit={e => pressedEnter(e)} disabled={!props.prevWord}>
                <input 
                    className='GuessInput'
                    placeholder="Type Here" 
                    type='text' 
                    value={formText}
                    onChange={e => displayAndCheckChange(e) }
                /> {/* TODO on change also build out little fake single word overtop 
                of current word with like green letters to show user where they are typing */}
                <br></br>
                <button>
                    Clear typed word [ENTER]
                </button>
            </form>
            {/* Start game button could double as reset button maybe */}
            <button onClick={startOrResetGame}>{ gameIsStarted ? 'RESET' : 'START' }</button>
            {/* to display user's guess: Instead, may just want to make the form a lot bigger*/}
            {
                gameIsStarted ? 
                <h1> 
                   | {formText} |
                </h1> :
                <h1> 
                    Type As Many Words As You Can
                </h1>
            }
        </div>
    )

}


export default connect()(SpeedGuessInput);