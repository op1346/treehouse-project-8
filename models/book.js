'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    //title and author will always have values
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "title"'
        },
      },
    },
    author: {
     type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "author"'
        },
      },
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, {sequelize});
  return Book;
};