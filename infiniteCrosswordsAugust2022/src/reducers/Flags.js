 
 // By default the state will just hold one object with each of the desired flags
 const wordReducerDefaultState = [{
    addWord:true, gameLost:false, resetGame: false, score: 0
 }];

 // Holds boolean flags needed across the entire App such as when to add a new word,
 // when the player has lost, or started a new game.          ***************Could also hold score****************
 // Flags Reducer
 const flagReducer = (state = wordReducerDefaultState, action) => {
    switch(action.type) {
      case 'ADD_WORD_FLAG':
        // set 'addWord' in the state to true
        // console.log('inflagReducer seeing if updating addWord in state will work');
        return [{ ...state[0], addWord:true}];
      case 'WORD_ADDED_FLAG':
        return [{ ...state[0], addWord:false}];
      case 'EDIT_EXPENSE':
        return state.map(( expense ) => {
          if (expense.id === action.id) {
            return { // return new object with updates
              ...action.update // This will override any properties with the same name from state
            };
          } else {
            return expense;
          }
        });
      default:
        return state;
    }
  };


  export default flagReducer;