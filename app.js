/*
purpose of our application:
Allow a user to create, read, edit and delete products from a collection of products
We will prompt a user for the desired operation, and then perform it

what "concerns" will we have?

1. Data access 
2. UI concerns (prompting user for input; presenting output)
3. Create/Edit/Delete data


*/
import { createRequire } from 'module'
const require = createRequire(import.meta.url);


var prompt = require('prompt');

import { getProductById, getAllProducts } from "./operations/read.js";
import { removeProductById } from './operations/delete.js';
import { createProduct } from './operations/create.js';

let fake = {
  price: 500,
  sku: 66554,
  name: "Widget",
  quantity: 5000,
  description: "Purple widget; all the kids will love them",
  id: 6
}

prompt.start();

console.log("Pick from the following operations:");
console.log("A: list all products");
console.log("I: find product by id")
console.log("D: delete product by ID");
console.log("C: create a new product");

prompt.get(['operation'], function (err, result) {
  switch(result.operation) {
    case "A":
      console.log(getAllProducts())
      break;
    case "I":
      prompt.get(['id'], function (err, result) {
        var product = getProductById(result.id);
        console.log(product);
      });
      break;
    case "D":
      prompt.get(['id'], function (err, result) {
        var product = removeProductById(result.id);
        console.log(product);
      });
      break;
    case "C":
      prompt.get(['id', 'price', 'sku', 'name', 'quantity', 'description'], function (err, result) {
        let product = {
               id : result.id,
               price : result.price,
               sku : result.sku,
               name : result.name,
               quantity : result.quantity,
               description:result.description


          // use the user input to create this new Product object that we are going to pass into the createProduct()
        };


        var result = createProduct(product);
        console.log(product);
      });
      break;
  }
});

