// React
import React, { useEffect, useRef, useState } from 'react';

// Pages
import Create from '../pages/create/Create';

// Styles
import './Modal.css';

// Assets
import addTaskIcon from './../assets/add-task-icon.svg';


function Modal() {
    // Modal
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef();

    // Closes whenever a user clicks outside of the modal
    useEffect(() => {
        const modalHandler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
            }
        }

        document.addEventListener('mousedown', modalHandler);
    }, []);


    return (
        <div>
            <div className='add-task-icon-container' onClick={() => {setShowModal(!showModal)}}>
                <h2>Add Task</h2>
                <img 
                    src={addTaskIcon} 
                    alt="Add Task" 
                />
            </div>
            
            
            {showModal && (
                <div className='modal'>
                    <div className='modal-content' ref={modalRef}>
                        {/* <span className='modal-close' onClick={() => {setShowModal(!showModal)}}>&times;</span> */}
                        <Create closeModal={() => {setShowModal(!showModal)}} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal