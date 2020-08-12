const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//Handler function
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}

//Home route redirect to books route

//GET book listing
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("/index", {books, title: "SQL Library Manager"});
}));

//Create a new Book form
router.get('/new', (req, res) => {
  res.render("/new-book", { book: {}, title: "New Book"});
});

//POST create Book
router.post('/', asyncHandler(async (req, res)=> {
  const book = await Book.create();
  res.redirect("/")
}))

//GET individual Book detail

//Updates book

//Delete book

module.exports = router;