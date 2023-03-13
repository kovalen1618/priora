// React
import React, { useState } from 'react'

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
                    <span className='title'>Title</span>
                    <input 
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label className='clock'>
                    <span>Time</span>
                    <div className='time-inputs'>
                        <input 
                            type='text'
                            placeholder='00'
                            onChange={(e) => setHours(parseInt(e.target.value))}
                            value={hours}
                        />
                        :
                        <input 
                            type='text'
                            placeholder='00'
                            onChange={(e) => setMinutes(parseInt(e.target.value))}
                            value={minutes}
                        />
                        :
                        <input 
                            type='text'
                            placeholder='00'
                            onChange={(e) => setSeconds(parseFloat(e.target.value))}
                            value={seconds}
                        />
                    </div>
                </label>
                

                <button 
                    disabled={isSubmitting} 
                    className='submit-form-button' 
                    onClick={() => setTime((hours * 60) + minutes + seconds / 60)}
                >Submit</button>

            </form>
        </div>
    )
}

export default Create