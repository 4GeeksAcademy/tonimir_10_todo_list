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

  //API FETCH
  // GET
  fetch('https://playground.4geeks.com/todo/todos/alesanchezr', {
      method: "GET",
      //body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status); 
        return resp.json(); 
    })
    .then(data => {
        setTodoList(data);
        console.log(data); 
    })
    .catch(error => {
       
        console.log(error);
    });

//POST TIENE QUE IR DENTRO DE HANDLECLICK??

const newTask = { label: input, done: false };

fetch("https://playground.4geeks.com/todo/todos/tonimir10", {
  method: "POST",
  body: JSON.stringify(newTask),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resp) => {
    if (!resp.ok) throw new Error("Error al agregar tarea");
    return resp.json();
  })
  .then(() => {
    return fetch("https://playground.4geeks.com/todo/todos/tonimir10");
  })
  .then((resp) => resp.json())
  .then((data) => {
    setTodoList(data);
    setInput("");
  })
  .catch((error) => {
    console.error("Error en POST:", error);
  });




  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    if (input.trim() === "") return;
    setTodoList([...todoList, { task: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (index) => {
    const lista = todoList.filter((todo, i) => i !== index);
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
