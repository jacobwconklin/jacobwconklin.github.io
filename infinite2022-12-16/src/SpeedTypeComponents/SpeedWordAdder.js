const randomWords = require('random-words');

const SpeedWordAdder = (prevWord, allPrevWords) => {
    // Generate random new words. See if they can land on the prevWord. If they can,
    // bundle up the new word in a whole word object to be sent to Redux
    let newWord = '';
    let matchNotFound = true;
    let matchingLetter = -1;
    while(matchNotFound) {
        newWord = getValidRandomWord(allPrevWords); 
        matchingLetter = findLetterMatch(prevWord.word, newWord);
        if (matchingLetter > 0) matchNotFound = false;
    }
    // build word object
    const prevIsVertical = prevWord.orientation === 'Vertical';
    return {
        word:newWord, 
        orientation: prevIsVertical? 'Horizontal' : 'Vertical',
        x: prevIsVertical ? prevWord.x : prevWord.x + matchingLetter,
        y: prevIsVertical ? prevWord.y  + matchingLetter : prevWord.y,
        showLetters: false
    }
}

const findLetterMatch = (prevWord, newWord) => {
    // Save first letter of newWord to attatch to old word.
    const newFirstLetter = newWord[0];
    // Cycle through the old word from the end of the word to the 3rd letter
    for (let letter = prevWord.length - 1; letter > 1; letter--) {
        if (newFirstLetter === prevWord[letter]) return letter;
    }
    return -1;
  }

  const getValidRandomWord = (allWords) => {
    let isDuplicate = false;
    let randomWord = 'no';
    // Basically a manual do while loop
    while (randomWord.length <= 3 || isDuplicate ) {
      isDuplicate = false;
      randomWord = randomWords();
      // loop through all words to weed out duplicates
      for (let existingWord = 0; existingWord < allWords.length; existingWord++) {
        if (allWords[existingWord].word.toLowerCase() === randomWord.toLowerCase()) {
          isDuplicate = true;
        }
      }
    }
    return randomWord;
  }

export default SpeedWordAdder;