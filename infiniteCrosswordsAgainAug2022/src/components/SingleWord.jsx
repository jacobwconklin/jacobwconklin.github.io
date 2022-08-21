// Takes in the string of the word and if it is horizontal or vertical
// then it builds out the visual crossword 
import React from "react";
import { connect } from "react-redux";

const SingleWord = (props) => {

    //const selectClassName = () => {
    //    return props.orientation ? props.orientation + 'Container' : 'HorizontalContainer';
    //}
    const orientation = props.orientation || 'Vertical';
    const showLetters = props.showLetters || false;
    // Flag to make first letter always be visible
    // Maybe make setting the first and or last letter to be always visible
    // an optional setting maybe triggered with a button.
    let numLettersToReveal = props.flags[0].revealLetters;
    // console.log('in single word num letters to reveal is:', numLettersToReveal);
    // console.log('props in single word are:', props);
    
    const x = props.x * 35;
    const y = orientation === 'Vertical' ? (props.y * 35) + 250 : (props.y * 35) + 271;

    return (
        <div>
            <div className={orientation} id={showLetters ? 'ExistingWord' : 'NewWord'} style={{
                position: 'absolute', 
                top: y + 'px', 
                left: x + 'px'
            }}>
                <br />
                {
                    /* Decided to make each first letter visible, can change if words get 
                        atatched by other letters so that each subsequent word goes behind
                        the previous word instead */
                    props.word ? 
                        props.word.split('').map(letter => ( 
                            <span key={Math.random().toString()} className="Letter">
                                {(numLettersToReveal-- > 0 || showLetters) && letter}
                            </span>
                        )) : 
                        <p> Error no props.word </p>    
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {flags: state.flags}
}

export default connect(mapStateToProps)(SingleWord);