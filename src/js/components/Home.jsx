import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [input,setInput] = useState("");
	const [todoList,setTodoList] = useState(['Repasar React','Ver el Real Madrid']);

	const handleChange = (e) => {
		setInput(e.target.value);
	}

	const handleClick = () => {
		setTodoList([...todoList,input]);
		setInput("");
	}

	const deleteTodo = (index) => {
		const lista = todoList.filter((todo,i) => i !== index);
		setTodoList(lista);
	}
	return (
		<>
		<div className="container mt-5 text-center">
			<h1 className="title">Todo List</h1>
        <div className="todo-list">
			<input value={input} type="text" onChange={handleChange} 
			placeholder="Escribe una tarea..."/>
			<button className="btn btn-light" onClick={handleClick}>Agregar tarea</button>
			<ul>
				<li>{input}</li>
				{todoList.map((todo,index) => {
					return (<li>{todo}
					<button className="delete-btn" onClick={()=>deleteTodo(index)}>X</button>
					</li> 	
					)
				})}
				<li className="todo-count">Total de tareas: {todoList.length}</li>
			</ul>
		</div>    

		</div>
		</>
	);
};

export default Home;