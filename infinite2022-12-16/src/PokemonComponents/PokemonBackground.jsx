// import skyAndMountain from '../resources/skyMountainBackground.jpg'
import PokemonBackgroundRow from './PokemonBackgroundRow';
import  { connect } from 'react-redux';
// Holds all background objects rendering them behind the crossword puzzle

const PokemonBackground = (props) => {
    // props.theme changes which theme is displayed
    let amountOfColumns = 0;
    let imgHeight = 0;
    // Check theme
    if (props.theme === 0) { 
        // pokeball tessallation is 750 x 750 {currently the only one}
        imgHeight = 750;
        amountOfColumns = Math.floor((props.furthestY * 35) / imgHeight) + 3;
    } else {
        // Also do pokeball that's all I got so far
    }
    // create an array of the length needed so it can be mapped
    let amountArray = [amountOfColumns]; 
    for (let i = 0; i < amountOfColumns; i++) {
        amountArray[i] = i;
    }

    return (
        <div>
            { amountArray.map(y => (
                <PokemonBackgroundRow
                    top={((imgHeight * y) + 150)} 
                    key={y}
                />
            )) }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    console.log('state.grid[0] is :', state.grid[0]);
    return { furthestY:state.grid[0].furthestY, theme:state.flags[0].theme }; 
  }

export default connect(mapStateToProps)(PokemonBackground);