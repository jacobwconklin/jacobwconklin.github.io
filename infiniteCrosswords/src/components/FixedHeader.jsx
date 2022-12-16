// To render and contain the entire header, which will be fixed to the 
// screen to follow the user if they scroll
import CrosswordBuilder from "./CrosswordBuilder"

const FixedHeader = () => {

    return (
        <div 
            className="FixedHeader" 
            style={{
                position: 'fixed',
                top: 30,
                left: 0,
                width: '100vw',
                background: 'silver',
                border: '3px solid gold',
                'borderTopStyle': 'none',
                'borderLeftStyle': 'none',
                'borderRightStyle': 'none'
            }}
        >
            <CrosswordBuilder />
        </div>
    ) 
}


export default FixedHeader