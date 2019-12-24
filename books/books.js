// load express 
const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const config     = require("config");

require("./Book");
const Book = mongoose.model("Book");

mongoose.connect("mongodb://localhost:27017/booksservice", () => {
    console.log("[*] Database is connected!");
});

var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());

/**
 * Heartbeat endpoint
 */
app.get('/heartbeat', (req, res) => {

    var status = {
        success: true,
        address: config.get("server.host"),
        port: config.get("server.port")
    };

    res.send(status);
});

/**
 * Get all books 
 */
app.get('/books', (req, res) => {
    
    var book = new Book();
    Book.find({}).then((books) => {

        res.send(books);

    }).catch((err) => {
        if (err) {
            throw err;
        } 
    });
});

/**
 * Add a new book 
 */
app.post("/books", (req, res) => {
   var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
   };

   var book  = new Book(newBook);

   book.save().then(() => {
        res.send(newBook);

   }).catch((err) => {
       if (err) {
            throw err;
       }
   });
});

/**
 * Get a book by id
 */
app.get("/books/:id", (req, res) => {

    Book.findById(req.param("id")).then((book) => {

        if (book) {
            res.send(book);      
        } else {
            res.sendStatus(404);
        }
      
    }).catch((err) => {
       if (err) {
           throw err;
       }
    });
});

/**
 * Get a book by id
 */
app.delete("/books/:id", (req, res) => {

    Book.findByIdAndDelete(req.param("id")).then((book) => {

        if (book) {
            res.send("Deleted!");      
        } else {
            res.sendStatus(400);
        }
       
    }).catch((err) => {
       if (err) {
           throw err;
       }
    });
});

app.listen(config.get('server.port'), () => {
    console.log("[*] Server is up -- Books Service on port " + config.get('server.port'));
});