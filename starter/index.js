const hello = "hello world!" ;
console.log(hello);
/// blocking , synchronous way writing of code 
const fs  = require("fs"); 
const textin = fs.readFileSync("./txt/input.txt" , "utf-8"); 
console.log(textin); 
const textout = `this is what we know about the avocardo: ${textin}\n created on ${Date.now()}`; 
fs.writeFileSync("./txt/output.txt" , textout); 
console.log("file Written!"); 
/// non-blocking , asyncronous way of writing the code 
fs.readFile("./txt/start.txt", "utf-8" , (err,data)=>               /// this code right here is reading files asynchromously and the callback function is returning what has been reqad by it 
{
   console.log(data);
});
console.log("will real file!");  // we have first seen the will read file statement beacause the work on reading file is being done asynchronously

fs.readFile("./txt/start.txt", "utf-8" , (err,data1)=>               /// this code right here is reading files asynchromously and the callback function is returning what has been reqad by it 
{
fs.readFile(`./txt/${data1}.txt`, "utf-8" , (err,data2)=>               /// this code right here is reading files asynchromously and the callback function is returning what has been reqad by it 
{
   console.log(data2);
   fs.readFile("./txt/append.txt","utf-8" , (err,data1)=>  
   {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data1}/n${data2}` ,  "utf-8", (err)=>
      {
         console.log("your file has been written!");
      });
   });
});
});
console.log("will real file!"); 

