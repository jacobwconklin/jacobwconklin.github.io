import AllWords from "../components/AllWords";
import TimedBackground from "../TimedCrosswordComponents/TimedBackground";
import GameController from "../TimedCrosswordComponents/GameController";

// Timed version of infinite crossword game, limited hints and visible score
function TimedCrossword() {
    return (
      <div className="TimedApp" style={{
        textAlign:'center'
      }}>
        <TimedBackground />
        <AllWords />
        <GameController />
        {/*<TimedHeader />*/}
      </div>
    );
  }
  
  export default TimedCrossword;