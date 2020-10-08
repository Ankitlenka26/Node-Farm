const http = require('http'); // it gives us networking capability by building a http server
const fs = require('fs'); // importing modules to the code
const url = require('url');

const slugify = require('slugify'); // slug is basically the last part of the URL that contains the unique string that identifies the resource which the website is displayng

/// own module imports
const replaceTemplate = require('./modules/replaceTemplate');
// by requiring modules we get access to the data and functions of that module inside our code
// SERVER
// All kind of node modules can be found in node.js docs
///////////////////////////////////////////////////////////////////////////////
// const server = http.createServer((req,res)=>{  // creating the server
//    console.log(req); // we will see what does the req object contains
//    res.end('Hello from the Server!!'); // response from the server
// });

// // listening to the client
// server.listen(8000,'127.0.0.1' ,()=>{  // (port,host,callback function)
//    console.log('Listening to requests on port 8000');
// });

////////////////////////////////////////////////////////////////////
// // blocking , synchronous way writing of code
// const fs = require("fs");
// const textIn = fs.readFileSync("./txt/input.txt" , "utf-8");
// utf-8 specifies the character encoding that we want , if we don't specify it the default character is something called the buffer
// console.log(textIn);
// const textout = `this is what we know about the avocardo: ${textIn}.\n created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt" , textout);
// console.log("file Written!");

// // non-blocking , asyncronous way of writing the code
// in node.js there is only just a single thread , a thread is where our code is being executed , now if we use blocking or synchronous code it will
// execute the code one by one .. so we use asynchronous functions , callback fnctions to make the code non blocking
// //the third argument is the callback function triggered and will now work asynchronously .
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => /// this code right here is reading files asynchromously and the callback function is returning what has been reqad by it
//    {
//       if (err) {
//          throw err;
//       }
//       console.log(data);
//    });
// console.log("will read file!"); // we have first seen the will read file statement beacause the work on reading file is being done asynchronously

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => /// this code right here is reading files asynchromously and the callback function is returning what has been reqad by it
//    {
//       console.log(data1);
//       fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => /// this code right here is reading files asynchromously and the callback function is returning what has been reqad by it
//          {
//             console.log(data2);
//             fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//                console.log(data3);
//                fs.writeFile("./txt/final.txt", `${data1}/n${data2}`, "utf-8", (err) => {
//                   console.log("your file has been written!");
//                });
//             });
//          });
//    });
// console.log("will read file!");

/*
const server = http.createServer((req, res) => {
   console.log(req.url);
   const pathName = req.url;
   if (pathName === '/overview') {
      res.end('This is the Overview');
   } else if (pathName === '/product') {
      res.end('this is the product page');
   }
   else{
      res.writeHead(404 , {
         'Content-type' : 'text/html' 
      }); 
      res.end('<h1>This Page cannot be found</h1>'); // response that is sent back
   }
   // res.end('Hello From the Server!!');
})


server.listen(8000, '127.0.0.1', () => {
   console.log('Listening to requests on port 8000');
});
console.log(server);
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROUTING :
// synchronous version of readfile
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data); // it will turn the data into a javascript object

const slugs = productData.map((el) =>
  slugify(el.productName, {
    lower: true,
  })
);
console.log(slugs);
const server = http.createServer((req, res) => {
  // creating the server
  //console.log(req.url); // we will see what does the req object contains
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = productData.map((el) => replaceTemplate(templateCard, el)).join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
    // Product Page
  } else if (pathname === '/product') {
    // console.log(query);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = productData[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);

    // API
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'appplication/json',
    });
    res.end(data);
    // res.end('API');

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>This page cannot be found</h1>');
  }
  // res.end('Hello from the Server!!'); // response from the server
});

// listening to the client
server.listen(8000, '127.0.0.1', () => {
  // (port,host,callback function)
  console.log('Listening to requests on port 8000 happily');
});

// when we are loading the website the browser automatically requests for the website's favicon

//////////////////////////////NPM///////////////////
// two types of packages that we can install are simple dependencies or development dependencies
// simple or regular dependencies are simply packages that contains some code that we will include on our own code
// for ex - npm install slugify
// development dependencies that are just tools for develop . our code is not dependent on them
// for ex - npm install nodemon --save-dev (--save-dev) is used to specify that it is a development dependency
