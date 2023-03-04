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
    tasks.map(() => ({
      isRunning: false,
      countdownRef: createRef(),
    }))
  );

  // Keep track of the currently playing task's index
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Handles play/pause button click event for every task
  const handlePlayPause = (taskIndex) => {
    // Copies task states and spreads into a new array since state variables are immutable
    const newTaskStates = [...taskStates];
    const taskState = newTaskStates[taskIndex];

    // Pauses the current task if it's already playing
    if (currentTaskIndex !== null && currentTaskIndex !== taskIndex) {
      const currentTaskState = newTaskStates[currentTaskIndex];
      currentTaskState.countdownRef.current.pause();
      currentTaskState.isRunning = false;
    }

    // Pauses or plays a task's CountdownTimer by using CountdownTimer's 
    // referenced pause and play methods on taskState's countdownRef value
    // dependant on taskState's isRunning value
    if (taskState.isRunning) {
      taskState.countdownRef.current.pause();
    } else {
      taskState.countdownRef.current.play();
    }

    // Toggles between task running or NOT running
    taskState.isRunning = !taskState.isRunning;

    // Updates array objects with new values
    setTaskStates(newTaskStates);

    // Update the currently playing task's index
    setCurrentTaskIndex(taskState.isRunning ? taskIndex : null);
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
    projectFirestore.collection('tasks').doc(id).delete();
  }

  return (
    <div>
      {/* Index is created through the .map method and represents the task being processed */}
      {tasks.map((task, index) => (
        <div className="task-container" key={task.id}>
          <h3 className="title">{task.title}</h3>
          <div className="task">
            {/* Pause/Play */}
            {/* // TODO: Whenever the topmost task is deleted, the CSS state continues onto the next task.
                // TODO: And if the 2nd task is running while the topmost is not, the JS state goes from the topmost to the 2nd, making it impossible to pause
                // TODO: Find a way to make sure that the next index does not take on the properties of the previous one. */}
            <div className={`play ${taskStates[index].isRunning ? 'pause' : ''}`} onClick={() => handlePlayPause(index)}></div>
            {/* Timer */}
            <CountdownTimer
              startingMinutes={task.time}
              // Function is executued when the timer is finished
              onTimerComplete={() => {
                const newTaskStates = [...taskStates];
                newTaskStates[index].isRunning = false;
                setTaskStates(newTaskStates);
              }}
              ref={taskStates[index].countdownRef}
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