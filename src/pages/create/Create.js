// TODO: Page to create tasks


import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { projectFirestore } from '../../firebase/config';

function Create() {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const doc = { title, time };

        try {
            await projectFirestore.collection('tasks').add(doc);
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }



    return (
        <div>
            <h2>Add a New Task</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    <span>Title</span>
                    <input 
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Time</span>
                    <input 
                        type='number'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        required
                    />
                </label>

                <button>Submit</button>

            </form>
        </div>
    )
}

export default Create