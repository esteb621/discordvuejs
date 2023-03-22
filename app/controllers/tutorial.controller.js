const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    db.tutorials.create({})
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    db.tutorials.find( {} )
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    db.tutorials.find( {} )

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};