// Display what the user is typing out on the crossword puzzle.
// need to know the current invisible word's location and length
import { connect } from "react-redux"

// get what the user is typing passed in. 
const WordBeingTyped = (props) => {
    // props.text is what the user has typed
    // similar look to <SingleWord/>, maybe different color text / size text / opacity / etc. 
    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {flags: state.flags}
}

export default connect(mapStateToProps)(WordBeingTyped);