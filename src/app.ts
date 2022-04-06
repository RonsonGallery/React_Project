import app  from'./server'

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT)
});

//module.exports = Routernp