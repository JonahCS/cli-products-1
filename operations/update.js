import { createRequire } from 'module'
const require = createRequire(import.meta.url);
var prompt = require('prompt');

import { readDatabase } from '../data/import_db.js';
import { getProductById } from './read.js';
import fs from 'fs';

var products = readDatabase("./data/db.txt");

export function updateProductById(id) {
    console.log("\nProducts Before Update");
    console.log(products);
    let product_match = false;
    let tempArray = products;

    let currentProduct = getProductById(id);
   console.log("\nDetails for the product to be updated:") 
   console.log("id: " + id);
   console.log("Price: "+ currentProduct.price);
   console.log("SKU: " + currentProduct.sku)
   console.log("Name: " + currentProduct.name)
   console.log("Quantity: " + currentProduct.quantity);
   console.log("Description: " + currentProduct.description);


    console.log("\nEnter the new product");
    prompt.get(['price', 'sku', 'name', 'quantity', 'description'], function (err, result) {
    
     let product = {
            price : (result.price == "")?currentProduct.price:Number(result.price),
            sku : (result.sku == "")?currentProduct.sku : Number(result.sku),
            name : (result.name == "")?currentProduct.name :result.name,
            quantity : (result.quantity =="") ? currentProduct.quantity : Number(result.quantity),
            description:(result.description == "")?currentProduct.description : result.description
        };
       
        
        //remove the current entry
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
            console.log("\n\nAll Products after deletion of the would-be-updated product : ")
            console.log(products);
        }
    }
    //add the updated entry
    product.id = Number(id);
    fs.appendFile('./data/db.txt', JSON.stringify(product)+"\n",null, function() {
          
          //reading the database db.txt after updated entry is appended and storing the content in products 
          products = readDatabase("./data/db.txt");
          //ordering the products by id in the products array after update
          products.sort((a,b) => {
              return a.id - b.id;
          })
          //clearing the contents of db.txt
          fs.writeFile('./data/db.txt', '', null, function() {});
         
          //ordering the products in db.txt
        for(let i = 0; i < products.length; i++) {
          // for each item convert to json string then write that string to db.txt
            let obj = JSON.stringify(products[i]);
            fs.appendFileSync('./data/db.txt',obj+"\n");
          //fs.appendFile("./data/db.txt", obj+"\n", err => {if(err) console.error(err)})
        }
        console.log("\nAll Products after update");
        console.log(products);
       
    });
});
} 





//Ordering the products after update
// fs.writeFile('./data/db.txt', '', null, function() {});
// for(let i = 1; i <= products.length; i++) {
//    for(let j = 0; j < products.length; j++) { 
//      if(i == products[j].id){
//           let obj = JSON.stringify(products[j]);
          //fs.appendFile("./data/db.txt", obj+"\n", err => {if(err) console.error(err)})
//           fs.appendFile('./data/db.txt', obj+"\n",null, function(){});
//       }
//     }
//   }
 //  console.log("\nAll Products after Ordering")
 //  products = readDatabase("./data/db.txt");
 //  console.log(products); 

   

























