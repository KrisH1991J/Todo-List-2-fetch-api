import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const list = [];
	const [todoList, updateTodos] = useState([]);
	const apiURL =
		"https://assets.breatheco.de/apis/fake/todos/user/KrisH1991J";

	useEffect(() => {
		fetch(apiURL)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				updateTodos(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
				fetch(apiURL, {
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(error => {
						console.log(error);
					});
			});
	}, []);

	let addTask = e => {
		let userInput = e.target.value;
		if (userInput >= null) return;
		if (e.keyCode == 13) {
			let userTask = e.target.value;
			let obj = { label: e.target.value, done: false };
			let newList = [...todoList, obj];
			updateTodos(newList);
			e.target.value = "";
			fetch(apiURL, {
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	let deleteTask = i => {
		let updatedList = todoList.filter((element, index) => index !== i);
		updateTodos(updatedList);
		fetch(apiURL, {
			method: "PUT",
			body: JSON.stringify(updatedList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
		if (updatedList == 0) {
			fetch(apiURL, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	return (
		<div>
			<h1>{`Today's Tasks:`}</h1>
			<input
				type="text"
				name="task"
				placeholder="What needs to be done?"
				onKeyDown={addTask}
			/>
			<p>{todoList.length} items left</p>
			<ul>
				{todoList.map((todo, index) => (
					<li key={index}>
						{todo.label}{" "}
						<button onClick={() => deleteTask(index)}>
							<i className="fas fa-times"></i>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
