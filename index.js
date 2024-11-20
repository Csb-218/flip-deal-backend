const express = require('express');
const { resolve } = require('path');

const app = express();
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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
