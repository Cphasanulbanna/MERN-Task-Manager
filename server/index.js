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
app.get("/todo", (req, res) => {
    res.json(TodoList);
});

//ADD-TODO API
app.post("/todo", (req, res) => {
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
app.put("/todo", (req, res) => {
    const { id, todoName, isCompleted } = req.body;

    //error handling
    const keys = [];
    const allData = Object.entries(req.body); //3 arrays with key and values [], [], []
    allData.map((eachArray) => eachArray[1] === "" && keys.push(eachArray[0]));

    if (keys.length) {
        res.json({ message: keys.map((key) => `Field ${key} is required`) });
    }

    //finding index of todo-object to be updated
    const indexOfTodoObject = TodoList.findIndex((todo) => todo.id == id);
    let todoToBeUpdated = TodoList[indexOfTodoObject];

    //updating todo
    todoToBeUpdated.todo = todoName;
    todoToBeUpdated.isCompleted = isCompleted;
    res.json(TodoList);
});

//COMPLETE TODO API
app.patch("/todo", (req, res) => {
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
app.delete("/todo", (req, res) => {
    const { id } = req.body;

    const filteredTodoList = TodoList.filter((todo) => todo.id != id);
    TodoList = filteredTodoList;
    res.json(TodoList);
});

app.all("*", (req, res) => {
    res.json({ message: "404 This page doesnot exists" });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
