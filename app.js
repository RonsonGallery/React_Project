const { Router } = require('express');
const express = require('express')
const app = express();
const PORT = 3000;
const dotenv = require('dotenv').config()

app.get('/', (req,res) =>{
    res.send('Hello World')
});

const post_routes = require('./routes/post_routes')
app.use('/')


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Example app listening on port' + PORT)
});

module.exports = Router