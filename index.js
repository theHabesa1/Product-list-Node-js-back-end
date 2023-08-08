const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./logger')
const product = require('./routes/products')


app.set("view engine","pug")
app.set('views', './views')


// app.use(logger);
app.use(express.json());
app.use(express.static('public'));

const products = [
  { id: 1, name: "Keychain" },
  { id: 2, name: "Puzzle" },
  { id: 3, name: "Laptop stands" },
];

app.get('/api/v1/products', (req, res) => {
    res.render('index',{title:"My express app", message:"Hello"});
  });
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});



app.listen(8080, () => {
  console.log("listening to port 8080");
});
