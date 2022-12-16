// Check's if word is correct, if so word is revealed pass on to WordAdder to get a new word,
// if not, also reveal word and let patron know they failed, should leave to game over modal with
// reset button. Also just should have reset button. 
const CheckCorrectness = (wordInPuzzle, userWord) => {
    return (wordInPuzzle.toLowerCase() === userWord.toLowerCase());
}

export default CheckCorrectness;