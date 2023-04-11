import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../store';
import { completeTask, deleteTask } from "../../features/tasks/taskSlice";
import { Link } from "react-router-dom";

export default function TasksList() {
    const tasksState = useSelector((state: RootState) => state.task)
    const dispatch = useDispatch()

    const handleComplete = (id: string | undefined) => {
      dispatch(completeTask(id))
    }

    const handleDelete = (id: string | undefined) => {
      dispatch(deleteTask(id))
    }
    return (
        <div>
          <header>
            <h1>Tasks {tasksState.tasks.length}</h1>
            <Link to={'create-task'}>Create Task</Link>

          </header>
          {tasksState.tasks.map(task => (
            <div key={task.id}>
              <h3>{task.tittle}</h3>
              <p>{task.description}</p>
              <p>{task.completed ? 'True' : 'False'}</p>
              <button onClick={(event) => handleComplete(task.id)}>Done</button>
              <button onClick={(event) => handleDelete(task.id)}>Delete</button>
              <Link to={`/edit-task/${task.id}`}>Edit</Link>
            </div>
          ))}

        </div>
      )
}
