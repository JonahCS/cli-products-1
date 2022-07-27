// take details of new Product (as a JS object), turn them into a string, then append that string to our db.txt file
import { readDatabase } from '../data/import_db.js';
import fs from 'fs';
let products = readDatabase("./data/db.txt");
let highest_id = readDatabase("./data/highest_id.txt");

export function createProduct(newProduct) {
   // find the next available id
  
  // let nextId = products?(products.length + 1): 1;
   products.sort((a,b) => {
   return a.id - b.id;
   })
  
   let nextId = products?((products[products.length -1].id)+ 1): 1;
   //let nextId = products?(Number(highest_id )+ 1): 1;
   newProduct.id= nextId;    
   
   
 //update highest_id.txt 
 fs.writeFile('./data/highest_id.txt',JSON.stringify(newProduct.id),(err) => {
    if(err)
    console.log(err);
    else {
        console.log("The updated highest ID is : "+ fs.readFileSync('./data/highest_id.txt',"utf8"));
        //console.log(fs.readFileSync('./data/highest_id.txt',"utf8"))
    }

 })
   
 // append new product to db.txt
 fs.appendFile('./data/db.txt',JSON.stringify(newProduct)+"\n", null, function() {});
}