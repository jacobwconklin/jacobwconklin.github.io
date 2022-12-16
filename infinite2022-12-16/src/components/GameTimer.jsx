import React from 'react';
import { useTimer } from 'react-timer-hook';

const GameTimer = (props) => {
  
    // Timer variables
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1000 + props.amountOfTime ? props.amountOfTime : 60);
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ time, autoStart: false, onExpire: () => { pause(); props.timerExpired(); } });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 1000 + props.amountOfTime ? props.amountOfTime : 60);
        restart(time)
      }}>Restart</button>
    </div>
  );
}

export default GameTimer;