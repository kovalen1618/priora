import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

import './CountdownTimer.css'

export default forwardRef(function CountdownTimer({ startingMinutes, onTimerComplete }, ref ) {
    // Creating initial state with 60 seconds to work from
    const [time, setTime] = useState(startingMinutes * 60);
    const [digits, setDigits] = useState({
        hours0: 0,
        hours1: 0,
        minutes0: 0,
        minutes1: 0,
        seconds0: 0,
        seconds1: 0
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
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        },
        pause: () => clearInterval(intervalRef.current),
        reset: () => setTime(startingMinutes * 60)
    }));     

    useEffect(() => {
        if (time) {
            setTime(parseInt(time));
            runTime();
        }
    }, [time])

    const initElements = (type) => {
        const elements = [{}, {}];

        if (!['seconds', 'minutes', 'hours'].includes(type)) return elements;

        // All targets properly selected
        const target = document.querySelector(`.clock-${type}`);

        if (!target) return elements;

        elements[0].digit = target.querySelector('.digit-left');
        elements[0].card = elements[0].digit.querySelector('.card');
        elements[0].cardFaces = elements[0].card.querySelectorAll('.card-face');
        elements[0].cardFaceFront = elements[0].cardFaces[0];
        elements[0].cardFaceBack = elements[0].cardFaces[1];
        
        elements[1].digit = target.querySelector('.digit-right');
        elements[1].card = elements[1].digit.querySelector('.card');
        elements[1].cardFaces = elements[1].card.querySelectorAll('.card-face');
        elements[1].cardFaceFront = elements[1].cardFaces[0];
        elements[1].cardFaceBack = elements[1].cardFaces[1];

        return elements;
    }

    const initializedElements = {
        seconds: initElements('seconds'),
        minutes: initElements('minutes'),
        hours: initElements('hours')
    }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const runTime = () => {

        const now = {
            h: hours,
            m: minutes,
            s: seconds
        };

        // Checks if the numer is a double-digit number. If it is, then it gets split into two single-digit numbers. Otherwise, it gets padded with a 0.
        now.h = now.h < 10 ? `0${now.h}` : `${now.h}`;
        now.m = now.m < 10 ? `0${now.m}` : `${now.m}`;
        now.s = now.s < 10 ? `0${now.s}` : `${now.s}`;

        setDigits({
            hours0: parseInt(now.h[0]),
            hours1: parseInt(now.h[1]),
            minutes0: parseInt(now.m[0]),
            minutes1: parseInt(now.m[1]),
            seconds0: parseInt(now.s[0]),
            seconds1: parseInt(now.s[1])
        });

        for (const timeMagnitude of Object.keys(initializedElements)) {
            for (const i of ['0', '1']) {
                // Current contains the current value of the digit
                const current = parseInt(digits[`${timeMagnitude}${i}`]);
                let next = current - 1;

                if (timeMagnitude === 'minutes' || timeMagnitude === 'seconds') {
                    if (i === '0') next = next <= 5 ? next : 0;
                    if (i === '1') next = next <= 9 ? next : 0;
                }
                
                
                const element = initializedElements[timeMagnitude][i];
                
                if (element && element.digit) {
                    if (!element.digit.dataset.digitBefore) {
                        element.digit.dataset.digitBefore = current;
                        element.cardFaceFront.textContent = element.digit.dataset.digitBefore;
                        element.digit.dataset.digitAfter = next;
                        element.cardFaceBack.textContent = element.digit.dataset.digitAfter;
                    } else if (element.digit.dataset.digitBefore !== current) {

                        console.log(element.digit.dataset.digitBefore)
                        element.card.addEventListener('transitionend', () => {
                            element.digit.dataset.digitBefore = current;
                            element.cardFaceFront.textContent = element.digit.dataset.digitBefore;
                            // TODO: Figure out why all of the digits are being flipped at once instead of only when the time changes
                            // TODO: Currently, it is flipping all of the digits at once, but it is only changing the text content of the digit that is supposed to change
                            // TODO: The text content of the other digits is not changing
                            // TODO: And also, 'next' is setting all the digitAfters to -1 of current instead of just the one that's supposed to decrease
                            const cardClone = element.card.cloneNode(true);
                            cardClone.classList.remove('flipped');
                            element.digit.replaceChild(cardClone, element.card);
                            element.card = cardClone;
                            element.cardFaces = element.card.querySelectorAll('.card-face');
                            element.cardFaceFront = element.cardFaces[0];
                            element.cardFaceBack = element.cardFaces[1];

                            element.digit.dataset.digitAfter = next;
                            element.cardFaceBack.textContent = element.digit.dataset.digitAfter;
                        }, { once: true });

                        if (!element.card.classList.contains('flipped')) {
                            element.card.classList.add('flipped');
                        }
                    }
                }
            }
        }
    };
  
    // Return component to TaskList.js
    return (
        <div className='clock-wrapper'>
            <div className='clock-hours'>
                <div className='digit digit-left'>
                    <div className='card'>
                        <div className='card-face card-face-front'></div>
                        <div className='card-face card-face-back'></div>
                    </div>
                </div>
                <div className='digit digit-right'>
                    <div className='card'>
                        <div className='card-face card-face-front'></div>
                        <div className='card-face card-face-back'></div>
                    </div>
                </div>
            </div>
            <div className='colon'>:</div>
            <div className='clock-minutes'>
                <div className='digit digit-left'>
                    <div className='card'>
                        <div className='card-face card-face-front'></div>
                        <div className='card-face card-face-back'></div>
                    </div>
                </div>
                <div className='digit digit-right'>
                    <div className='card'>
                        <div className='card-face card-face-front'></div>
                        <div className='card-face card-face-back'></div>
                    </div>
                </div>
            </div>
            <div className='colon'>:</div>
            <div className='clock-seconds'>
                <div className='digit digit-left'>
                    <div className='card'>
                        <div className='card-face card-face-front'></div>
                        <div className='card-face card-face-back'></div>
                    </div>
                </div>
                <div className='digit digit-right'>
                    <div className='card'>
                        <div className='card-face card-face-front'></div>
                        <div className='card-face card-face-back'></div>
                    </div>
                </div>
            </div>
        </div>
    )
})


