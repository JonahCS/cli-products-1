import { createRequire } from 'module'
const require = createRequire(import.meta.url);
var prompt = require('prompt');

import { readDatabase } from '../data/import_db.js';
import fs from 'fs';

let products = readDatabase("./data/db.txt");

export function updateProductById(id) {
    let product_match = false;
    let tempArray = products;
     
    // deleting the product 
    for(let i = 0; i < products.length; i++) {
        if(products[i].id == id) {
            product_match = true;
            tempArray.splice(i, 1);
            fs.writeFile('./data/db.txt', '', null, function() {});
            for(let i = 0; i < tempArray.length; i++) {
                // for each item convert to json string then write that string to db.txt
                let obj = JSON.stringify(tempArray[i]);
                fs.appendFile("./data/db.txt", obj+"\n", err => {if(err) console.error(err)})
            }
   
            products = tempArray;
           //console.log(products);
            
        }
    }
    console.log("Enter the new product");
    prompt.get(['price', 'sku', 'name', 'quantity', 'description'], function (err, result) {
    
     let product = {
            
            price : Number(result.price),
            sku : Number(result.sku),
            name : result.name,
            quantity : Number(result.quantity),
            description:result.description
        // use the user input to create this new Product object that we are going to pass into the createProduct()
   };
    product.id = id;
    fs.appendFile('./data/db.txt', JSON.stringify(product), null, function() {});
    return products;
   // console.log(product);
   });
   //products = tempArray;
   //return products;
  }

























