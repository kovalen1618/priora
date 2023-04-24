import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

import './CountdownTimer.css'

export default forwardRef(function CountdownTimer({ startingMinutes, onTimerComplete }, ref ) {
    // Creating initial state with 60 seconds to work from
    const [time, setTime] = useState(startingMinutes * 60);
    const [digits, setDigits] = useState({
        hoursTens: 0,
        hoursOnes: 0,
        minutesTens: 0,
        minutesOnes: 0,
        secondsTens: 0,
        secondsOnes: 0
    });

    const intervalRef = useRef();

    useEffect(() => {
        if (time === 0) {
            clearInterval(intervalRef.current);
            onTimerComplete();
        }
    }, [time]);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (time > 0) {
                intervalRef.current = setInterval(() => {
                    setTime(time => time - 1);
                }, 1000);
            } else {
                setTime(startingMinutes * 60);
                intervalRef.current = setInterval(() => {
                    setTime(time => time - 1);
                }, 1000);
            }
        },
        pause: () => clearInterval(intervalRef.current),
        reset: () => setTime(startingMinutes * 60)
    }));     

    useEffect(() => {
        if (time) {
            setTime(parseInt(time));
        }

        flipCards(time);
    }, [time])

    const flipCards = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        setDigits({
            hoursTens: Math.floor(hours / 10),
            hoursOnes: hours % 10,
            minutesTens: Math.floor(minutes / 10),
            minutesOnes: minutes % 10,
            secondsTens: Math.floor(seconds / 10),
            secondsOnes: seconds % 10
        });

        console.log(seconds)
        console.log(digits.secondsOnes)

        flip(document.querySelector('[data-hours-tens]'), digits.hoursTens);
        flip(document.querySelector('[data-hours-ones]'), digits.hoursOnes);
        flip(document.querySelector('[data-minutes-tens]'), digits.minutesTens);
        flip(document.querySelector('[data-minutes-ones]'), digits.minutesOnes);
        flip(document.querySelector('[data-seconds-tens]'), digits.secondsTens);
        flip(document.querySelector('[data-seconds-ones]'), digits.secondsOnes);
    }


    const flip = (flipCard, newNumber) => {
        const topHalf = flipCard.querySelector('.top');
        const bottomHalf = flipCard.querySelector('.bottom');

        const startNumber = parseInt(topHalf.textContent);
        if (newNumber === startNumber) return;

        const topFlip = document.createElement('div');
        topFlip.classList.add('top-flip');

        const bottomFlip = document.createElement('div');
        bottomFlip.classList.add('bottom-flip');

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
        <div className="container">
        <div className="container-segment">
            <div className="segment-title">Hours</div>
            <div className="segment">
                <div className="flip-card" data-hours-tens>
                    <div className="top">0</div>
                    <div className="bottom">0</div>
                </div>
                <div className="flip-card" data-hours-ones>
                    <div className="top">0</div>
                    <div className="bottom">0</div>
                </div>
            </div>
        </div>
        <div className="container-segment">
            <div className="segment-title">Minutes</div>
            <div className="segment">
                <div className="flip-card" data-minutes-tens>
                    <div className="top">0</div>
                    <div className="bottom">0</div>
                </div>
                <div className="flip-card" data-minutes-ones>
                    <div className="top">0</div>
                    <div className="bottom">0</div>
                </div>
            </div>
        </div>
        <div className="container-segment">
            <div className="segment-title">Seconds</div>
                <div className="segment">
                <div className="flip-card" data-seconds-tens>
                    <div className="top">0</div>
                    <div className="bottom">0</div>
                </div>
                <div className="flip-card" data-seconds-ones>
                    <div className="top">0</div>
                    <div className="bottom">0</div>
                </div>
            </div>
        </div>
        </div>
    )
})