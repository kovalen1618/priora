// React
import React, { createRef, useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';

// Firebase
import { projectFirestore } from '../firebase/config';

// Assets
import trashCanIcon from '../assets/trash-can.svg';
import resetTimeIcon from '../assets/time-reset.svg';
// import pencilIcon from '../assets/pencil-edit.svg';

// Styles
import styles from './TaskList.module.css';

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

  // Reflects the same data within the Firestore Database
  // Manages the correct state when a user interacts with a task's play/pause button
  useEffect(() => {
    setTaskStates(prevTaskStates =>
      tasks.map((task) => {
        const taskState = prevTaskStates.find((state) => state.id === task.id);
        // Update the chosen task with the new states or leave at default values
        return taskState ? taskState : { isRunning: false, id: task.id, countdownRef: createRef() }
      })
    )
  }, [tasks]);

  // Handles play/pause button click event for every task
  const handlePlayPause = (taskId) => {
    // Copies task states and spreads into a new array since state variables are immutable
    const newTaskStates = [...taskStates];
    const taskState = newTaskStates.find((task) => task.id === taskId);

    // Pauses the current task if it's already playing
    if (taskStates && taskState.isRunning) {
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
    // Conditional checks if task is being played so that it can be stopped before being deleted to mitigate errors
    if (id === currentTaskId) {
      const newTaskStates = [...taskStates];
      const taskState = newTaskStates.find((task) => task.id === id);
      taskState.countdownRef.current.pause();
      taskState.isRunning = false;
      setCurrentTaskId(null);   
      setTaskStates(newTaskStates);
    }

    // Deletes task from the database
    projectFirestore.collection('tasks').doc(id).delete();
    localStorage.removeItem(`time_${id}`, id);
  }

  // TODO: Once figuring out updating, rebuild and deploy with the new code
  // const handleEdit = (id) => {
  //   projectFirestore.collection('tasks').doc(id).update({
  //     name: 'Something else'
  //   });
  // }


  return (
    <div>
      {/* Index is created through the .map method and represents the task being processed */}
      {tasks.map((task, index) => (
        <div className={styles["task-container"]} key={task.id}>
          <h3 className={styles.name}>{task.name}</h3>
          <div className={styles.task}>
            <div className={styles["play-button-container"]}>
              {/* Pause/Play */} {/* Ensures that taskStates[index] exists before trying to access its isRunning property */}
              <div className={`${styles.play} ${taskStates && taskStates[index] && taskStates[index].isRunning ? styles.pause : ''}`} onClick={() => handlePlayPause(task.id)}></div>
            </div>
            {/* Timer */}
            <div className={styles.timer}>
              <CountdownTimer 
                taskId = {task.id}
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
            </div>
            <div className={styles.options}>
              {/* Reset Timer Button */}
              <img
                className={styles.reset}
                src={resetTimeIcon}
                onClick={() => handleReset(index)}
                alt='Reset Timer Icon'
              />
              {/* Edit Task Button */}
              {/* <img
                className={styles.edit}
                src={pencilIcon}
                onClick={() => handleEdit(task.id)}
                alt='Edit Task Icon'
              /> */}
              {/* Delete Task Button */}
              <img
                className={styles.delete}
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