import AllWords from "../components/AllWords";
import PokemonBackground from "../PokemonComponents/PokemonBackground";
import PokemonHeader from '../PokemonComponents/PokemonHeader';

// Pokemon version of infinite crossword game
function PokemonApp() {
    return (
      <div className="PokemonApp"style={{textAlign:'center'}}>
        <PokemonBackground />
        <AllWords />
        <PokemonHeader />
      </div>
    );
  }
  
  export default PokemonApp;