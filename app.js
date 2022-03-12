const { Router } = require('express');
const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT

app.get('/', (req,res) =>{
    res.send('Hello World')
});

const post_routes = require('./routes/post_routes')
app.use('/post',post_routes)


app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT)
});

//module.exports = Routernp