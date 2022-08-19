import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App';
import PageHeader from './components/PageHeader';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/leaderboard" element={<App />} exact/>
            <Route path="/games" element={<App />} exact />
            <Route path="/" element={<App />}/>
            <Route path = "*" element={
                <div>
                    <br></br>
                    <h2>404 Page not found</h2>
                </div>
            }/>
        </Routes>
        <PageHeader/>
      </div>
      </BrowserRouter>
  );

  // with parameters:    <Route path="/edit/:id" component={EditExpensePage}/>

  export default AppRouter;