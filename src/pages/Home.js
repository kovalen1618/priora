import React, { useEffect, useState } from 'react'
import TaskList from '../components/TaskList';
import { projectFirestore } from '../firebase/config';

function Home() {
    // Data returned from Firestore Database
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsPending(true);

        // Fetches a snapshot of the named collection
        projectFirestore.collection('tasks').get().then((snapshot) => {
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
        }).catch(err => {
            setError(err.message);
            setIsPending(false);
        })
    }, [])

    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <TaskList tasks={data} />}
        </div>
    )
}

export default Home