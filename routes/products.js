const express = require('express')
const router = express.Router();




  
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
  
  router.get('/api/v1/products/:id', (req, res) => {
    const { error } = idParamSchema.validate(req.params);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) res.status(404).send("Product was not found");
    res.send(product);
  });
  
  router.put('/api/v1/products/:id', (req, res) => {
    const { error: paramError } = idParamSchema.validate(req.params);
    const { error: bodyError } = productSchema.validate(req.body);
  
    if (paramError || bodyError) {
      return res.status(400).send(paramError ? paramError.details[0].message : bodyError.details[0].message);
    }
  
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) res.status(404).send("Product was not found");
    res.send(product);
  });
  
  router.delete('/api/v1/products/:id', (req, res) => {
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
    

module.exports = router;