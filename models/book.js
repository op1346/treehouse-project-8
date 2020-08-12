'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {

  }
  Book.init({
    //title and author will always have values
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, {sequelize});
  return Book;
}