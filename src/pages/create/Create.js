// React
import React, { useRef, useState } from 'react'

// Firebase
import { projectFirestore } from '../../firebase/config';

// Styles
import './Create.css';

function Create({ closeModal }) {
    const [title, setTitle] = useState('');

    const [time, setTime] = useState(0);
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const handleInputFocus = (e) => {
        const inputs = document.querySelectorAll(".time-input input");
        inputs.forEach(input => input.style.borderBottom = '3px solid transparent');

        e.target.style.borderBottom = '3px solid black';
        console.log(e.target.value)
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
                                    placeholder='00'
                                    maxLength={2}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                            const parsedValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
                                            setHours(isNaN(parsedValue) ? '' : parsedValue);
                                        }
                                    }}                                    
                                    value={hours}
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
                                    placeholder='00'
                                    maxLength={2}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                            const parsedValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
                                            setMinutes(isNaN(parsedValue) ? '' : parsedValue);
                                        }
                                    }}                                      
                                    value={minutes}
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
                                    placeholder='00'
                                    maxLength={2}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                            const parsedValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
                                            setSeconds(isNaN(parsedValue) ? '' : parsedValue);
                                        }
                                    }}                                      
                                    value={seconds}
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
                    onClick={(e) => { 
                        const totalTime = ((seconds / 60) + minutes + (hours * 60))
                        if (totalTime === '' || totalTime <= 0) {
                            alert('Please enter a valid time greater than 0');
                            e.preventDefault(); // prevent form submission
                            return;
                        }
                        setTime(totalTime);
                    }}
                >Submit</button>

            </form>
        </div>
    )
}

export default Create