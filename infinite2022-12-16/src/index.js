import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import storeMaker from './store/configureStore';
import { Provider } from 'react-redux';
import storeMaker from './store/ConfigureStore';
import AppRouter from './AppRouter';

const store = storeMaker();
  // createStore(wordReducer, [{word: 'redux', x: 200, y: 300, orientation: 'Vertical'}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Provider store={store} >
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// This could even be used for studying if you can upload your own set of words to be randomly pulled from
// it is not set up well now to get to all the words but could be better about squeezing words in and having
// score by letters instead of by distance reached. 