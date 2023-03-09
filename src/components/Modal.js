// React
import React, { useRef, useState } from 'react';

// Pages
import Create from '../pages/create/Create';

// Styles
import './Modal.css';

// Assets
import addTaskIcon from './../assets/add-task-icon.svg';


function Modal() {
    // Modal
    const [showModal, setShowModal] = useState(false);

    // A ref for the modal container element within the DOM so that it is closed
    // whenever a user clicks outside of the modal
    // TODO: Currently not in use
    const modalRef = useRef();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return (
        <div>
            <img 
                src={addTaskIcon} 
                onClick={openModal}
                alt="Add Task" 
            />

            {showModal && (
                <div className='modal' ref={modalRef}>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <Create closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal