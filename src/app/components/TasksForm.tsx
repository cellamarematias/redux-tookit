import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from '../store';



export default function TasksForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasksState = useSelector((state: RootState) => state.task)

    const [task, setTask] = useState({
        tittle: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
      };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(params.id) {
            dispatch(editTask(task))
            navigate('/')
        } else {
            dispatch(addTask(task))
            navigate('/')
        }
    };

    useEffect(() => {
        console.log(typeof(params.id)); // ojo que esto devuelve un string


      
        if (params) {
          const foundTask = tasksState.tasks.find(task => task.id == params.id);

          console.log(foundTask)

          if (foundTask) {
            console.log(foundTask)
            setTask(foundTask);
          }
        }
      }, [params, tasksState.tasks]);
    

  return (
    <form onSubmit={handleSubmit}>
        <input name='tittle' type="text" placeholder='Tittle' onChange={handleChange} value={task.tittle}/>

        <textarea name="description" placeholder='Descrription' onChange={handleChange} value={task.description}></textarea>

        <button>save</button>
    </form>
  )
}
