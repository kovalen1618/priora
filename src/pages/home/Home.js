// Components
import TaskList from '../../components/TaskList';
import Modal from '../../components/Modal';

// Hooks
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// Styes
import styles from './Home.module.css'

function Home() {
    const { user } = useAuthContext();
    const { documents, error } = useCollection(
        'tasks',
        ['uid', '==', user.uid],
        ['createdAt', 'desc']
    )

    return (
        <div className={styles.home}>
            {/* {console.log(error)} */}
            {error && <p>{error}</p>}
            {documents && <TaskList tasks={documents} />}
            <Modal />
        </div>
    )
}

export default Home