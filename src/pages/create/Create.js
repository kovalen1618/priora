// React
import React, { useRef, useState } from 'react'

// Firebase
import { projectFirestore } from '../../firebase/config';

// Styles
import './Create.css';

function Create({ closeModal }) {
    const [title, setTitle] = useState('');

    const [time, setTime] = useState(0);
    const [hoursOne, setHoursOne] = useState(0);
    const [hoursTwo, setHoursTwo] = useState(0);
    const [minutesOne, setMinutesOne] = useState(0);
    const [minutesTwo, setMinutesTwo] = useState(0);
    const [secondsOne, setSecondsOne] = useState(0);
    const [secondsTwo, setSecondsTwo] = useState(0);

    const handleInputFocus = (e) => {
        const inputs = document.querySelectorAll(".time-input input");
        inputs.forEach(input => input.style.borderBottom = '3px solid transparent');

        e.target.style.borderBottom = '3px solid black';
    }
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const doc = { title, time };

        try {
            await projectFirestore.collection('tasks').add(doc);
            closeModal();
        } catch(error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className='create'>
            <h2 className='create-header'>Add a New Task</h2>

            <form onSubmit={handleSubmit} className='create-task-form'>

                <label>
                    <span id='title-label'>Title: </span>
                    <input 
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label className='clock'>
                    <div id='time-label'>Time</div>
                    <div id='time-inputs'>
                        <div className='time'>
                            <div className='time-input'>
                                <input 
                                    type='text'
                                    placeholder='0'
                                    onChange={(e) => setHoursOne(e.target.value)}
                                    value={hoursOne > 0 && hoursOne <= 9 ? hoursOne : ''}
                                    onFocus={handleInputFocus}
                                />
                                <input 
                                    type='text'
                                    placeholder='0'
                                    onChange={(e) => setHoursTwo(e.target.value)}
                                    value={hoursTwo > 0 && hoursTwo <= 9 ? hoursTwo : ''}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                            <span className='time-input-label'>Hours</span>
                        </div>
                        <span className='time-colon'>:</span>
                        <div className='time'>
                            <div className='time-input'>
                                <input 
                                    type='text'
                                    placeholder='0'
                                    onChange={(e) => setMinutesOne(e.target.value)}
                                    value={minutesOne > 0 && minutesOne <= 9 ? minutesOne : ''}
                                    onFocus={handleInputFocus}
                                />
                                <input 
                                    type='text'
                                    placeholder='0'
                                    onChange={(e) => setMinutesTwo(e.target.value)}
                                    value={minutesTwo > 0 && minutesTwo <= 9 ? minutesTwo : ''}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                            <span className='time-input-label'>Minutes</span>
                        </div>
                        <span className='time-colon'>:</span>
                        <div className='time'>
                            <div className='time-input'>
                                <input 
                                    type='text'
                                    placeholder='0'
                                    onChange={(e) => setSecondsOne(e.target.value)}
                                    value={secondsOne > 0 && secondsOne <= 9 ? secondsOne : ''}
                                    onFocus={handleInputFocus}
                                />
                                <input 
                                    type='text'
                                    placeholder='0'
                                    onChange={(e) => setSecondsTwo(e.target.value)}
                                    value={secondsTwo > 0 && secondsTwo <= 9 ? secondsTwo : ''}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                            <span className='time-input-label'>Seconds</span>
                        </div>
                    </div>
                </label>
                

                <button 
                    disabled={isSubmitting} 
                    className='submit-form-button' 
                    onClick={() => { 
                        setTime((parseInt(hoursOne + hoursTwo) * 60) + parseInt(minutesOne + minutesTwo) + (parseFloat(secondsOne + secondsTwo) / 60))
                        console.log({
                            hoursOne,
                            hoursTwo,
                            minutesOne,
                            minutesTwo,
                            secondsOne,
                            secondsTwo
                        })
                    }}
                >Submit</button>

            </form>
        </div>
    )
}

export default Create