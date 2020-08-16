const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//Handler function
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      next(error);
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
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/');
  } catch(error) {
    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render('books/new-book', {book, errors: error.errors, title: 'New Book'})
    } else {
      res.render('error');
    }
  }
}));

//shows book detail form
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render('books/update-book', {book, title: book.title});
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Looks like the page that you requested doesn't exist!";
    throw err;
  }
}));

//updates book info
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/');
    } else {
      const err = new Error();
      err.status = 404;
      err.message = "Looks like the page that you requested doesn't exist!";
      throw err;
    }
  } catch(error) {
    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('books/update-book', {book, errors: error.errors, title:'Edit Book'})
    } else {
      throw error;
    }
  }
}));

//deletes a book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
}));

module.exports = router;