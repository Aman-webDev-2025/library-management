const express = require('express');
const router = express.Router()
const {users} = require('../data/users.json');

/**
 * route: /users
 * method: GET
 * description: get all list of users in system
 * parameter: None
 */
router.get('/' , (req , res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})




/**
 * route: /users
 * method: POST
 * description: create/Register new users
 * parameter: None
 */
router.post('/' , (req , res)=> {

    const {id , name , email , subscriptionType , subscriptionDate} = req.body;
    if(!id || !name || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success: false,
            message: "please enter all required fields"
        })
    }

    const user = users.find((each)=> each.id === id)
    if(user){
        return res.status(404).json({
            success: false,
            message: `user already exists with this ${id}`
        })
    }

    users.push({id , name , email , subscriptionType , subscriptionDate})

    res.status(201).json({
        success: true,
        message: "user has been added"
    })
})





/**
 * route: /users/id
 * method: GET
 * description: get user by their id
 * parameter: id
 */
router.get('/:id' , (req , res)=>{

    const {id} = req.params;
    console.log()
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `user not found with this ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })

})





/**
 * route: /users/:id
 * method: PUT
 * description: update users by their id
 * parameter: id
 */
router.put('/:id' , (req , res) => {
    const {id} = req.params;
    const data = req.body;

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(400).json({
            success: false,
            message: `user not found with this ${id}`
        })
    }

    Object.assign(user  , data);
    res.status(201).json({
        success: true,
        message: `update user successfully`,
        data: user 
    })

})



/**
 * route: /users/:id
 * method: DELETE
 * description: delete user by their id
 * parameter: id
 */
router.delete('/:id' , (req , res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id)

    if(!user){
        return res.status(400).json({
            success: false,
            message: `user not found with this ${id}`
        })
    }

    //1.
    // const index = users.indexOf(user);
    // users.splice(index, 1);

    //2.
    const afterDeletedData = users.filter((each) => each.id !== id)
    res.status(200).json({
        success: true,
        message: `deleted user with this ${id}`,
        data: afterDeletedData
    })
})


module.exports = router;