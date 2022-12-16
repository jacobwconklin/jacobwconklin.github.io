
import CurrentTypedWord from "../components/CurrentTypedWord";
import Definition from "../components/Definition";
import TimedGuessInput from "./TimedGuessInput";
import SpeedTimer from "../SpeedTypeComponents/SpeedTimer";
import { useState } from 'react';
import { Modal } from "@mui/material";

const GameDisplay = (props) => {
    // Display related calculations
    const wrongX = (window.innerWidth / 2 - 300);
    const [formText, setFormText] = useState('');
    // Track total revealed letters in flags redux store [props.totalRevealed here]
    // TIME THAT GAME IS PLAYED FOR in seconds:
    const amountOfTime = 180;

    // Responsible for organizing and showing game UI. 
    return (
        <div>
            <CurrentTypedWord currentWord={props.currentWord} currentGuess={formText? formText : ""} />
            <div className="Header" style={{
                // just make two rows top for timer, buttons, and score
                // bottom for definitions
                display:"flex",
                // justifyContent:'space-evenly',
                justifyContent: 'flex-start',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection:'column',
                position: 'fixed',
                top: 30,
                left: 0,
                width: window.innerWidth,
                background: 'lightblue',
                border: '3px solid gold',
                'borderTopStyle': 'none',
                'borderLeftStyle': 'none',
                'borderRightStyle': 'none'
            }}>
                <div className="TopHalf" style={{
                display:"flex",
                justifyContent:'space-evenly',
                alignContent: 'center',
                alignItems: 'center',
                }}>
                    {/* Here will be the Timer, score, the user input, the buttons  */}
                    <div className="TimerSection" style={{width:'30vw'}}>   
                        {/* Display placeholder until game is started */}   
                        {
                            !props.isStarted ? 
                            <div>
                                <div style={{fontSize:'40px'}}>{amountOfTime} Seconds!</div>
                            </div> :
                            <SpeedTimer start={props.isStarted} amountOfTime={amountOfTime} timeEnded={props.startEndGame}/>
                        }
                    </div>
                    <div className="Interactive" style={{width:'30vw'}}>
                        <TimedGuessInput 
                            currentWord={props.currentWord}
                            isStarted={props.isStarted}
                            startEndGame={props.startEndGame}
                            submitWord={props.submitWord}
                            setFormText={setFormText}
                            // increaseLettersRevealed={increaseLettersRevealed}
                        />
                    </div>
                    <div style={{width:'30vw'}}>
                        <div style={{fontSize:'40px'}}>Score: {props.score}</div>
                        <div> Letters Revealed: {props.totalRevealed}</div>
                        {/* TODO consider Add popups on score changes? */}
                    </div>
                </div>
                <div className="BottomHalf">
                    <Definition word={props.currentWord.word} isStarted={props.isStarted}/>
                </div>
            </div> {/* END OF HEADER DIV */}
            <div className="WrongText">
                {
                    props.wrong && 
                    <h1 style={{
                        color: 'red', 
                        fontSize: '150px', 
                        position: 'fixed', 
                        top: '-80px',
                        left: wrongX
                    }}> 
                    WRONG
                    </h1>
                }
            </div>
            <Modal 
                style={{ 
                    position: 'fixed', 
                    backgroundColor: 'gold', 
                    textAlign:'center', 
                    width: '100vw', 
                    height: '25vw', 
                    opacity:'95%'
                }}
                open={props.open}
                onClose={props.handleClose}
            >
                <div className="WrapperForIncorrectModal" style={{
                }}>
                    <h1> GAME OVER </h1>
                    <h1> SCORE: {props.score}</h1>
                    <h2> YOU SOLVED: {props.solvedWords - 1} WORDS!</h2>
                    <button onClick={props.handleClose} style={{border:'none'}}>CONTINUE</button>
                </div>
            </Modal> 

        </div>
    );
}


export default GameDisplay;