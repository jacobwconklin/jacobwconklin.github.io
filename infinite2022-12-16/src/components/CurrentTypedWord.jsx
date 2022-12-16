

// Display the word the user is typing in a highly visible font / color

/**
 * MUST be given props: currentWord and currentGuess.
 * currentWord is the word object in the redux store that is being guessed,
 * this object is needed for its length and coordinates. The currentGuess
 * prop will give the letters to be drawn. 
 */
const CurrentTypedWord = (props) => {
    // Find current word to know the x and y to display letters at
    // const [newWord] = props.words.filter(word => !(word.showLetters));

    const orientation = props.currentWord? props.currentWord.orientation : 'Vertical';
    const x = props.currentWord? props.currentWord.x * 35 : 0;

    const y = props.currentWord ? (orientation === 'Vertical' ?
        (props.currentWord.y * 35) + 250 : (props.currentWord.y * 35) + 271) : 0;
    let lettersInCurrWord = props.currentWord ? props.currentWord.word.length : 0;
    // Don't let length of currentGuess exceed length of currentWord
    const currentGuessSized = props.currentGuess.length > lettersInCurrWord ? 
        props.currentGuess.substring(0, lettersInCurrWord) : props.currentGuess;
    
    return (
        <div>
            {/* Determine valid words are given then determine if horizontal or vertical */}
            { props.currentWord && props.currentGuess && 
            <div className={orientation} id={'NewWord'} style={{
                position: 'absolute', 
                top: y + 'px', 
                left: x + 'px'
            }}>
                <br />
                {
                    currentGuessSized.split('').map(letter => ( 
                        <span 
                            key={Math.random().toString()} 
                            className="Letter"
                            style={{
                                fontSize:'large',
                                fontWeight:'bold',
                                color:'Green',
                                backgroundColor:'transparent',
                                width:'31px',
                                height:'31px',
                                margin:'2px'
                            }}
                        >
                            {letter}
                        </span>
                    ))
                }
            </div> }
        </div>
    );
}

export default CurrentTypedWord;

// Below would be if CurrentTypedWord consulted the redux store itself to find the current
// word instead of requiring it.
// const mapStateToProps = (state, props) => {
//     // Get all words from redux store. 
//     return { words:state.words }; 
//   }
  
//   export default connect(mapStateToProps)(AllWords);