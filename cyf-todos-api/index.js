const express = require("express");
const shortid = require("shortid");
const cors = require('cors'); 
const app = express(); 

app.use(express.json());
app.use(cors());

let todos = [
    { id: shortid.generate(), todo: "Learn Node.JS", completed: false},
    { id: shortid.generate(), todo: "Cook", completed: false}
]; 

app.get("/", (req, res) => {
    res.send("CYF todos API");
}); 

app.get("/todos", (req, res) => {
    res.json(todos);
})

//to CREATE a new item
app.post("/todos", (req, res) => {
    const todoValue = req.body.todo; 
    //console.log(req.body);
    if (todoValue) {
        const newId = shortid.generate();
        const newTodoItem = { id: newId, todo: todoValue, completed: false };
        todos.push(newTodoItem);
        res.send("New todo created");
    } else {
        res.status(400).send("The request body is invalid");
    }
});

//to DELETE a specific item
app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    todos = todos.filter(todo => todo.id !== todoId);
    res.send(`Todo ${todoId} has been deleted`);
});

//to UPDATE a specific item
app.put("todos/:id", (req, res) => {
    const todoId = req.params.id;
    const newTodoValue = req.body.todo;
    const newCompletedValue = req.body.completed;
    const todoToUpdate = todos.find(todo => todo.id === todoId); 

    if (todoToUpdate) {
        if (newTodoValue) todoToUpdate.todo = newTodoValue;
        todoToUpdate.completed = !!newCompletedValue;
        return res.send(`Todo Id: ${todoId} has been updated!`);
    } res.status(400).send("Invalid update request");
})

app.listen(3000, () => {
    console.log("Server started on port 3000 and ready to accept request!"); 
});