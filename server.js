const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
// const app = express();

const cors = require('cors');
// const mongoose = require('mongoose');
const postRoute = require('./post.route');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require("./post.route")(app);
// app.use('/posts', postRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});