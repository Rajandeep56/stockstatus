const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const stockRoutes = require('./routes/stocks');
const userRoutes = require('./routes/users');
const jwt = require('jsonwebtoken');
const userDataPath = path.join(__dirname, 'data', 'users.json');
const userData = JSON.parse(fs.readFileSync(userDataPath));
const { authorize } = require("./middleware/middleware");

SECRET_KEY = process.env.SECRET_KEY;
const PORT = 8088;

app.use(cors());
app.use(express.json());

app.post('/login', (req,res) => {
    let { username, password } = req.body;
    try{
    const user = userData.find(item => item.username === username);
    if(!user || user.password !== password){
        return res.sendStatus(401);
    }
    let token = jwt.sign(
            {username: username}, SECRET_KEY
        );
        res.json({ token });
        
    }catch(error){
        res.sendStatus(500);
    }
});

app.get('/',(req,res) => {
    return res.send("main screen");
});

app.use("/api/list", authorize(["view_stock"]), stockRoutes);
app.use("/api/list/:id",authorize(["view_stock"]), stockRoutes);
app.use("/api/users", authorize(["view_users"]), userRoutes);
app.use("/api/users/:id",authorize(["view_users"], ["editupdate_users"]), userRoutes);

app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
});
