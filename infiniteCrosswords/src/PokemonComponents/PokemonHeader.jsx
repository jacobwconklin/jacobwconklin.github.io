import PokemonBuilder from "./PokemonBuilder";

const PokemonHeader = () => {

    return (
        <div>
            <div 
            className="PokemonHeader" 
            style={{
                position: 'fixed',
                top: 30,
                left: 0,
                width: '100vw',
                background: 'black',
                border: '3px solid gold',
                'borderTopStyle': 'none',
                'borderLeftStyle': 'none',
                'borderRightStyle': 'none'
            }}
        >
            <PokemonBuilder />
        </div>
        </div>
    )
}

export default PokemonHeader;