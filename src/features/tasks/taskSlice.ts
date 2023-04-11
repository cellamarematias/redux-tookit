import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

interface Task {
    id?: string;
    tittle: string;
    description: string;
    completed?: boolean;
  }
  
interface TaskState {
    tasks: Task[];
  }

const initialState: TaskState = {
    tasks: [{id: "1", tittle: 'Primer tarea', description: 'Ver el video de Redux', completed: false}],
 }

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            console.log(state, action)
          const newTask: Task = {
            id: uuid(),
            tittle: action.payload.tittle,
            description: action.payload.description,
            completed: false,
          };
          state.tasks.push(newTask);
        },
        completeTask(state, action: PayloadAction<string | undefined>) {
          const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
          if (taskIndex !== -1) {
            state.tasks[taskIndex].completed = true;
          }
        },
        deleteTask(state, action: PayloadAction<string | undefined>) {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            //si lo encuentra
            if (taskIndex !== -1) {
              state.tasks.splice(taskIndex, 1);
            }
          },
          editTask(state, action: PayloadAction<Task>) {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (taskIndex !== -1) {
              state.tasks = [
                ...state.tasks.slice(0, taskIndex),
                action.payload,
                ...state.tasks.slice(taskIndex + 1),
              ];
            }
          },
          
      },
})

// export la action para poder accederla desde otra parte
export const { addTask, completeTask, deleteTask, editTask } = taskSlice.actions

export default taskSlice.reducer
