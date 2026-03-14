const express = require('express');
const router = express.Router()
const {books} = require('../data/books.json')
const {users} = require('../data/users.json');

/**
 * route: /books
 * method: GET
 * description: get all list of books in system
 * parameter: None
 */
router.get('/' , (req , res)=>{
    res.status(200).json({
        success: true,
        data: books
    })
})


/**
 * route: /books
 * method: POST
 * description: create/Register new books
 * parameter: None
 */
router.post('/' , (req , res)=> {

    const {id , name , author , genre  , price , publisher} = req.body;
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success: false,
            message: "please enter all required fields"
        })
    }

    const book = books.find((each)=> each.id === id)
    if(book){
        return res.status(404).json({
            success: false,
            message: `book already exists with this ${id}`
        })
    }

    books.push({id , name , author , genre  , price , publisher})

    res.status(201).json({
        success: true,
        message: "book has been added"
    })
})


/**
 * route: /books/id
 * method: GET
 * description: get book by their id
 * parameter: id
 */
router.get('/:id' , (req , res)=>{

    const {id} = req.params;
    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `book not found with this ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })

})


/**
 * route: /books/:id
 * method: PUT
 * description: update books by their id
 * parameter: id
 */
router.put('/:id' , (req , res) => {
    const {id} = req.params;
    const data = req.body;

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(400).json({
            success: false,
            message: `book not found with this ${id}`
        })
    }

    Object.assign(book  , data);
    res.status(201).json({
        success: true,
        message: `update book successfully`,
        data: book 
    })

})



/**
 * route: /books/:id
 * method: DELETE
 * description: delete book by their id
 * parameter: id
 */
router.delete('/:id' , (req , res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(400).json({
            success: false,
            message: `book not found with this ${id}`
        })
    }

    //1.
    // const index = users.indexOf(book);
    // books.splice(index, 1);

    //2.
    const afterDeletedData = books.filter((each) => each.id !== id)
    res.status(200).json({
        success: true,
        message: `deleted book with this ${id}`,
        data: afterDeletedData
    })
})



/**
 * route: /books/issued/for-users
 * method: GET
 * description: get all issued book
 * parameter: None
 */
router.get('/issued/for-users' , (req , res) => {
    
    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBook = [];

    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook)

        book.issuedBook = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBook.push(book);
    })

    if(!issuedBook===0){
        return res.status(404).json({
            success: false,
            message: "no books found"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBook
    })
})



module.exports = router;