const express     = require("express");
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
const config      = require("config");

const app        = express();
require("./customer");

const Customer = mongoose.model("customer");

mongoose.connect("mongodb://localhost:27017/customersservice", () => {
    console.log("[*] Database is connected!");
});

app.use(bodyParser.json());

/**
 * Get all customers 
 */
app.get("/customers", (req, res) => {

    Customer.find({}).then((customers) => {
        res.send(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

/**
 * Get customer by id
 */
app.get("/customers/:id", (req, res) => {

    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.send(customer);
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
 * Add new customer
 */
app.post("/customers", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

    var customer = new Customer(newCustomer);

    customer.save().then((newCustomer) => {
        res.send(newCustomer);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    
});

/**
 * Delete customer by id
 */
app.delete("/customers/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.it).then(() => {
        req.send("Customer deleted!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.listen(config.get('server.port'), () => {
    console.log("[*] Server is up -- Customers Service on port " + config.get('server.port'));
});
