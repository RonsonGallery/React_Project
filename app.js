const { Router } = require('express');
const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})

const db = mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})

db.once('open',()=>{
    console.log('Connected to mongo succesfully')
})

app.get('/', (req,res) =>{
    res.send('Hello World')
});

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true, limit:'1mb'}))
app.use(bodyparser.json())

const post_routes = require('./routes/post_routes')
app.use('/post',post_routes)


app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT)
});

//module.exports = Routernp