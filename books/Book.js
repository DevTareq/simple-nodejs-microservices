const mongoose = require("mongoose");

// is a model is a reference to a collection 
mongoose.model('Book', {
    title: {
        type: String,
        require: true
    }, 
    author: {
        type: String,
        require: true
    }, 
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
});