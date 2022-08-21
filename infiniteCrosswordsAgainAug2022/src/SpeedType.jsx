// import SingleWord from './components/SingleWord';
import AllWords from './components/AllWords';
import AllBackgroundObjects from './components/AllBackgroundObjects';
// import FixedHeader from './components/FixedHeader';
// want different version of fixedheader for speed game

// The classic infinite wordCross game
function App() {
  return (
    <div className="App">
      <AllBackgroundObjects />
      <AllWords />
      <header className="App-header">
        <p>
          Welcome to infinite crossroaaaads!
        </p>
      </header>
    </div>
  );
}

export default App;