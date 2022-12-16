// Builds the Pokemon crossword puzzle game
import CheckCorrectness from "../components/CheckCorrectness";
import { showLetters } from "../actions/ShowLetters";
import { connect } from "react-redux";
import { addWord } from "../actions/AddWord";
import { useState } from "react";
import PokemonWordAdder from './PokemonWordAdder';
import GuessInput from '../components/guessInput';
import PokemonDisplay from './PokemonDisplay';

const PokemonBuilder = (props) => {

    // Stored in CrosswordBuilder state
    const [pokemonName, setPokemonName] = useState(); // May not need since PokemonDisplay doesn't need
    const [pokemonPic, setPokemonPic] = useState();

    const submitWord = async (userWord) => {
        if (CheckCorrectness(props.prevWord.word, userWord)) {
            // user guess is correct
            props.dispatch(showLetters(userWord));
            // WordAdder actually just supplies a new set up word object
            const newPokemon = await PokemonWordAdder(
                props.prevWords, 
                props.grid[0].furthestX, 
                props.grid[0].furthestY
            );
            await props.dispatch(addWord(newPokemon.pokemonWord));
            await setPokemonName(newPokemon.pokemonWord.word);
            await setPokemonPic(newPokemon.pokemonPic);
            scrollToNewWord();
        } else {
            // Pop a modal with a random pokemon in the background
            alert('wrong you lose');
        }
    }

    const scrollToNewWord = () => {
        document.getElementById("NewWord").scrollIntoView(
            {behavior:"smooth", block:'end', inline:'center'}
        )
    }

    // Choose the first pokemon to get the crossword going
    const startGame = () => {
        // if we are doing pokemons, get their definition from 
        // https://pokeapi.co/api/v2/pokemon/${pokemonName}
        // And / or get a picture from 
        // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIDNumber}.png

        let randomPokemon = 'no';
        let randomPokemonID = 0;
        let pokemonPic = '';
        // Stipulates that pokemon name must be at least 3 characters long
        // and duplicates aren't allowed
        // while (randomPokemon.length <= 3 ) {
            randomPokemonID = Math.floor(Math.random() * 904) + 1;
            fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                randomPokemon = data.name;
                pokemonPic = data.sprites.front_default;
                setPokemonName(randomPokemon);
                setPokemonPic(pokemonPic);
                const x = 8;
                const y = 3;
                const orientation = Math.random() > 0.49 ? 'Vertical' : 'Horizontal';
                const showLetters = false; 
                props.dispatch(addWord({word:randomPokemon, x, y, orientation, showLetters}));
            });
    }

    return (
        <div className="PokemonBuilderWrapper" style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <PokemonDisplay pokemonPic={pokemonPic} pokemonName={pokemonName} />
            <GuessInput submitWord={submitWord} startGame={startGame}/>
            <PokemonDisplay pokemonPic={pokemonPic} pokemonName={pokemonName} />
        </div>
    )
}

const mapStateToProps = (state, props) => {
    // console.log('state in mapStateToProps in AllWords is:', state);
    const prevWords = state.words;
    const prevWord = state.words.length > 0? state.words[state.words.length - 1] : null;
    // console.log('in mapStateToProps trying to get prevWord', prevWords)
    return { prevWords , prevWord, doAddWord:state.flags[0].addWord, grid:state.grid}; 
  }

export default connect(mapStateToProps)(PokemonBuilder);