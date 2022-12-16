import AllWords from '../components/AllWords';
import AllBackgroundObjects from '../components/AllBackgroundObjects';
import FixedHeader from '../components/FixedHeader';

// The classic infinite wordCross game
function InfiniteCrosswordApp() {
  return (
    <div className="InfiniteCrosswordApp" style={{textAlign:'center'}}>
      <AllBackgroundObjects />
      <AllWords />
      <FixedHeader />
    </div>
  );
}

export default InfiniteCrosswordApp;