import React, { useState, useEffect, useMemo, useRef, useImperativeHandle, forwardRef } from 'react'

import './CountdownTimer.css'

export default forwardRef(function CountdownTimer({ taskId, startingMinutes, onTimerComplete }, ref ) {
    // Creating initial state with 60 seconds to work from
    const initialTime = parseInt(localStorage.getItem(`time_${taskId}`)) || startingMinutes * 60
    const [time, setTime] = useState(initialTime);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const intervalRef = useRef();

    useEffect(() => {
        localStorage.setItem(`time_${taskId}`, time);
    }, [taskId, time]);

    useEffect(() => {
        if (time === 0) {
            clearInterval(intervalRef.current);
            onTimerComplete();
        }
    }, [time]);

    useImperativeHandle(ref, () => ({
        play: () => {
            clearInterval(intervalRef.current);
            setTime(time - 1)
            if (time > 0) {
                intervalRef.current = setInterval(() => {
                    setTime(time => time - 1);
                }, 1000);
                setIsPlaying(true);
            } else {
                setTime(startingMinutes * 60);
                intervalRef.current = setInterval(() => {
                    setTime(time => time - 1);
                }, 1000);
                setIsPlaying(true);
            }
        },
        pause: () => {
            clearInterval(intervalRef.current)
            setIsPlaying(false);
        },
        reset: () => {
            setTime(startingMinutes * 60)
            setIsReset(true);
            setIsPlaying(false);
        }
    })); 

    // useEffect(() => {
    //     if (time) {
    //         setTime(parseInt(time));
    //     }
    // }, [time])

    const digits = useMemo(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return {
            hoursTens: Math.floor(hours / 10),
            hoursOnes: hours % 10,
            minutesTens: Math.floor(minutes / 10),
            minutesOnes: minutes % 10,
            secondsTens: Math.floor(seconds / 10),
            secondsOnes: seconds % 10
        };
    }, [time]);

    useEffect(() => {
        if (isPlaying || isReset) {
            const flipCardContainer = document.querySelector(`.container-${taskId}`);
            flip(flipCardContainer.querySelector('[data-hours-tens]'), digits.hoursTens);
            flip(flipCardContainer.querySelector('[data-hours-ones]'), digits.hoursOnes);
            flip(flipCardContainer.querySelector('[data-minutes-tens]'), digits.minutesTens);
            flip(flipCardContainer.querySelector('[data-minutes-ones]'), digits.minutesOnes);
            flip(flipCardContainer.querySelector('[data-seconds-tens]'), digits.secondsTens);
            flip(flipCardContainer.querySelector('[data-seconds-ones]'), digits.secondsOnes);
        }
    }, [digits, isPlaying, isReset]);


    const flip = (flipCard, newNumber) => {
        const topHalf = flipCard.querySelector('.top');
        const bottomHalf = flipCard.querySelector('.bottom');

        const startNumber = parseInt(topHalf.textContent);
        if (newNumber === startNumber) return;

        const topFlip = document.createElement('div');
        topFlip.classList.add('top-flip');
        
        const bottomFlip = document.createElement('div');
        bottomFlip.classList.add('bottom-flip');

        topFlip.style = 'color: #DA6A00;'
        bottomFlip.style = 'color: #DA6A00;'

        topHalf.textContent = startNumber;
        bottomHalf.textContent = startNumber;
        topFlip.textContent = startNumber;
        bottomFlip.textContent = newNumber;

        topFlip.addEventListener('animationstart', (e) => {
            topHalf.textContent = newNumber;
        });

        topFlip.addEventListener('animationend', (e) => {
            topFlip.remove();
        });

        bottomFlip.addEventListener('animationstart', (e) => {
            bottomHalf.textContent = newNumber;
            bottomFlip.remove();
        });

        flipCard.append(topFlip, bottomFlip);
    }
  
    // Return component to TaskList.js
    return (
        <div className={`container-${taskId}`} style={{ display: 'flex', gap: '.5em', justifyContent: 'center'}} >
            <div className="container-segment">
                <div className="segment">
                    <div className="flip-card" data-hours-tens>
                        <div className="top" id={`${digits.hoursTens > 0 ? 'active' : '' }`}>{Math.floor(initialTime / 36000)}</div>
                        <div className="bottom" id={`${digits.hoursTens > 0 ? 'active' : '' }`}>{Math.floor(initialTime / 36000)}</div>
                    </div>
                    <div className="flip-card" data-hours-ones>
                        <div className="top" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 36000) / 3600)}</div>
                        <div className="bottom" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 36000) / 3600)}</div>
                    </div>
                </div>
                <div className="segment-title">Hours</div>
            </div>
            <div className="container-segment">
                <div className="segment">
                    <div className="flip-card" data-minutes-tens>
                        <div className="top" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 3600) / 600)}</div>
                        <div className="bottom" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 3600) / 600)}</div>
                    </div>
                    <div className="flip-card" data-minutes-ones>
                        <div className="top" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 || digits.minutesOnes > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 600) / 60)}</div>
                        <div className="bottom" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 || digits.minutesOnes > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 600) / 60)}</div>
                    </div>
                </div>
                <div className="segment-title">Minutes</div>
            </div>
            <div className="container-segment">
                    <div className="segment">
                    <div className="flip-card" data-seconds-tens>
                        <div className="top" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 || digits.minutesOnes > 0 || digits.secondsTens > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 60) / 10)}</div>
                        <div className="bottom" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 || digits.minutesOnes > 0 || digits.secondsTens > 0 ? 'active' : '' }`}>{Math.floor((initialTime % 60) / 10)}</div>
                    </div>
                    <div className="flip-card" data-seconds-ones>
                        <div className="top" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 || digits.minutesOnes > 0 || digits.secondsTens > 0 || digits.secondsOnes > 0 ? 'active' : '' }`}>{Math.floor(initialTime % 10)}</div>
                        <div className="bottom" id={`${digits.hoursTens > 0 || digits.hoursOnes > 0 || digits.minutesTens > 0 || digits.minutesOnes > 0 || digits.secondsTens > 0 || digits.secondsOnes > 0 ? 'active' : '' }`}>{Math.floor(initialTime % 10)}</div>
                    </div>
                </div>
                <div className="segment-title">Seconds</div>
            </div>
        </div>
    )
})