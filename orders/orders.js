const express     = require("express");
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
const config      = require('config');

const app = express();
require("./order");
var Order = mongoose.model("order");

mongoose.connect("mongodb://localhost:27017/ordersservice", () => {
    console.log("[*] Database is connected!");
});

app.use(bodyParser.json());

/**
 * Get all orders 
 */
app.get("/orders", (req, res) => {
    Order.find({}).then((orders) => {
        
        res.send(orders);

    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

/**
 * Get order by id 
 */
app.get("/orders/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        
        if (!order) {
            res.sendStatus(404);
        } else {
            res.send(order);
        }

    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

/**
 * Add new order
 */
app.post("/orders", (req, res) => {
    var newOrder = {
        customer_id: mongoose.Types.ObjectId(req.body.customer_id),
        book_id: mongoose.Types.ObjectId(req.body.book_id),
    };
    
    var order = new Order(newOrder);

    order.save().then((newOrder) => {

        res.send(newOrder);

    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

/**
 * Delete order
 */
app.delete("/orders/:id", (req, res) => {

    Order.findByIdAndDelete(req.params.id).then((order) => {
        
        if (!order) {
            res.sendStatus(400);
        } else {
            res.send("Order Deleted!");
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});



app.listen(config.get('server.port'), () => {
    console.log("[*] Server up and runnig - Orders service on posrt " + config.get('server.port'));
});


