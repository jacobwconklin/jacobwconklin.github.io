import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';


const SpeedTimer = (props) => {

    // Might need to fix speed timer to screen in absolute position
    const expiryTimestamp = new Date();
    // may be given amount of time if not default to 1 minute
    const amountOfTime = props.amountOfTime ? props.amountOfTime : 60;
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + amountOfTime); // set timer for amountOfTime or 60 seconds
    
    // when start signal is received restart(time)
    
    useEffect(() => {
        if (props.start) {
            restart(expiryTimestamp);
        } else {
          pause();
        }
    }, [props.start]); 

    // Timer from: https://www.npmjs.com/package/react-timer-hook
    const {
        seconds,
        minutes,
        restart,
        pause
      } = useTimer({ expiryTimestamp, onExpire: () => {
        console.warn('onExpire called');
        props.timeEnded();
      }});
    
      return (
        <div style={{textAlign: 'center', paddingLeft:'60px'}}>
        { props.start && 
        <div>
          <div style={{fontSize: '80px'}}>
            <span>{minutes > 9 ? minutes : '0' + minutes}</span>
            :
            <span>{seconds > 9 ? seconds : '0' + seconds}</span>
          </div>
        </div>
        }
        </div>
      )
}

export default SpeedTimer;