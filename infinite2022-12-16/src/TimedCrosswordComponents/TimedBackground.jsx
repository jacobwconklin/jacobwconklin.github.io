

import { connect } from "react-redux";
import sepiaClocks from "../resources/sepiaClocks.jpg";
// import useWindowSize from create this

const TimedBackground = (props) => {


    // TODO set up hook so that window height and width change dynamically on resizing. 
    // IE will look like this const {width, height} = useWindowSize();

    const backgroundX = props.furthestX * 35 + 400 > window.innerWidth ? props.furthestX * 35 + 1000 : window.innerWidth;
    const backgroundY = props.furthestY * 35 + 800 > window.innerHeight ? props.furthestY * 35 + 800 : window.innerHeight;

    // Could have multiple backgroundImages that depend on theme. 
    const theme = [sepiaClocks];


    return (
        <div>
            {/* Attempt tesselation with CSS property rather than manually. Maybe a picture of clocks?
                "background-image will repeat naturally and can be specified to background-repeat only
                on y or x axis or neither. In reality with this solution can just add background image
                css to app and don't need this whole component. Will attempt that. Returning here as I 
                need to know furthest x and y apparently " */}
            <div style={{
                textAlign:'center', 
                backgroundImage: `url(${theme[0]})`,
                backgroundRepeat: 'repeat',
                width: backgroundX,
                height: backgroundY
            }}></div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return { furthestX:state.grid[0].furthestX, furthestY:state.grid[0].furthestY, theme:state.flags[0].theme }; 
  }

export default connect(mapStateToProps)(TimedBackground);