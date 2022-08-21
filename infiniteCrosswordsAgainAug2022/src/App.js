import './App.css';
// import SingleWord from './components/SingleWord';
import AllWords from './components/AllWords';
import AllBackgroundObjects from './components/AllBackgroundObjects';
import FixedHeader from './components/FixedHeader';

// The classic infinite wordCross game
function App() {
  return (
    <div className="App">
      <AllBackgroundObjects />
      <AllWords />
      <FixedHeader />
      <header className="App-header">
        <p>
          Welcome to infinite crossroaaaads!
        </p>
      </header>
    </div>
  );
}

export default App;
