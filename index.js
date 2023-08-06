const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const products = [
  { id: 1, name: "Keychain" },
  { id: 2, name: "Puzzle" },
  { id: 3, name: "Laptop stands" },
];

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

app.get('/api/v1/products', (req, res) => {
  res.send(products);
});

app.post('/api/v1/products', (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const product = {
    id: products.length + 1,
    name: req.body.name
  };
  products.push(product);
  res.send(product);
});

app.get('/api/v1/products/:id', (req, res) => {
  const { error } = idParamSchema.validate(req.params);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) res.status(404).send("Product was not found");
  res.send(product);
});

app.put('/api/v1/products/:id', (req, res) => {
  const { error: paramError } = idParamSchema.validate(req.params);
  const { error: bodyError } = productSchema.validate(req.body);

  if (paramError || bodyError) {
    return res.status(400).send(paramError ? paramError.details[0].message : bodyError.details[0].message);
  }

  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) res.status(404).send("Product was not found");
  res.send(product);
});

app.delete('/api/v1/products/:id', (req, res) => {
    const { error } = idParamSchema.validate(req.params);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex === -1) {
      return res.status(404).send("Product was not found");
    }
  
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.send(deletedProduct);
  });
  

app.listen(8080, () => {
  console.log("listening to port 8080");
});
