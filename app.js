const express = require('express');
const app = express();

//Landing page
//1st argument : url , 2nd argument : fonction
//entrypoint / fonction annonyme, request et response
app.get('/', (req,res)=>{
    res.send('Hello World');
})

// test page
app.get('/test', (req,res)=>{
    res.send('Hello tesaat');
})


// Listen on port 3000
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`);})