const express = require('express')
const router  = express.Router()

router.get('/post', (req,res) =>{
    res.send('app get post')
});

router.post('/post', (req,res) =>{
    res.send('app post post')
});


module.exports = router