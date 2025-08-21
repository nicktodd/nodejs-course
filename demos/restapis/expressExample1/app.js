const express = require("express");

const app = express();
app.use(express.json());
const port = 5000;

const users = [
    {
        name: "Tim",
        age: 21
    },
    {
        name: "Caprice",
        age: 23
    }

]

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:name", (req,res) => {
    let matchingUser = users.find(user => user.name == req.params.name );
    if (matchingUser) {
        res.status(200).json(matchingUser);
    }
    else {
        message = `No matching user user ${req.params.name}`
        res.status(404).json({message: message});
    }
});

app.post("/users", (req,res) => {
    let newUser = req.body;
    users.push(newUser);
    message = `Added user  ${newUser.name}`
    res.status(201).json({message: message});
});

app.delete("/users/:name", (req,res) => {
     let matchingUserIndex = users.findIndex(user => user.name == req.params.name );
    
     if (matchingUserIndex !== -1) {
        users.splice(matchingUserIndex, 1);
        res.status(200).json({message: "deleted the user"});
    }
    else {
        message = `No matching user user ${req.params.name}`
        res.status(404).json({message: message});
    }


})



app.listen(port, () => {
    console.log("server running on port " + port);
});
