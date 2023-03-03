import React from 'react'
import CountdownTimer from './CountdownTimer'

function TaskList({ tasks }) {
  // TODO: Look at making timeContext with useReducer to deal with button issue

  return (
    <div>
        {tasks.map(task => (
            <div key={task.id}>
                <h3>{task.title}</h3>
                <button className="play-pause"></button>
                <CountdownTimer 
                  startingTime={task.time}
                />
            </div>
        ))}
    </div>
  )
}

export default TaskList