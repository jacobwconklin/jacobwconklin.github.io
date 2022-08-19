// Contains all single words
 import React from "react"
 import SingleWord from "./SingleWord"
 import { connect } from "react-redux";
 // Handle scrolling user down to newest word

const AllWords = (props) => {
    // Maybe pull all words from somewhere like redux store or context, so whenever they are updated
    // they update here, but there they can each have their specific position assigned by wordadder

    // get all words from redux store
    // may be more efficient to just go through props.words once and concatenate each word to a new
    // array
    const [newWord] = props.words.filter(word => !(word.showLetters));
    console.log('props.words in AllWords is now:', props.words);
    console.log('in allwords newWord is:', newWord);

    return (
        <div className='AllWordsContainer'>
            {
                newWord && 
                <SingleWord 
                word={newWord.word}
                key={newWord.word} 
                orientation={newWord.orientation}
                x={newWord.x}
                y={newWord.y}
                showLetters={newWord.showLetters}
                />
            }
            {
                /* For each word pulled from the Redux Store create a new SingleWord to be rendered */
                props.words.map(word => (
                    // Check each object in words to see that they are word objects and not flags
                    word.word && word.showLetters && 
                    <SingleWord 
                        word={word.word}
                        key={word.word} 
                        orientation={word.orientation}
                        x={word.x}
                        y={word.y}
                        showLetters={word.showLetters}
                    />
                ))
            }
        </div>
    )

}

const mapStateToProps = (state, props) => {
    // ('state in mapStateToProps in AllWords is:', state);
    return { words:state.words }; 
  }
  
  export default connect(mapStateToProps)(AllWords);

// export default AllWords;


/* example if three hardcoded singlewords are wanted: but need to change position to just x and y not an encasing object

//temporary example
    // maybe position could just be another prop idk
    // keys can just be the word since I can also make sure there aren't repeats during. 
    // more likely list will just be of objects, {word, orientation, and position} and here I will
    // have to create the SingleWord objects by mapping the list so in the render!!!
    const firstWord = <SingleWord 
        word='firstWord' 
        key={'1'} 
        orientation='Vertical'
        position={{x: 0, y: 200}}
        showLetters={true}
    />
    const secondWord = <SingleWord 
        word='secondWord' 
        key={'2'} 
        orientation='Horizontal' 
        position={{x: 0, y: 326}}
    />
    // magic number 21 that horizontals have to be lowered by
    const thirdWord = <SingleWord 
        word='thirdWord' 
        key={'3'} 
        orientation='Vertical'
        position={{x: 280, y: 200}}
    />

    const allWords = [firstWord, secondWord, thirdWord];
    
*/