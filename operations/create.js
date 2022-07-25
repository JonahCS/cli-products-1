// take details of new Product (as a JS object), turn them into a string, then append that string to our db.txt file
import { readDatabase } from '../data/import_db.js';
import fs from 'fs';
let products = readDatabase("./data/db.txt");


export function createProduct(newProduct) {
   // find the next available id
  
   let nextId = products?(products.length + 1): 1;
  
   newProduct.id= nextId;    
 
 //update highest_id.txt 
 fs.writeFile('./data/highest_id.txt',JSON.stringify(newProduct.id),(err) => {
    if(err)
    console.log(err);
    else {
        console.log("File written successfully\n","The updated highest ID is : "+ fs.readFileSync('./data/highest_id.txt',"utf8"));
        //console.log(fs.readFileSync('./data/highest_id.txt',"utf8"))
    }

 })
   
 // append new product to db.txt
 fs.appendFile('./data/db.txt', "\n" + JSON.stringify(newProduct), null, function() {});
}