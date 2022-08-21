 
 
 /*
 // By default the state will just hold one object with each of the desired flags
 const flagReducerDefaultState = [{
    addWord:true, gameLost:false, resetGame: false, score: 0
 }];
 // Holds boolean flags needed across the entire App such as when to add a new word,
 // when the player has lost, or started a new game.          ***************Could also hold score****************
 */

 // showFirstLetter is ONLY USED here, revealLetters will tell SingleWord what to display
  const flagReducerDefaultState = [{
    showFirstLetter:false, revealLetters:0, hintsAvailable:3, livesLeft:3, gameOver:false
  }];   

  // Flags and global values for the Crossword game
  // may also hold lives and number of available hints and game over flag
  // Flags Reducer
  const flagReducer = (state = flagReducerDefaultState, action) => {
      switch(action.type) {
        case 'ADD_WORD':
          // reset revealLetters once a word is added
          return [{ ...state[0], revealLetters: state[0].showFirstLetter? 1 : 0}];
        case 'SHOW_FIRST_LETTER':
          // Just flip the showFirstLetter boolean
          // and change reveal Letters accordingly
          let newRevealLetters = state[0].revealLetters;
          if (state[0].showFirstLetter) {
            // showFirstLetter is being turned off:
            if (state[0].revealLetters === 1)
              newRevealLetters = 0;
          } else {
            // showFirstLetter is being turned on:
            if (state[0].revealLetters === 0)
              newRevealLetters = 1;
          }
          return [{ ...state[0], showFirstLetter: !state[0].showFirstLetter, revealLetters: newRevealLetters}];
        case 'REVEAL_LETTER':
          // Add one more to reveal Letters:
          return [{ ...state[0], revealLetters: ++state[0].revealLetters}];
        case '':
        default:
          return state;
      }
    };


    export default flagReducer;