import SpeedTypeBuilder from "./SpeedTypeBuilder";

const SpeedHeader = () => {

    return (
        <div>
            <div 
            className="SpeedHeader" 
            style={{
                position: 'fixed',
                top: 30,
                left: 0,
                width: '100vw',
                background: 'maroon',
                border: '3px solid gold',
                'borderTopStyle': 'none',
                'borderLeftStyle': 'none',
                'borderRightStyle': 'none'
            }}
        >
            <SpeedTypeBuilder />
        </div>
        </div>
    )
}

export default SpeedHeader;