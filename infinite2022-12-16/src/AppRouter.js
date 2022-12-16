import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import InfiniteCrosswordApp from './apps/InfiniteCrossword';
import SpeedTypeApp from './apps/SpeedType';
import PokemonApp from './apps/PokemonCrossword';
import TimedApp from './apps/TimedCrossword';
import PageHeader from './components/PageHeader';

// IF I am dividing games by url, and separating them into entirely different applications instead of a
// button like toggle, then it will need to take place here.
const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Routes>
            {/* for high scores <Route path="/leaderboard" element={<Leaderboard />} exact/> */}
            {/* <Route path="/games" element={<GamesShowcase />} exact />
                To be used if I set up a page just to view the different game options
                like a showcase */}
            <Route path="/speed" element={<SpeedTypeApp />} exact />
            <Route path="/pokemon" element={<PokemonApp />} exact />
            <Route path="/quickplay" element={<TimedApp />} exact />
            <Route path="/" element={<InfiniteCrosswordApp />}/>
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