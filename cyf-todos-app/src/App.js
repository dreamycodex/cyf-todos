import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoInput, setNewTodoInput] = useState("");

  const loadTodos = () => {
    fetch("http://localhost:3000/todos/").then(res => res.json()).then(data => {
      //do something with data
      //console.log(data);
      setTodos(data);
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleInput = (event) => {
    setNewTodoInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();//to make sure the browser does not reload
    setNewTodoInput("");

    fetch("http://localhost:3000/todos/", {
      method: 'POST',
      body: JSON.stringify({ todo: newTodoInput }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      loadTodos();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      loadTodos();
    });
  };

  const handleComplete = (id, currentStatus) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !currentStatus }),
      headers: {
        'Content-Type': 'application/json'
    }
  }).then(() => {
    loadTodos();
  });
  }; 

  return (
    <div className="todoapp">
      <div>
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="new-todo"
            type="text"
            placeholder="What needs to be done today?"
            value={newTodoInput}
            onChange={handleInput}
            autoFocus
          />
        </form>
      </div>
      <div className="main">
        <ul className="todo-list">
          {todos.map(todoItem => {
            return (
              <li>
               <div className="view">
                <input   
                 className="toggle" 
                 type="checkbox" 
                 checked={todoItem.completed}
                 onChange={() => handleComplete(todoItem.id, todoItem.completed)} />
                <label>{todoItem.todo}</label>
                <button className="destroy" onClick={() => handleDelete(todoItem.id)}/>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
