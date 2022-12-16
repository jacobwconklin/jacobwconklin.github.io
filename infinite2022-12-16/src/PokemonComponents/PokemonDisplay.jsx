// Akin to the defintion file, this will show a picture of the Pokemon
// import { useState, useEffect } from "react";
import whosThatPokemon from '../resources/whosthatpokemon.png';

const PokemonDisplay = (props) => {
    // props.pokemonPic has the new URL

    /*
    const [img, setImg] = useState();
    useEffect(() => {
        if (isNaN(props.pokemonID)) return;
        fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonID}.png`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setImg(); // TODO extract image url 
        });
        
    }, [props.pokemonID]);
    */

    return  (
        <div className='PokemonImgWrapper' style={{
            minHeight:'150px',
            alignItems:'center'
        }}>
                <img
                    src={props.pokemonPic? props.pokemonPic : whosThatPokemon}
                    alt='The pokemon'
                    height={props.pokemonPic? '200px' : '150px'}
                    width='auto'
                />
        </div>
    )
}

export default PokemonDisplay;