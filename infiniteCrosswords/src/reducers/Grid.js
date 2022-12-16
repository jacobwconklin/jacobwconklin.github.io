 /* 
 // This will hold a grid version of the crossword puzzle
 // the first and only item will be an array of arrays
 const defaultGrid = Array(100).fill(Array(100).fill(''));
 // console.log('initial grid test:', filledArray); 
 // If I could set this up to grow dynamically that'd be great.

 const wordReducerDefaultState = [defaultGrid];

 // A grid with all words. access by x and then y
*/

// Can also be readily utilized by background if it is being extended / cropped according to the furthestX and
// furthestY
const gridReducerDefaultState = [{furthestX: 8, furthestY: 8, score: 0}];

// this reducer will now only serve to hold the Largest X and Y values
// to know how large to make the new grids. Score may also go well
// here it could be calculated on # of words added, length of those words, and more
 const gridReducer = (state = gridReducerDefaultState, action) => {
    switch(action.type) {
      case 'ADD_WORD':
        // console.log('in grid Reducer, action is:', action);
        if (action.word.orientation === 'Vertical') {
            // check if it's y is > than furthestY, if it is reassign furthestY.
            // also check if its y negative, if it is add to furthestY by the negative amount
            if (action.word.y + action.word.word.length > state[0].furthestY) {
              return [{...state[0], furthestY:(action.word.y + action.word.word.length)}];
            } else if (action.word.y < 0) {
              return [{...state[0], furthestY:( state[0].furthestY + (action.word.y * -1))}];
            }
        } else {
            // Similar checking as vertical words except now check for x values
            if (action.word.x + action.word.word.length > state[0].furthestX) {
              return [{...state[0], furthestX:(action.word.x + action.word.word.length)}];
            } else if (action.word.x < 0) {
              return [{...state[0], furthestX:( state[0].furthestX+ (action.word.x * -1))}];
            }
        }
        // if no new furthest x or y, no change
        return state;
      case 'SHOW_LETTERS':
        // update score here when word is succesfully guessed
        // Somehow increment score with state of the art scoring logic
        return [{...state[0],  score: (state[0].score + action.word.length + 5)}];
      case 'REVEAL_LETTER':
        // take off 3 points for revealing a letter
        return [{...state[0],  score: (state[0].score -3)}];
      case 'CLEAR_WORDS':
        console.log("IN GRID clear word called");
        return gridReducerDefaultState;
      default:
        return state;
    }
  };


  export default gridReducer;