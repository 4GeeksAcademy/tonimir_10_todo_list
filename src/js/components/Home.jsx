import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component


const Home = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([
    { task: 'Repasar React', done: false },
    { task: 'Ver el Real Madrid', done: false }
  ]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    if (input.trim() === "") return;
    setTodoList([...todoList, { task: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (index) => {
    const lista = todoList.filter((_, i) => i !== index);
    setTodoList(lista);
  };

  const doneTodo = (index) => {
    const doneList = todoList.map((item, i) => {
      if (i === index) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodoList(doneList);
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="title">Todo List</h1>
      <div className="todo-list">
        <input
          value={input}
          type="text"
          onChange={handleChange}
          placeholder="Escribe una tarea..."
        />
        <button className="btn btn-light" onClick={handleClick}>Agregar tarea</button>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {todo.done ? <del>{todo.task}</del> : todo.task}
			  <div>
              <button className="done-btn" onClick={() => doneTodo(index)}>🗹</button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>X</button>
			  </div>
            </li>
          ))}
          <li className="todo-count">Total de tareas: {todoList.length}</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
