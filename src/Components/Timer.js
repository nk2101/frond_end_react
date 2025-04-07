import React, { useEffect, useState } from "react";

function Timer() {
  const [count, setCouter] = useState(0);

  const initialTime = 60 * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          console.log('Countdown complete!');
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); 

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

//   setInterval(()=>{
//     setCouter(count + 1);
//   },1000)

  const startTimer = () => {
    setCouter(count + 1);
  };
  const pauseTimer = () => {
    setCouter(count);
  };

  const resetTimer = () => {
    setCouter(0);
  };
  return (
    <>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <p>Count : {count}</p>
      <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
    </>
  );
}

export default Timer;
