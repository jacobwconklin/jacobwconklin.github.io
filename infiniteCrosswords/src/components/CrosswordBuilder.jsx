// A component meant to combine components used to build and populate the crossword
// so the GuessInput component, as well as adding functionality for adding words,
// checking if a word is correct, etc. 
import GuessInput from "./guessInput";
import CheckCorrectness from "./CheckCorrectness";
import { showLetters } from "../actions/ShowLetters";
import WordAdder from "./WordAdder";
import { connect } from "react-redux";
import { addWord } from "../actions/AddWord";
import Definition from "./Definition";
import { useState } from "react";
import { Modal } from "@mui/material";

const randomWords = require('random-words');

const CrosswordBuilder = (props) => {

    // For modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Stored in CrosswordBuilder state
    const [currentWord, setCurrentWord] = useState();

    // Return true if word was guessed correctly
    const submitWord = async (userWord) => {
        // console.log('in crosswordbuilder prev/ current word is: ', props.prevWord.word);
        // console.log('in crosswordbuilder userGuess word is: ', userWord);
        console.log('grid redux store in Crosswordbuilder props is', props.grid);
        if (CheckCorrectness(props.prevWord.word, userWord)) {
            // user guess is correct
            props.dispatch(showLetters(userWord));
            // WordAdder actually just supplies a new set up word object
            const newWordObject = await WordAdder(
                props.prevWords, 
                props.grid[0].furthestX, 
                props.grid[0].furthestY
            );
            // console.log('in crosswordbuilder newWordObject is:', newWordObject);
            await props.dispatch(addWord(newWordObject));
            await setCurrentWord(newWordObject.word);
            // scroll to new word:
            scrollToNewWord();
            return true;
        } else {
            // incorrect guess
            handleOpen();
            setTimeout(() => {
                handleClose();
            }, 1500);
            return false;
        }
    }

    const scrollToNewWord = () => {
        // This code words great, I just need it to get called after the
        // App has had ample time to re-render
        document.getElementById("NewWord").scrollIntoView(
            {behavior:"smooth", block:'end', inline:'center'}
        )
    }

    // Create the first random word to get the crossword going
    const startGame = () => {
        let word = 'no';
        while (word.length <= 3) {
            word = randomWords();
        }
        setCurrentWord(word);
        const x = 8;
        const y = 3;
        const orientation = Math.random() > 0.49 ? 'Vertical' : 'Horizontal';
        const showLetters = false; 
        props.dispatch(addWord({word, x, y, orientation, showLetters}));
    }

    return (
        <div>
            <GuessInput submitWord={submitWord} startGame={startGame}/>
            <Definition word={currentWord} isStarted={true}/>
            <Modal 
                style={{
                    backgroundColor: 'gold', 
                    textAlign:'center', 
                    width: '100vw', 
                    height: '150px', 
                    opacity:'100%'
                }}
                open={open}
                onClose={handleClose}
            >
                <div className="WrapperForIncorrectModal" style={{
                }}>
                    <h1> INCORRECT </h1>
                    <button onClick={handleClose} style={{border:'none'}}>CONTINUE</button>
                </div>
            </Modal> 
        </div>
    )
}

const mapStateToProps = (state, props) => {
    // console.log('state in mapStateToProps in AllWords is:', state);
    const prevWords = state.words;
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    // console.log('in mapStateToProps trying to get prevWord', prevWords)
    return { prevWords , prevWord, doAddWord:state.flags[0].addWord, grid:state.grid}; 
  }

export default connect(mapStateToProps)(CrosswordBuilder);