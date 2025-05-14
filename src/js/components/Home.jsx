import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [input,setInput] = useState("");
	return (
		<>
		<div className="text-center">
        <div className="todo-list">
			<input value={input} type="text" onChange={() => {setInput(e.target.value)}}/>
			<button className="btn btn-light">Agregar tarea</button>
			<ul>
				<li></li>
			</ul>
		</div>    

		</div>

		</>
	);
};

export default Home;