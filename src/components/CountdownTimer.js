import React, { useEffect, useState } from 'react'

function CountdownTimer({ startingTime}) {
    const [time, setTime] = useState(startingTime * 60);

    // useEffect is used here to run the timer function when the component mounts
    // then it removes the timer function once it is no longer needed
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000);

        return () => clearInterval(timer);
    })

    const hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const countdown = time >= 0 ? `${hours}:${minutes}:${seconds}` : 'Expired';

    return (
        <div>{countdown}</div>
    )
}

export default CountdownTimer