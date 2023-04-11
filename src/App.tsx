import { useState } from 'react'
import './App.css'
import { useSelector } from "react-redux";
import { RootState } from './app/store';
import TasksList from './app/components/TasksList';
import TasksForm from './app/components/TasksForm';
// useDispatch se usa para disparar las acciones para actualizar el estado
// useSelector se usa para traer los datos del estado - tiene acceso a todo el estado
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TasksList/>}></Route>
          <Route path='/create-task' element={<TasksForm/>}></Route>
          <Route path='/edit-task/:id' element={<TasksForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
