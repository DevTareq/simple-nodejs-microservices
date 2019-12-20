const mongoose = require("mongoose");

mongoose.model("customer", {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: false
    }
});