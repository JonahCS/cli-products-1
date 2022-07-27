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

import { createProduct } from './operations/create.js';
import { getProductById, getAllProducts } from "./operations/read.js";
import { updateProductById } from './operations/update.js';
import { removeProductById } from './operations/delete.js';

prompt.start();

console.log("\nPick from the following operations:");
console.log("A: List All products");
console.log("I: Find product by id")
console.log("D: Delete product by ID");
console.log("C: Create a new product");
console.log("U: Update product")

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
      prompt.get(['price', 'sku', 'name', 'quantity', 'description'], function (err, result) {
        let product = {
               
               price : Number(result.price),
               sku : Number(result.sku),
               name : result.name,
               quantity : Number(result.quantity),
               description:result.description
           // use the user input to create this new Product object that we are going to pass into the createProduct()
      };

        var result = createProduct(product);
        console.log("\nThe newly created product is: ")
        console.log(product);
      });
      break;
    
    case "U":
    prompt.get(['idd'], function (err, result) {
      
      updateProductById(result.idd);
      
    });
    break;
 
  }
});

