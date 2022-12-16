import pokeball from '../resources/pokeBall750x750.jpg';
import { connect } from "react-redux";
// Create a row of background objects so that the length 
// exceeds the length needed by the crossword puzzle
const PokemonBackgroundRow = (props) => {

    const themesImages = [pokeball, pokeball, pokeball];
    let amountOfObjectsPerRow = 0;
    let imgWidth = 0;
    // Check theme { but for now only have pokeball }
    if (props.theme === 0) { 
        // pokeball tessallation is 750 x 750
        imgWidth = 750;
        amountOfObjectsPerRow = Math.floor((props.furthestX * 35) / imgWidth) + 2;
    } else {
        imgWidth = 750
        amountOfObjectsPerRow = Math.floor((props.furthestX * 35) / imgWidth) + 2;
    }
    
    // create an array of the length needed so it can be mapped
    let amountArray = [amountOfObjectsPerRow]; 
    for (let i = 0; i < amountOfObjectsPerRow; i++) {
        amountArray[i] = i;
    }

    return (
        <div>
            { amountArray.map(x => (
                <img 
                    key={x}
                    alt='repeating tessallation of lizards' 
                    src={themesImages[props.theme]}
                    className='BackgroundObject'
                    style={{
                        position: 'absolute',
                        left: (x * imgWidth),
                        top: props.top
                    }}
                />
            )) }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return { furthestX:state.grid[0].furthestX, theme:state.flags[0].theme }; 
  }

export default connect(mapStateToProps)(PokemonBackgroundRow);