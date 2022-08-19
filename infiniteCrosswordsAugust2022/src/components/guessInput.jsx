// Input form for users' guesses. Should update single source of truth with user's word
// Checks that length matches and could start / end word with correct letter if desired
import React from 'react';
import { useState } from 'react';
import { connect } from "react-redux";
import { clearWords } from '../actions/ClearWords';

const GuessInput = (props) => {
    const [stateText = 'defaultValue', setText] = useState([]);
    const [formText, setFormText] = useState([]);
    const [gameIsStarted, setGameIsStarted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const guess = e.target[0].value;
        setText(guess);
        setFormText(''); // Empty out / reset form after submission
        // console.log('user word is: ', guess);
        // submit function from CrosswordBuilder is passed down here:
        props.submitWord(guess);
    }

    const startOrResetGame = () => {
        if (!gameIsStarted) {
            setGameIsStarted(true);
            props.startGame();
        } else {
            // Reset ongoing game
            console.log('in guessinput checking that props.dispatch exists:', props.dispatch);
            props.dispatch(clearWords());
            setGameIsStarted(false);
        }
    }

    //jsx for the form users enter their word into
    return (
        <div style={{}}>
            <form onSubmit={onSubmit}>
                <input 
                    className='GuessInput'
                    placeholder="Type your guess here" 
                    type='text' 
                    value={formText}
                    onChange={e => setFormText(e.target.value)}
                />
                <button>
                    I'M SURE
                </button>
            </form>
            {/* Start game button could double as reset button maybe */}
            <button onClick={startOrResetGame}>{ gameIsStarted ? 'RESET' : 'START' }</button>
            <h1> Your Guess:  {stateText}</h1>
        </div>
    )

}


export default connect()(GuessInput);