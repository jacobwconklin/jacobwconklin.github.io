  // can create a variable for the defualt state to avoid a ton of code in the arguments list of the function
  const wordReducerDefaultState = [];
  /*
  {
    word:'firstWord',
    orientation:'Horizontal',
    x:8, 
    y:2,
    showLetters:true
  }
  */

  // Words Reducer
  const wordReducer = (state = wordReducerDefaultState, action) => {
    switch(action.type) {
      case 'ADD_WORD':
        // spread existing words and add new word to end of array
        // check if a word has gone negative, either left or up, and if
        // it has push everthing over / down
        if (action.word.x < 0) {
          let adjustedWord = action.word;
          const adjustAmount = action.word.x * -1;
          adjustedWord.x += adjustAmount;
          return state.map(word => ({...word, x:word.x + adjustAmount })).concat([adjustedWord]);
        }
        if (action.word.y < 0) {
          let adjustedWord = action.word;
          const adjustAmount = action.word.y * -1;
          adjustedWord.y += adjustAmount;
          return state.map(word => ({...word, y:word.y + adjustAmount })).concat([adjustedWord]);
        }
        return [...state, action.word];
      case 'CLEAR_WORDS':
        return [];
      case 'SHOW_LETTERS':
        // console.log('in word reducer in showletters action is:', action);
        return state.map(wordObject => {
          if (wordObject.word.toLowerCase() === action.word.toLowerCase()) {
            return { ...wordObject, showLetters:true }
          } else {
            return wordObject;
          }
        });
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


  export default wordReducer;