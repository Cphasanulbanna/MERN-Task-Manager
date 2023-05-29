import React, { useEffect, useState } from "react";

//packages
import axios from "axios";

//css
import "./todo.css";

//images
import edit from "../assets/images/edit.svg";
import dlt from "../assets/images/remove.svg";

export default function Todo() {
    //input states
    const [input, setInput] = useState("");
    const [editInput, setEditInput] = useState("");

    //todo states
    const [todos, setTodos] = useState([]);

    //edit state
    const [editTodo, setEditTodo] = useState("");

    // const API_URL = "http://localhost:5005/todo";
    const API_URL = "https://todo-server-beta-nine.vercel.app/todo";

    useEffect(() => {
        fetchAllTodos();
    }, []);

    //storing todo input data
    const handleInputchange = (e) => {
        const { value } = e.target;
        setInput(value.trimStart());
    };

    //storing edit-todo input data
    const handleEditInputChange = (e) => {
        const { value } = e.target;
        setEditInput(value);
    };

    //fetching all Todos
    const fetchAllTodos = async () => {
        const response = await axios.get(API_URL);
        setTodos(response.data.todoList);
    };

    //add new todo function
    const addTodo = async () => {
        if (input) {
            try {
                const response = await axios.post(API_URL, {
                    todoName: input,
                });
                setTodos(response.data.todoList);
            } catch (error) {
                console.log(error);
            }
            //clearing input field after adding a todo
            setInput("");
        }
    };

    //delete todo function
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(API_URL, {
                data: {
                    id: id,
                },
            });
            setTodos(response.data.todoList);
        } catch (error) {
            console.log(error);
        }
    };

    //save edited-todo function
    const saveTodo = async (todo) => {
        try {
            const response = await axios.put(API_URL, {
                id: todo.id,
                todoName: editInput,
            });
            setTodos(response.data.todoList);
        } catch (error) {
            console.log(error);
        }
        setEditTodo("");
    };

    //mark as complete todo function
    const MarkAsCompleted = async (id) => {
        try {
            const resposne = await axios.patch(API_URL, {
                id: id,
            });
            setTodos(resposne.data.todoList);
        } catch (error) {
            console.log(error);
        }
    };

    //edit todo function
    const EditTodo = (todo) => {
        setEditTodo(todo?.id);
        setEditInput(todo?.todo);
    };

    //cancel edit function
    const cancelEdit = () => {
        setEditTodo("");
    };

    //add todo using enter key
    const handleKeyPress = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            if (input) {
                addTodo();
            }
        }
    };

    return (
        <section className="main-container">
            <div className="shadow-box">
                <div className="todo-main-box">
                    <h1 className="heading">Todo List</h1>
                    <div className="top-box">
                        <input
                            type="text"
                            className="add-todo"
                            placeholder="New Todo"
                            value={input}
                            onChange={handleInputchange}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            onClick={addTodo}
                            className="add"
                        >
                            ADD TODO
                        </button>
                    </div>
                    <div className="bottom">
                        <div className="all-todo-container">
                            {todos?.map((todo) =>
                                editTodo === todo?.id ? (
                                    <div
                                        key={todo?.id}
                                        className="edit-box"
                                    >
                                        <input
                                            type="text"
                                            className="edit"
                                            placeholder={todo?.task}
                                            value={editInput}
                                            onChange={handleEditInputChange}
                                            onKeyDown={handleKeyPress}
                                        />
                                        <button
                                            onClick={() => saveTodo(todo)}
                                            className="save"
                                        >
                                            SAVE
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="cancel"
                                        >
                                            CANCEL
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        key={todo?.id}
                                        className="todo"
                                    >
                                        <div className="left">
                                            <h2
                                                className={`task ${todo?.isCompleted && "active"}`}
                                                onClick={() => MarkAsCompleted(todo?.id)}
                                            >
                                                {`${todo?.id})`} {todo?.todo}
                                            </h2>
                                        </div>
                                        <div className="right">
                                            <div
                                                onClick={() => EditTodo(todo)}
                                                className="edit"
                                            >
                                                <img
                                                    src={edit}
                                                    alt="edit"
                                                />
                                            </div>
                                            <div
                                                onClick={() => deleteTodo(todo?.id)}
                                                className="delete"
                                            >
                                                <img
                                                    src={dlt}
                                                    alt="remove"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
