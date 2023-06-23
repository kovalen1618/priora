// // React
// import React, { useEffect, useState } from 'react'

// // Firebase
// import { projectFirestore } from '../../firebase/config';

// Components
import TaskList from '../../components/TaskList';
import Modal from '../../components/Modal';

// Styes
import './Home.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

function Home() {
    // Data returned from Firestore Database
    // const [data, setData] = useState(null);
    // const [isPending, setIsPending] = useState(false);
    // const [error, setError] = useState(false);

    // useEffect(() => {
    //     setIsPending(true);

    //     // Fetches a snapshot of the named collection
    //     const unsub = projectFirestore.collection('tasks').onSnapshot((snapshot) => {
    //     if (snapshot.empty) {
    //         setError('No tasks to load');
    //         setIsPending(false);
    //         // Displays empty page when all data from Firestore is empty
    //         setData([]);
    //     } else {
    //         let results = [];
    //         snapshot.docs.forEach(doc => {
    //             results.push({ id: doc.id, ...doc.data() })
    //         })

    //         setData(results)
            
    //         setIsPending(false);
    //     }
    //     }, (err) => {
    //         setError(err.message);
    //         setIsPending(false);
    //     })

    //     // Cleanup
    //     return () => unsub();

    // }, [])

    const { user } = useAuthContext();
    const { documents, error } = useCollection(
        'tasks',
        ['uid', '==', user.uid],
        ['createdAt', 'desc']
    )

    return (
        <div className='home'>
            {/* {console.log(error)} */}
            {error && <p>{error}</p>}
            {documents && <TaskList tasks={documents} />}
            <Modal />
        </div>
    )
}

export default Home