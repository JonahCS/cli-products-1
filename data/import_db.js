import {readFileSync, promises as fsPromises} from 'fs';
// const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
export function readDatabase(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/); 
  let newArray = [];

  for(let i = 0; i < arr.length; i++) {
    try {
      const obj = JSON.parse(arr[i]);
      newArray.push(obj);
    }
    catch(e) {
      
    }

  }

  return newArray;
}