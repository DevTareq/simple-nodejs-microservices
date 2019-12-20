const mongoose = require("mongoose");

mongoose.model("order", {
    customer_id: {
        type: mongoose.Schema.ObjectId,
        require: true
    }, 
    book_id: {
        type: mongoose.Schema.ObjectId,
        require: true
    }
});