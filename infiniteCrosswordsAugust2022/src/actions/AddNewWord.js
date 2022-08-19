// Sends signal to 
// ADD_WORD
export const addWord = (word, x, y, orientation) => ({
    type: 'ADD_WORD',
    word,
    x,
    y,
    orientation
  });