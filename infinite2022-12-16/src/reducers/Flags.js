 
 
 /*
 // By default the state will just hold one object with each of the desired flags
 const flagReducerDefaultState = [{
    addWord:true, gameLost:false, resetGame: false, score: 0
 }];
 // Holds boolean flags needed across the entire App such as when to add a new word,
 // when the player has lost, or started a new game.          ***************Could also hold score****************
 */

 // TODO have an issue where showFirstLetter isn't actually consulted and so it gets reset across apps.
 // need apps to set their default by consulting the store first. 

 // showFirstLetter is ONLY USED here, revealLetters will tell SingleWord what to display
  const flagReducerDefaultState = [{
    showFirstLetter:true, revealLetters:0, hintsAvailable:3, livesLeft:3, theme:2, totalRevealed:0
  }];   
  const numOfThemes = 3;
  // Only as many themes as I have set up will be supported. Themes are:
  // 0 lizard tessellation
  // 1 space black and white
  // 2 repeating bell shapes

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
          return [{ ...state[0], revealLetters: ++state[0].revealLetters, totalRevealed: ++state[0].totalRevealed}];
        case 'CHANGE_THEME':
          return [{ ...state[0], theme:((++state[0].theme) % numOfThemes)}]
        case 'CLEAR_WORDS':
          return [{...state[0], totalRevealed: 0, revealLetters: 0, hintsAvailable:3, livesLeft:3,}];  
        default:
          return state;
      }
    };


    export default flagReducer;