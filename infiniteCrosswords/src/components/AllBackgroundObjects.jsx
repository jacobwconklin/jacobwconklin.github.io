// import skyAndMountain from '../resources/skyMountainBackground.jpg'
import BackgroundRow from './BackgroundRow';
import  { connect } from 'react-redux';
// Holds all background objects rendering them behind the crossword puzzle

const AllBackgroundObjects = (props) => {
    // props.theme changes which theme is displayed
    let amountOfColumns = 0;
    let imgHeight = 0;
    // Check theme
    if (props.theme === 0) { 
        // Lizard tessallation is 1279 x 1280
        imgHeight = 1278;
        amountOfColumns = Math.floor((props.furthestY * 35) / imgHeight) + 2;
    } else if (props.theme === 1) {
        // space tessallation is 580 x 386
        imgHeight = 386;
        amountOfColumns = Math.floor((props.furthestY * 35) / 384) + 2;
    } else if (props.theme === 2) {
        // bells tessallation is 700 x 700
        imgHeight = 700
        amountOfColumns = Math.floor((props.furthestY * 35) / 698) + 2;
    }

    console.log(props.furthestY);
    console.log('amount of columns is:',amountOfColumns);
    // create an array of the length needed so it can be mapped
    let amountArray = [amountOfColumns]; 
    for (let i = 0; i < amountOfColumns; i++) {
        amountArray[i] = i;
    }

    return (
        <div>
            { amountArray.map(y => (
                <BackgroundRow
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

export default connect(mapStateToProps)(AllBackgroundObjects);