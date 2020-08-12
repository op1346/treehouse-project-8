'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {

  }
  Book.init({
    //title and author will always have values
    title: {
      Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"'
        },
      },
    },
    author: {
      Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "author"'
        },
      },
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, {sequelize});
  return Book;
}