const express = require('express');


const usersRoutes = require('./routes/users')
const booksRoutes = require('./routes/book')

const app = express();

const port=8081;

app.use(express.json());

app.get('/' , (req , res)=>{
    res.status(200).json({
        message: "home page"
    })
})


app.use('/users' , usersRoutes);
app.use('/books' , booksRoutes);






// app.all('' , (req , res)=>{
//     res.status(200).json({
//         message: "page not found"
//     })
// })

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
})