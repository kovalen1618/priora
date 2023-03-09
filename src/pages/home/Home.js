// React
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// Firebase
import { projectFirestore } from '../../firebase/config';

// Components
import TaskList from '../../components/TaskList';

// Assets
import addTaskIcon from '../../assets/add-task-icon.svg';

function Home() {
    // Data returned from Firestore Database
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsPending(true);

        // Fetches a snapshot of the named collection
        const unsub = projectFirestore.collection('tasks').onSnapshot((snapshot) => {
        if (snapshot.empty) {
            setError('No tasks to load');
            setIsPending(false);
        } else {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ id: doc.id, ...doc.data() })
            })

            setData(results);
            setIsPending(false);
        }
        }, (err) => {
            setError(err.message);
            setIsPending(false);
        })

        // Cleanup
        return () => unsub();

    }, [])

    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <TaskList tasks={data} />}
            <Link to='/create'>
                <img src={addTaskIcon} alt="Add Task" />
            </Link>
        </div>
    )
}

export default Home