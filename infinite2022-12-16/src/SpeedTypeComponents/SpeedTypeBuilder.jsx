// A component that builds out the speed typing crossword
// game. It takes user input through the SpeedGuessInput component
// then fetches new words with the simplified SpeedWordAdder. It also
// displays the current word for the player. Can also call function for 
// Timing the games.
import SpeedGuessInput from "./SpeedGuessInput";
import WordDisplay from "../components/WordDisplay";
import SpeedWordAdder from "./SpeedWordAdder";
import { showLetters } from "../actions/ShowLetters";
import { connect } from "react-redux";
import { addWord } from "../actions/AddWord";
import { useState } from "react";
import SpeedTimer from "./SpeedTimer";

const randomWords = require('random-words');

const SpeedTypeBuilder = (props) => {

    // Stored in CrosswordBuilder state
    const [currentWord, setCurrentWord] = useState();
    const [start, setStart] = useState(false);

    // Will know time has ended on return from SpeedTimer. Just need to pass down a game over
    // function prop to it
    const timeEnded = () => {
        // Disable everything, display score etc. 
        alert('Congratulations Your Score Is: ' + props.grid[0].score);
        setStart(false);
    }

    // Words are only submitted when correct in Speed Typer
    const submitWord = async () => {
            props.dispatch(showLetters(props.prevWord.word));
            // WordAdder actually just supplies a new set up word object
            const newWordObject = await SpeedWordAdder(
                props.prevWord, 
                props.prevWords,
            );
            await props.dispatch(addWord(newWordObject));
            await setCurrentWord(newWordObject.word);
            // scroll to new word:
            scrollToNewWord();
    }

    const scrollToNewWord = () => {
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
        // First word is given, now Start timer for say 2 minutes. 
        // TODO SpeedTimer(); -> make another .js file
        // decided to make timer .jsx so it is visible, will need to pass a prop down
        // to it to tell it to start
        setStart(true);
    }

    const resetGame = () => {
        setStart(false);
    }

    return (
        <div className="flexBoxSpeedHeader" style={{
            display:'flex',
            justifyContent:'center',
            alignContent:'center'
        }}>
            <div>
                <SpeedGuessInput 
                    correctWord={props.prevWord ? props.prevWord.word : null} 
                    submitWord={submitWord} 
                    startGame={startGame}
                    resetGame={resetGame}
                />
                <WordDisplay word={currentWord} />
            </div>
            {
                start && <SpeedTimer start={start} timeEnded={timeEnded}/>
            }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    // console.log('state in mapStateToProps in AllWords is:', state);
    const prevWords = state.words;
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    // console.log('in mapStateToProps trying to get prevWord', prevWords)
    return { prevWords , prevWord, flags:state.flags, grid:state.grid}; 
  }

export default connect(mapStateToProps)(SpeedTypeBuilder);