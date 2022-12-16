import TimedBuilder from "./TimedBuilder";


const TimedHeader = () => {

    return (
        <div>
            <div 
                className="FixedHeader" 
                style={{
                    position: 'fixed',
                    top: 30,
                    left: 0,
                    width: window.innerWidth,
                    background: 'cyan',
                    border: '3px solid gold',
                    'borderTopStyle': 'none',
                    'borderLeftStyle': 'none',
                    'borderRightStyle': 'none'
                }}
            >
                <TimedBuilder />
            </div>
        </div>
    )
}


export default TimedHeader;