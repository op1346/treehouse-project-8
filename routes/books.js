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

//shows full list of books
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["title", "ASC"]]});
  res.render('books/index', {books, title: "Books"});
}));

//shows the create new book form
router.get('/new', asyncHandler(async(req, res) => {
  res.render('books/new-book', {book: {}, title: "New Book"});
}));

//posts a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('books/' + book.id);
}));

//shows book detail form
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('books/update-book', {book, title: book.title});
}));

//updates book info
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('books/' + book.id);
}));

//deletes a book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.render('books/');
}));

module.exports = router;