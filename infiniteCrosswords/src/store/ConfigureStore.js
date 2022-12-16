import { createStore, combineReducers } from 'redux';
import wordReducer from '../reducers/Words';
import flagReducer from '../reducers/Flags';
import gridReducer from '../reducers/Grid';

// This will be needed if I have multiple reducers!

const storeMaker = () => {
    // store creation
    const store = createStore(
    combineReducers({ // combineReduceres takes in an object, showing the value on the left and the reducer to manage
      // it on the right. Takes a root value and decides what reducer it goes to. 
      words: wordReducer,
      flags: flagReducer,
      grid: gridReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}

export default storeMaker;
