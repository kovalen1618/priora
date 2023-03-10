// React
import React, { createRef, useState } from 'react';
import CountdownTimer from './CountdownTimer';

// Firebase
import { projectFirestore } from '../firebase/config';

// Assets
import trashCanIcon from '../assets/trash-can.svg';
import resetTimeIcon from '../assets/time-reset.svg';
import pencilIcon from '../assets/pencil-edit.svg';

// Styles
import './TaskList.css';

export default function TaskList({ tasks }) {
  // Keep track of each task and if their CountdownTimer is running
  const [taskStates, setTaskStates] = useState(
    // An array of task objects | countdownRef is used to access the CountdownTimer's pause and play methods
    tasks.map((task) => ({
      isRunning: false,
      id: task.id,
      countdownRef: createRef(),
    }))
  );

  // Keep track of the currently playing task's index
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Handles play/pause button click event for every task
  const handlePlayPause = (taskId) => {
    // Copies task states and spreads into a new array since state variables are immutable
    const newTaskStates = [...taskStates];
    const taskState = newTaskStates.find((task) => task.id === taskId);

    // Pauses the current task if it's already playing
    if (taskState.isRunning) {
      taskState.countdownRef.current.pause();
      taskState.isRunning = false;
      setCurrentTaskId(null);
    } else {
      // Returns the task object that has an id property matching the current taskId (currentTaskId). 
      // This currentTaskState object is then used later in the function to update the isRunning property of the task.
      const currentTaskState = newTaskStates.find((task) => task.id === currentTaskId);

    // Pauses or plays a task's CountdownTimer by using CountdownTimer's 
    // referenced pause and play methods on taskState's countdownRef value
    // dependant on taskState's isRunning value
    if (currentTaskState) {
      currentTaskState.countdownRef.current.pause();
      currentTaskState.isRunning = false;
    }
      taskState.countdownRef.current.play();
      taskState.isRunning = true;
      setCurrentTaskId(taskId);
    }

    // Updates array objects with new values
    setTaskStates(newTaskStates);
  }

  const handleReset = (taskIndex) => {
    // Copies task states and spreads into a new array since state variables are immutable
    const newTaskStates = [...taskStates];
    const taskState = newTaskStates[taskIndex];

    // Pauses CountdownTimer when reset
    if (taskState.isRunning) {
      taskState.countdownRef.current.pause();
      taskState.isRunning = false;
    }

    // Uses CountdownTimer's reset method on countdownRef to set to original time value
    taskState.countdownRef.current.reset();

    // Updates array objects with new values
    setTaskStates(newTaskStates);
  }

  const handleDelete = (id) => {
    if (id === currentTaskId) {
      const newTaskStates = [...taskStates];
      const taskState = newTaskStates.find((task) => task.id === id);
      taskState.countdownRef.current.pause();
      taskState.isRunning = false;
      setCurrentTaskId(null);
      setTaskStates(newTaskStates);
    }

    projectFirestore.collection('tasks').doc(id).delete();
  }

  const handleEdit = (id) => {
    projectFirestore.collection('tasks').doc(id).update({
      title: 'Something else'
    });
  }


  return (
    <div>
      {/* Index is created through the .map method and represents the task being processed */}
      {tasks.map((task, index) => (
        <div className="task-container" key={task.id}>
          <h3 className="title">{task.title}</h3>
          <div className="task">
            {/* Pause/Play */} {/* Ensures that taskStates[index] exists before trying to access its isRunning property */}
            <div className={`play ${taskStates && taskStates[index] && taskStates[index].isRunning ? 'pause' : ''}`} onClick={() => handlePlayPause(task.id)}></div>
            {/* Timer */}
            <CountdownTimer
              startingMinutes={task.time}
              // Function is executued when the timer is finished
              onTimerComplete={() => {
                const newTaskStates = [...taskStates];
                newTaskStates[index].isRunning = false;
                setTaskStates(newTaskStates);
              }}
              /* Ensures that taskStates[index] exists before trying to access its countdownRef property */
              ref={taskStates && taskStates[index] && taskStates[index].countdownRef}
            />
            <div className="options">
              {/* Reset Timer Button */}
              <img
                className='reset'
                src={resetTimeIcon}
                onClick={() => handleReset(index)}
                alt='Reset Timer Icon'
              />
              {/* Edit Task Button */}
              <img
                className='edit'
                src={pencilIcon}
                onClick={() => handleEdit(task.id)}
                alt='Edit Task Icon'
              />
              {/* Delete Task Button */}
              <img
                className='delete'
                src={trashCanIcon}
                onClick={() => handleDelete(task.id)}
                alt='Delete Task Icon'
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}