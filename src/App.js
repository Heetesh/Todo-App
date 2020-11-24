import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todosApp.heetesh.firstTodo"

function App() {
  const [todos, setTodos] = useState([]); // Using state to refresh UI without reloading page
  const todoNameRef = useRef(null); // Using HTML element ref 

  useEffect(() => {
    const storedTodosList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodosList) { // checks if todo is present
      setTodos(storedTodosList); // sets the todos
    }
  }, []) // Since empty array, only calls once since it never changes

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) // Saving to local storage and parsing todo as JSON format
  }, [todos])

  /* Takes in todo id to toggle */
  function toggleTodo(id) {
    const newTodos = [...todos]; // copy of current todo list
    const updatedTodo = newTodos.find(updatedTodo => updatedTodo.id === id); 
    updatedTodo.complete = !updatedTodo.complete; // Sets opposite to checked state
    setTodos(newTodos); // Set to new updated todos
  }

  function addTodo(e) {
    let name = todoNameRef.current.value;
    if (name === '') { // check if null
      return; // break out
    } else {
      console.log(name);
      setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
      })
      todoNameRef.current.value = null; // Automatically resets input field when clicked on add
    }
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} /* Passing prop */ />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add todo</button> 
      <button onClick={handleClearTodos} >Clear todo</button> 
      <div>{todos.filter(todo => !todo.complete).length}Todo left</div> 
    </> // this is a fragment tag --> Allows to hold multiple component at once
  )
}


export default App;
