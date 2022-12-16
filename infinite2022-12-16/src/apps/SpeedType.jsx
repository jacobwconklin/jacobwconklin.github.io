// import SingleWord from './components/SingleWord';
import AllWords from '../components/AllWords';
// probably want separate background per app
import SpeedHeader from '../SpeedTypeComponents/SpeedHeader';
import AllBackgroundObjects from '../components/AllBackgroundObjects';

// TODO Allwords can be carried over, but AllBackgroundObjects and FixedHeader should be replaced with speed quiz
// specific things. Want to re-use as much as possible so may need some refactoring

// Speed Type Crossword Building Game
function SpeedTypeApp() {
  return (
    <div className="SpeedTypeApp" style={{textAlign:'center'}}>
      <AllBackgroundObjects />
      <AllWords />
      <SpeedHeader />
    </div>
  );
}

export default SpeedTypeApp;