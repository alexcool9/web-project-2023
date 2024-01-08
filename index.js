require("dotenv").config();
const express = require('express');
var chalk = require('chalk');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
const usersRouter = require('./routes/users.routes.js');
const cardsRouter = require('./routes/cards.routes.js');
var cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({origin: 'http://localhost:8181'}));

//Health check
app.get("/", (req, res)=>{
    console.log(chalk.blue('Hello world!'));
    res.send("Hello world!!!!!");
});

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

const port = process.env.PORT || 8181;

app.listen(port, ()=>{
    console.log(chalk.blue("Example app listening on port", port));
});

mongoose
  .connect(process.env.DB1 || 'mongodb://127.0.0.1:27017/test_alex')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  });


  


