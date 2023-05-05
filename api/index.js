const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require("mongoose");
const app = express();

let port = 4040;
let path = '/api/test';

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('test ok');
    throw new Error('BROKEN') // Express will catch this on its own.
});

app.post('/api/transaction', async (req, res, next) => {
    try {
    const {name,description,datetime,price} = req.body;
    await mongoose.connect(process.env.MONGO_URL);
    const transaction = await Transaction.create({
        name,description,datetime,price});
    res.json(transaction);
    throw new Error("Hello Error!")
    } catch (error) { // manually catching
        next(error) // passing to default middleware error handler
    }

});

app.get('/api/transactions', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

//app.listen (4040);


app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
    console.log('http://localhost:'+port+path);
});
