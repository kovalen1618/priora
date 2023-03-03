import React, { createRef, useState } from 'react'
import CountdownTimer from './CountdownTimer'

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
  function handlePlayPause(taskIndex) {
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

  function resetTimer(taskIndex) {
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

  return (
    <div>
      {/* Index is created through the .map method and represents the task being processed */}
      {tasks.map((task, index) => (
        <div className="task" key={task.id}>
          <h3 className="title">{task.title}</h3>
          {/* Pause/Play */}
          <button className="play-pause" onClick={() => handlePlayPause(index)}>
            {taskStates[index].isRunning ? "PAUSE" : "PLAY"}
          </button>
          {/* Reset */}
          <button className="reset-button" onClick={() => resetTimer(index)}>
            Reset
          </button>
          {/* Timer */}
          <CountdownTimer
            startingMinutes={task.time}
            // Function is executued when the timer is finished
            // TODO: When passed to CountdownTimer and place in dependency array of its useEffect it causes an infinite loop. Look into callbackfn for here
            onTimerComplete={() => {
              const newTaskStates = [...taskStates];
              newTaskStates[index].isRunning = false;
              setTaskStates(newTaskStates);
            }}
            ref={taskStates[index].countdownRef}
          />
        </div>
      ))}
    </div>
  );
}