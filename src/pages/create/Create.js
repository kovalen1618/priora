// React
import React, { useState } from 'react'

// Firebase
import { projectFirestore } from '../../firebase/config';

// Styles
import './Create.css';

function Create({ closeModal }) {
    const [name, setName] = useState('');

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

        const doc = { name, time };

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
            <form onSubmit={handleSubmit} className='create-task-form'>

                <label className='name'>
                    <input 
                        type='text'
                        placeholder='Task Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </label>

                <label className='clock'>
                    <div id='time-inputs'>
                        <div className='time'>
                            <div className='time-input'>
                                <input 
                                    type='text'
                                    placeholder='00'
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                            const parsedValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
                                            setHours(!isNaN(parsedValue) && parsedValue < 100 ? parsedValue : `${e.target.value}`.substring(0,2));
                                        }
                                    }}                                    
                                    value={hours === '' ? '' : (hours < 10 ? `0${hours}` : (hours < 100 ? hours : `${hours}`.substring(0,2)))}
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
                                    maxLength={3}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                            const parsedValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
                                            setMinutes(!isNaN(parsedValue) && parsedValue < 100 ? parsedValue : `${e.target.value}`.substring(0,2));
                                        }
                                    }}                                      
                                    value={minutes === '' ? '' : (minutes < 10 ? `0${minutes}` : (minutes < 100 ? minutes : `${minutes}`.substring(0,2)))}
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
                                    maxLength={3}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                            const parsedValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
                                            setSeconds(!isNaN(parsedValue) && parsedValue < 100 ? parsedValue : `${e.target.value}`.substring(0,2));
                                        }
                                    }}                                      
                                    value={seconds === '' ? '' : (seconds < 10 ? `0${seconds}` : (seconds < 100 ? seconds : `${seconds}`.substring(0,2)))}
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
                >Add Task</button>

            </form>
        </div>
    )
}

export default Create