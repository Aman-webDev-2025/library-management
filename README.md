# Library-Management-System

    library management API Backed for management of user and the books

## Routes and endpoint

## /users
    GET: get all list of users in system
    POST: create/Register new users

## /users/{id}
    GET: get user by their id
    POST: update users by their id
    DELETE: delete users by their id (check if user still issue book) and (is any fine to collect)

## /users/subscription-details/{id}
    GET: get user subscription details by their id
        >> Date of subsctription
        >> Valid till?
        >> Fine if any?

## /books
    GET: get all list of books in system
    POST: add new book to system

## /books/{id}
    GET: get book by id
    PUT: update book by its id
    DELETE: delete book with id

## books/issued
    GET: get all issued book

## /books/issued/withFine
    GET: get all issued book with fine amount

## Subscription Types
    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium ( 12 months)

 > > if users missed renewal date , then user should be collected with $100
 > > if users missed subscription date , then user should be expected to pay $100
 > > if users missed both renewal & subscription date , then user should be collected with $200

# commands:
    npm init
    npm i express
    npm i nodemon --save-dev