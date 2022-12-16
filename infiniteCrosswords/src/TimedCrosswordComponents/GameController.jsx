import GameDisplay from "./GameDisplay";
import CheckCorrectness from "../components/CheckCorrectness";
import { showLetters } from "../actions/ShowLetters";
import WordAdder from "../components/WordAdder";
import { connect } from "react-redux";
import { addWord } from "../actions/AddWord";
import { useState } from "react";
import { clearWords } from "../actions/ClearWords";

const randomWords = require('random-words');

const GameController = (props) => {

    // Hold state variables about current game
    
    // For Wrong guess
    const [wrong, setWrong] = useState(false);
    // Word currently being guessed
    const [currentWord, setCurrentWord] = useState({word:'', orientation:'', x:0, y:0});
    // Single Source Of truth for if Game is running. 
    const [isStarted, setStarted] = useState(false);
    // For modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Ideally ONLY Game Controller should need redux freeing other components to do all
    // the stuff with the properties they need passed down and results of their actions passed up. 
    // Timer seconds and minutes to pass down:
    let timerSeconds;
    let timerMinutes;

    // Game running functions

    // Create the first random word to get the crossword going
    const startEndGame = () => {
        if (isStarted) {
            // Need to end game
            setStarted(false);
            // TODO can add modal with score
            handleOpen();
            setTimeout(() => handleClose(), 5000);
        } else {
            // Need to start game, first clear out grid;
            props.dispatch(clearWords());
            let word = 'no';
            while (word.length <= 3) {
                word = randomWords();
            }
            const x = 8;
            const y = 3;
            const orientation = Math.random() > 0.49 ? 'Vertical' : 'Horizontal';
            const showLetters = false; 
            setCurrentWord({word, x, y, orientation, showLetters});
            props.dispatch(addWord({word, x, y, orientation, showLetters}));
            setStarted(true);
            // Start timer
            // const time = new Date();
            // time.setSeconds(time.getSeconds() + 1000 + props.amountOfTime ? props.amountOfTime : 60);
            // const {
            //     seconds,
            //     minutes,
            //     hours,
            //     days,
            //     isRunning,
            //     start,
            //     pause,
            //     resume,
            //     restart,
            // } = useTimer({ time, onExpire: () => { setStarted(false); } });
            // timerSeconds = seconds;
            // timerMinutes = minutes;
        }
    }

    // User has submitted a guess,
    // Return true if word was guessed correctly
    const submitWord = async (userWord) => {
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
            await setCurrentWord(newWordObject);
            // scroll to new word:
            scrollToNewWord();
            return true;
        } else {
            // incorrect guess
            // TODO may want reduction to score, or maybe the time that is used up is punishment enough.
            setWrong(true);
            setTimeout(() => {
                setWrong(false);
            }, 750);
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

    return (
        <div>
            <GameDisplay 
                theme={props.flags[0].theme} 
                totalRevealed={props.flags[0].totalRevealed}
                wrong={wrong}
                currentWord={currentWord}
                submitWord={submitWord}
                isStarted={isStarted}
                startEndGame={startEndGame}
                score={props.grid[0].score}
                seconds={timerSeconds}
                minutes={timerMinutes}
                open={open}
                solvedWords={props.prevWords.length}
                handleClose={handleClose}
            ></GameDisplay>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    // all words in store
    const prevWords = state.words;
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    const flags = state.flags;
    const grid = state.grid;
    return { prevWords , prevWord, flags, grid}; 
  }

export default connect(mapStateToProps)(GameController);