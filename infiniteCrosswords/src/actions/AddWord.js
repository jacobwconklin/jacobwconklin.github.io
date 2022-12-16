// in expensify all actions for the same Redux store were in one file, may
// want to do that here

// ADD_WORD
export const addWord = (word) => ({
    type: 'ADD_WORD',
    word
  });