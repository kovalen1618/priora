import React from 'react'

function TaskList({ tasks }) {
  return (
    <div>
        {tasks.map(task => (
            <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.time}</p>
            </div>
        ))}
    </div>
  )
}

export default TaskList