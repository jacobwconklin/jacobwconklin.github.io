const randomWords = require('random-words');
// Now WordAdder has been simplified, it works as a pure js function taking in
// an object for the previous word and finding and and building a new word object
// to return
const WordAdder = (prevWords, furthestX, furthestY) => {

  // console.log('prev words in word adder is:', prevWords);

  if (!prevWords) {
    const word = 'noPrevWord';
    const x = 200;
    const y = 300;
    const orientation = 'Vertical';
    return {word, x, y, orientation, showLetters:true};
  }
  // set up scope of variables used after loop
  let wordCount = -1;
  let connection = null;
  let randomWord = 'no';
    // This will cycle through the generated words, and is guarenteed to have a match
    // because a word starting with every letter of the alphabet is in the list
    while (!connection) {
      // Cycle through all words in the puzzle not just the last word:
      wordCount = ++wordCount;
      randomWord = getValidRandomWord(prevWords); 
      // console.log('new words in wordAdder are:', newWords);
      // console.log('trying to connect to word:', connectingWord.word);
      // console.log('in word adder wordCount is:', wordCount);
      // console.log('word getting passed into findSlot is:', randomWord);
      connection = findSlot( randomWord, prevWords, furthestX, furthestY);
    } 
  const word = randomWord;
  const { newStartX, newStartY, newOrientation } = connection;
  // now the newWord is known and the letter of the prevWord it connects to is known
  // need to create the fields necessary to save the new word. A lot depends on if
  // the prev word is horizontal or vertical so let's go ahead and save that.
  // const prevIsVertical = connectingWord.orientation === 'Vertical';
  // orientation = opposite orientaiton of prevWord
  // const orientation = prevIsVertical ? 'Horizontal' : 'Vertical';
  // const x = prevIsVertical ? connectingWord.x - newLetter : oldLetter + connectingWord.x; 
  // const y = prevIsVertical ? oldLetter + connectingWord.y : connectingWord.y - newLetter
  return {word, x: newStartX, y: newStartY, orientation: newOrientation, showLetters:false};
}

// Gives a valid random word IE: longer than 3 letters and not already in the existing words
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

const getGrid = (allWords, furthestX, furthestY) => {
  // Can crank these up or eventually pull them dynamically from the largest
  // x and y in all the words
  // Need to make sure These are ordered correctly
  const row = (furthestX && furthestX + 25) || 10000;
  const column = (furthestY && furthestY + 25) || 10000;
  let grid = Array.from({
    // create array of length `row`
    length: row 
    // map function to generate values
  }, () => new Array(column).fill(0));
  for (let word = 0; word < allWords.length; word++) {
    const currWord = allWords[word];
    if (currWord.orientation === 'Vertical') {
      for (let letter = 0; letter < currWord.word.length; letter++) {
        grid[currWord.x][currWord.y + letter] = currWord.word[letter];
      }
    } else {
      for (let letter = 0; letter < currWord.word.length; letter++) {
        grid[currWord.x + letter][currWord.y] = currWord.word[letter];
      }
    }
  } 
  return grid;
} 

// The function that finds a location a new word can slot into the puzzle, should favor adding to the
// words in the order that they are added, so earlier words are connected to as much as possible as the puzzle
// progresses. 
// returns the nth letter of the old word that the new word can atatch to or -1 if no match
const findSlot = (newWord, allWords, furthestX, furthestY) => {

  // May just build grid here because of negative x and y's pushing entire grid 
  // could keep track of FURTHEST X AND Y somewhere and base the size of the grid
  // off of that plus some
  const grid = getGrid(allWords, furthestX, furthestY);
  // console.log('seeing how grid is currently:', grid);
  // try to only use prevwords not oldword and no longer cycle
  // through oldword where I used to ********
  
  // Grid solution to findSlot {without oldWord param} : 
  for (let existingWord = 0; existingWord < allWords.length; existingWord++) {
    // for each old word, go through each letter and try each letter of the new word
    const old = allWords[existingWord];
    for (let oldLetter = 0; oldLetter < old.word.length; oldLetter++) {
      // cycle through new word
      for (let newLetter = 0; newLetter < newWord.length; newLetter++) {
        if (old.word[oldLetter].toLowerCase() === newWord[newLetter].toLowerCase()) { 
          // we have a matching letter, try placing the new word and walking through the grid 
          // for each step in the grid examine :
          // 1) if vertical nothing can be one to the left or right
          //    also nothing can be one above the first letter or one below the final letter
          //    also any collisions need to be matching letters
          // 2) if horizontal vice versa
          // careful not to index grid at negative indicies. 
          let obstruction = false;
          const placingVertical = old.orientation === 'Horizontal';
          const newStartX = placingVertical ? old.x + oldLetter : old.x - newLetter;
          const newStartY = placingVertical ? old.y - newLetter : old.y + oldLetter;
          // walk through grid 
          if (placingVertical) {
            // Walk vertically down grid where y >= 0
            // Check above start
            // looking for falsey value here not 100% sure that's enough
            if (newStartY > 0 && grid[newStartX][newStartY - 1]) {
              obstruction = true;
            } 
            // check below end
            if (grid[newStartX][newStartY + newWord.length]) {
              obstruction = true;
            }
            // loop checking for direct intersection or letter to the left or right
            for (let newLetter = 0; newLetter < newWord.length; newLetter++) {
              if (
                // above and below are only an issue if there is not a word that properly
                // intersects. So first check for letter above or below if there is no 
                // intersection. Then check for a bad intersection
                ( newStartY + newLetter >= 0 && ((newStartX > 0 && 
                grid[newStartX - 1][newStartY + newLetter]) || // check left
                grid[newStartX + 1][newStartY + newLetter] ) && // check right
                // check for no intersection
                !grid[newStartX][newStartY + newLetter]
              )) {
                obstruction = true;
              }
              // Check for bad intersection
              if (newStartY + newLetter >= 0 && 
                grid[newStartX][newStartY + newLetter] && 
                grid[newStartX][newStartY + newLetter] !== newWord[newLetter]
              ) {
                obstruction = true;
              }
            }
          } else {
            // Walk horizontally across grid where x >= 0
            // Check left of start
            if (newStartX > 0 && grid[newStartX - 1][newStartY]) {
              obstruction = true;
            } 
            // check right of end
            if (grid[newStartX + newWord.length][newStartY]) {
              obstruction = true;
            }
            // loop checking for direct intersection or letter to the left or right
            for (let newLetter = 0; newLetter < newWord.length; newLetter++) {
              if (
                // above and below are only an issue if there is not a word that properly
                // intersects. So first check for letter above or below if there is no 
                // intersection. Then check for a bad intersection
                ( newStartX + newLetter >= 0 && ((newStartY > 0 && 
                grid[newStartX + newLetter][newStartY - 1]) || // check above
                grid[newStartX + newLetter][newStartY + 1] ) && // check below
                // check for no intersection
                !grid[newStartX + newLetter][newStartY]
              )) {
                obstruction = true;
              }
              // Check for bad intersection
              if (newStartX + newLetter >= 0 && grid[newStartX + newLetter][newStartY] && 
                grid[newStartX + newLetter][newStartY] !== newWord[newLetter]
              ) {
                obstruction = true;
              }
            }
          } // end of walk through grid
          if (!obstruction) {
            return {newStartX, newStartY, newOrientation: placingVertical ? 'Vertical' : 'Horizontal'};
          }
        } // end of if old letter and new letter match
      } // end of loop through new letters 
    }
  }
  return null;
}

export default WordAdder;