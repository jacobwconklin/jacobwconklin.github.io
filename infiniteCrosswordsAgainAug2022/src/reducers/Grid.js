 /* 
 // This will hold a grid version of the crossword puzzle
 // the first and only item will be an array of arrays
 const defaultGrid = Array(100).fill(Array(100).fill(''));
 // console.log('initial grid test:', filledArray); 
 // If I could set this up to grow dynamically that'd be great.

 const wordReducerDefaultState = [defaultGrid];

 // A grid with all words. access by x and then y
*/

const gridReducerDefaultState = [{furthestX: 20, furtherstY: 20, score: 0}];

// this reducer will now only serve to hold the Largest X and Y values
// to know how large to make the new grids. Score may also go well
// here it could be calculated on # of words added, length of those words, and more
 const gridReducer = (state = gridReducerDefaultState, action) => {
    switch(action.type) {
      case 'ADD_WORD':
        if (action.word.orientation === 'Vertical') {
            // access x and then y in that order
        } else {

        }
        return state[0].concat(action.word) // not done... 
        // go through each letter in action.word.word starting at index of action.x and action.y
        // could just set up the grid to be huge to be easy, but I would rather it grow dynamically
        // not 100% how I wanna 
      case 'CLEAR_WORDS':
        return [defaultGrid]
      default:
        return state;
    }
  };


  export default flagReducer;