import lizardTessallation from '../resources/lizardTessellation.png';
import space from '../resources/spaceTessellation580x386.png';
import bells from '../resources/rgbyTessellation700x700.jpg';
import { connect } from "react-redux";
// Create a row of background objects so that the length 
// exceeds the length needed by the crossword puzzle
const BackgroundRow = (props) => {

    const themesImages = [lizardTessallation, space, bells];
    let amountOfObjectsPerRow = 0;
    let imgWidth = 0;
    // Check theme
    if (props.theme === 0) { 
        // Lizard tessallation is 1279 x 1280
        imgWidth = 1279;
        amountOfObjectsPerRow = Math.floor((props.furthestX * 35) / imgWidth) + 2;
    } else if (props.theme === 1) {
        // space tessallation is 580 x 386
        imgWidth = 578;
        amountOfObjectsPerRow = Math.floor((props.furthestX * 35) / 578) + 3;
    } else if (props.theme === 2) {
        // bells tessallation is 700 x 700
        imgWidth = 700
        amountOfObjectsPerRow = Math.floor((props.furthestX * 35) / 698) + 2;
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

export default connect(mapStateToProps)(BackgroundRow);