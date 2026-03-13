const express = require('express');

const app = express();

const port=8081;

app.use(express.json());

app.get('/' , (req , res)=>{
    res.status(200).send("home page")
})

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
})