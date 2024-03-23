const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stockRoutes = require('./routes/stocks');
const PORT = 8088;

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    return res.send("main screen");
});

app.use("/api/list", stockRoutes);
app.use("/api/list/:id", stockRoutes);

app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
});