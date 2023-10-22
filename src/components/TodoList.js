// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTask = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    < div class="todo-container">
      <h1 class="todo-header">Todo List</h1>
      <div>
        <input class="todo-input"
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button class="add-button" onClick={addTask}>Add</button>
      </div>
      <div>
        <button onClick={() => setFilterCompleted(false)}>All Tasks</button>
        <button onClick={() => setFilterCompleted(true)}>Completed Tasks</button>
      </div>
      <ul class="todo-list">
        {filteredTodos.map((todo) => (
          <li class="todo-item " key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompleted(todo.id)}
            >
              {todo.title}
            </span>
            <div class="d-flex flex-row justify-content-center">
            <button class="edit todo-actions text-center" onClick={() => editTask(todo.id, prompt('Edit task:', todo.title))}>Edit</button>
            <button class="delete todo-actions text-center" onClick={() => deleteTask(todo.id)}>Delete</button>
          </div>
          </li>
        ))}
      </ul>
     
    </div>
  );
}

export default TodoList;

  