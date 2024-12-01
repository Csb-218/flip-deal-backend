const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

// products (data)
const products = require('./data');

// util functions
const { capitalizeFirstLetter } = require('./utils');

const app = express();
app.use(cors())
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('index');
});



// API ENDPOINT 1
// http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0

app.get('/cart-total', (req,res) =>{
   const {newItemPrice,cartTotal} = req.query
   let totalCartPrice = parseFloat(newItemPrice)*1
   res.send(totalCartPrice.toString())
})

// API ENDPOINT 2
// http://localhost:3000/membership-discount?cartTotal=3600&isMember=true

app.get('/membership-discount', (req,res) =>{
  const {isMember,cartTotal} = req.query
  let totalCartPrice = Boolean(isMember) === true ? parseFloat(cartTotal)*0.90 : parseFloat(cartTotal)
  res.send(totalCartPrice.toString())
})

// API ENDPOINT 3
// http://localhost:3000/calculate-tax?cartTotal=3600

app.get('/calculate-tax', (req,res) =>{
  const {cartTotal} = req.query
  let totalCartPrice = cartTotal*0.05
  res.send(totalCartPrice.toString())
})

// API ENDPOINT 4
// http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600


app.get('/estimate-delivery', (req,res) =>{
  const {shippingMethod,distance} = req.query
  let days ;
  if(shippingMethod === 'express'){
      days = parseFloat(distance)/100;
  }else{
     days =  parseFloat(distance)/50;
  }
  
  res.send(days.toString())
})

//  API ENDPOINT 5
// http://localhost:3000/shipping-cost?weight=2&distance=600

app.get('/shipping-cost', (req,res) =>{
  const {weight,distance} = req.query
  let shippingCost = parseFloat(weight) * parseFloat(distance) * 0.1 ;
  res.send(shippingCost.toString())
})

// API ENDPOINT 6
// http://localhost:3000/loyalty-points?purchaseAmount=3600

app.get('/loyalty-points', (req,res) =>{
  const {purchaseAmount} = req.query
  let loyaltyPoints = parseFloat(purchaseAmount)/2;
  res.send(loyaltyPoints.toString())
})

// Endpoint 7: Get the products sorted by popularity
// <http://localhost:3000/products/sort/popularity>

app.get('/products/sort/popularity', (req, res) => {
  try {
    let sortedProducts = products.sort(
      (product1, product2) => product2.rating - product1.rating
    );

    res.status(200).json({
      products: sortedProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 8:Get the products sorted by “high-to-low” price
// <http://localhost:3000/products/sort/price-high-to-low>

app.get('/products/sort/price-high-to-low', (req, res) => {
  try {
    let sortedProducts = products.sort(
      (product1, product2) => product2.price - product1.price
    );

    res.status(200).json({
      products: sortedProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 9: Get the products sorted by “low-to-high” price
// <http://localhost:3000/products/sort/price-low-to-high>

app.get('/products/sort/price-high-to-low', (req, res) => {
  try {
    let sortedProducts = products.sort(
      (product1, product2) => product1.price - product2.price
    );

    res.status(200).json({
      products: sortedProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 10: Filter the products based on the “RAM” option.
// <http://localhost:3000/products/filter/ram?ram=8>

app.get('/products/filter/ram', (req, res) => {
  const { ram } = req.query;

  try {
    const filteredByRam = products.filter((product) => product.ram === ram);

    res.status(200).json({
      products: filteredByRam,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 11: Filter the products based on the “ROM” option.
// <http://localhost:3000/products/filter/rom?rom=64>

app.get('/products/filter/rom', (req, res) => {
  const { rom } = req.query;

  try {
    const filteredByRom = products.filter((product) => product.rom === rom);

    res.status(200).json({
      products: filteredByRom,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 12: Filter the products based on the “Brand” option.
// <http://localhost:3000/products/filter/brand?brand=apple>

app.get('/products/filter/brand', (req, res) => {
  const { brand } = req.query;

  try {
    const filteredByBrand = products.filter(
      (product) => product.brand === capitalizeFirstLetter(brand)
    );

    res.status(200).json({
      products: filteredByBrand,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 13: Filter the products based on the “OS” option.
// <http://localhost:3000/products/filter/os?os=Android>

app.get('/products/filter/os', (req, res) => {
  const { os } = req.query;

  try {
    const filteredByOs = products.filter(
      (product) => product.os === capitalizeFirstLetter(os)
    );

    res.status(200).json({
      products: filteredByOs,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 14: Filter the products based on the “Price” option.
// <http://localhost:3000/products/filter/price?price=30000>

app.get('/products/filter/price', (req, res) => {
  const { price } = req.query;

  try {
    const filteredByPrice = products.filter(
      (product) => product.price <= parseFloat(price)
    );

    res.status(200).json({
      products: filteredByPrice,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 15 : Send original array of products
// <http://localhost:3000/products>

app.get('/products', (req, res) => {
  try {
    res.status(200).json({
      products: products,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err,
    });
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
