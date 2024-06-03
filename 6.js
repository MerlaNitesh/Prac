const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./6book');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/books");
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("connection established");
});

// GET route to fetch all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST route to create a new book
app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// PUT route to update a book by ID
app.put("/books/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE route to delete a book by ID
app.delete("/books/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Start the server
app.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});
