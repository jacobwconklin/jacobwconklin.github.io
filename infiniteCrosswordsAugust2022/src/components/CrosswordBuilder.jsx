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

const randomWords = require('random-words');

const CrosswordBuilder = (props) => {

    // Stored in CrosswordBuilder state
    const [currentWord, setCurrentWord] = useState();
    const [newWords, setNewWords] = useState(alphabeticalWords);

    const submitWord = async (userWord) => {
        // console.log('in crosswordbuilder prev/ current word is: ', props.prevWord.word);
        // console.log('in crosswordbuilder userGuess word is: ', userWord);
        if (CheckCorrectness(props.prevWord.word, userWord)) {
            // user guess is correct
            props.dispatch(showLetters(userWord));
            // WordAdder actually just supplies a new set up word object
            const newWordObject = await WordAdder(props.prevWords, newWords);
            // console.log('in crosswordbuilder newWordObject is:', newWordObject);
            await props.dispatch(addWord(newWordObject));
            await setCurrentWord(newWordObject.word);
            await collectNewWords();
            // scroll to new word:
            scrollToNewWord();
        } else {
            // user guess is over, therefore end the game.
            console.log('game ogre');
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

    const collectNewWords = () => {
        // Trying npm random words here:
        setNewWords(randomWords(50).concat(alphabeticalWords));

        // This technique pulls from the random-word-api.herokuapp.com,
        // it works but gives very obscure words and many do not have
        // definitions on my current definition api 
        /*
        fetch('https://random-word-api.herokuapp.com/word?number=50')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.filter(word => word.length > 3) 
        })
        .then(data => setNewWords(data.concat(alphabeticalWords)));
        */
    }

    return (
        <div>
            <GuessInput submitWord={submitWord} startGame={startGame}/>
            <Definition word={currentWord} />
        </div>
    )
}

// Temporary list of words for testing:
const alphabeticalWords = [
    'apple',
    'beetle',
    'carrot',
    'dragon',
    'eccentric',
    'fountain',
    'giant',
    'hilarious',
    'igloo',
    'jump',
    'kangaroo',
    'licked',
    'mustard',
    'north',
    'orientation',
    'powerful',
    'questions',
    'restaurant',
    'squeeze',
    'trunk',
    'uranium',
    'vibration',
    'wonderful',
    'xylophone',
    'yesterday',
    'zebra'
   ];


const mapStateToProps = (state, props) => {
    console.log('state in mapStateToProps in AllWords is:', state);
    const prevWords = state.words;
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    // console.log('in mapStateToProps trying to get prevWord', prevWords)
    return { prevWords , prevWord, doAddWord:state.flags[0].addWord }; 
  }


export default connect(mapStateToProps)(CrosswordBuilder);