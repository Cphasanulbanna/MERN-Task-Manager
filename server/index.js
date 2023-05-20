//MODULES
const express = require("express");
const cors = require("cors");

const PORT = 5005;
const app = express();

app.use(express.json());
app.use(cors());

let TodoList = [
    {
        id: 1,
        todo: "Learn Node Js",
        isCompleted: false,
    },
    {
        id: 2,
        todo: "Python",
        isCompleted: false,
    },
];

//GET ALL-TODOS API
app.get("/", (req, res) => {
    res.json(TodoList);
});

//ADD-TODO API
app.post("/add-todo", (req, res) => {
    const { todoName } = req.body;

    //id of previous todo
    const prevTodoId = TodoList[TodoList.length - 1].id;

    //new todo to be added
    const newTodo = {
        id: prevTodoId + 1,
        todo: todoName,
        isCompleted: false,
    };

    TodoList.push(newTodo);
    res.json(TodoList);
});

//UPDATE TODO API
app.put("/update-todo", (req, res) => {
    const { id, todoName } = req.body;

    //finding index of todo-object to be updated
    const indexOfTodoObject = TodoList.findIndex((todo) => todo.id == id);
    let todoToBeUpdated = TodoList[indexOfTodoObject];

    if (todoName) {
        //updating todo
        todoToBeUpdated.todo = todoName;
        res.json(TodoList);
    }
});

//COMPLETE TODO API
app.put("/complete-todo", (req, res) => {
    const { id } = req.body;

    //finding index of todo-object to be updated
    const indexOfTodoObject = TodoList.findIndex((todo) => todo.id == id);
    let todoToBeCompleted = TodoList[indexOfTodoObject];

    const status = todoToBeCompleted.isCompleted;
    if (status) {
        todoToBeCompleted.isCompleted = false;
    } else {
        todoToBeCompleted.isCompleted = true;
    }

    res.json(TodoList);
});

//DELETE TODO
app.delete("/delete-todo", (req, res) => {
    const { id } = req.body;

    const filteredTodoList = TodoList.filter((todo) => todo.id != id);
    TodoList = filteredTodoList;
    res.json(TodoList);
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
