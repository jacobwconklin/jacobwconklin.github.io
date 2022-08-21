import skyAndMountain from '../resources/skyMountainBackground.jpg'
// Holds all background objects rendering them behind the crossword puzzle

const AllBackgroundObjects = () => {

    const allBackgroundObjects = [
    <div key='plz'>
        <img 
            alt='sky and mountain background' 
            src={skyAndMountain}
            className='BackgroundObject'
            style={{
                width: 2000,
                height: 3000, 
                objectFit: 'none',
                objectPosition: '0 0',
                position: 'absolute',
                top: 150,
                left: 0,
            }}
        />
    </div>
    ]
    /* Temporary example for testing
    [<div key='ayy' style={{
        width: 30, 
        height: 60, 
        backgroundColor: 'blue',
        position: 'absolute',
        top: 300,
        left: 150
    }}>HI</div>,
    <div key='bee' style={{
        width: 30, 
        height: 200, 
        backgroundColor: 'blue',
        position: 'absolute',
        top: -100,
        left: 300,
        zIndex: -1
    }}>HI</div>
    ] */

    return (
        <div>
            {allBackgroundObjects}
        </div>
    )
}

export default AllBackgroundObjects;