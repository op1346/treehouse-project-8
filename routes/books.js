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
router.get()

//GET book listing
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("/index", {books, title: "SQL Library Manager"});
}));

//Create a new Book form
router.get('/new', (req, res) => {
  res.render("/books/new-book", { book: {}, title: "New Book"});
});

//POST create Book
router.post('/new', asyncHandler(async (req, res)=> {
  const book = await Book.create();
  res.redirect("/books/" + article.id);
}));

//GET individual Book detail
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/", {book, title: book.title});
}));

//Updates book
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books/" + article.id);
}));

//Delete book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books");
}));

module.exports = router;