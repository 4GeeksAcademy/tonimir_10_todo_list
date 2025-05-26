import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component


const Home = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  //API FETCH


  // GET
  const getTodo = () =>{fetch('https://playground.4geeks.com/todo/users/antonio', {
      method: "GET",
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
        setTodoList(data.todos);
        console.log(data); 
    })
    .catch(error => {
       
        console.log(error);
    });} 

//POST TIENE QUE IR DENTRO DE HANDLECLICK??
const postToDo = () => {
  const newTask = { label: input, is_done: false };

  const newTodos = [...todoList, newTask];

fetch("https://playground.4geeks.com/todo/todos/antonio", {
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
  
  .then((data) => {
    setTodoList(newTodos);
    setInput("");
    getTodo();
  })
  .catch((error) => {
    console.error("Error en POST:", error);
  });
}


const deleteTodos = (id)  => {

  fetch(`https://playground.4geeks.com/todo/todos/${id}`)


}

useEffect(() => {
  getTodo();
},
 [])


  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
   postToDo();
  };

  const deleteTodo = (id) => {
   
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((resp) => { 
      getTodo();
      
    })
     
    .catch((error) => {
      console.error("Error en DELETE:", error);
    });
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
             {todo.done ? <del>{todo.label}</del> : todo.label}
			  <div>
              <button className="done-btn" onClick={() => doneTodo(index)}>🗹</button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
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
