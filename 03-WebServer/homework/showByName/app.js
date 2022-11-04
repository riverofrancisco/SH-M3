const { Console } = require("console");
var fs  = require("fs")
var http  = require("http");
const { url } = require("inspector");

/* let images = {};
var filenames = fs.readdirSync(__dirname + '/images');
let promises = filenames.map((file)=> {
    return new Promise((resolve, reject)=> {
        fs.readdir('/images', (err, data) => {
            if (err) {return reject(err)};
            return resolve(data)
        })
    })
}) */
// Escribí acá tu servidor


var filenames = ['arcoiris', 'badboy', 'code', 'resaca', 'retrato', 'sexy'].map(function (n) {
    return n + '_doge.jpg';
  });

console.log(filenames); //para chequear

var urlnames = filenames.map(file => {
    let url = file.split('.').shift()
    return url
})

console.log(urlnames);//para chequear



http.createServer(function(req,res) {
  console.log('URL', req.url); 
  let counter = 0; 
    if(req.url === '/' + urlnames[counter]){
            res.writeHead(200, {'Content-Type': 'image/jpg' })
            //buscar imagen y guardarla -> 
            //buscar
            const filename = './images/' + filenames[counter]; 
            fs.readFile(filename, (err, data) => {
                    if (err) {res.end('File not found.')}
                    else {return res.end(data)};
            });
    }//0
 
 /*    if (req.url === '/' + urlnames[counter+1]){
        res.writeHead(200, {'Content-Type': 'image/jpg' })
        //buscar imagen y guardarla -> 
        //buscar
        const filename = './images/' + filenames[counter]; 
        fs.readFile(filename, (err, data) => {
                if (err) {res.end('File not found.')}
                else {return res.end(data)};
        });
    }//1
    counter++;
    if (req.url === '/' + urlnames[counter]){
        res.writeHead(200, {'Content-Type': 'image/jpg' })
        //buscar imagen y guardarla -> 
        //buscar
        const filename = './images/' + filenames[counter];
        fs.readFile(filename, (err, data) => {
                if (err) {res.end('File not found.')}
                else {return res.end(data)};
        });
    }//2
    counter++;
    if (req.url === '/' + urlnames[counter]){
        res.writeHead(200, {'Content-Type': 'image/jpg' })
        //buscar imagen y guardarla -> 
        //buscar
        const filename = './images/' + filenames[counter];
        counter++; 
        fs.readFile(filename, (err, data) => {
                if (err) {res.end('File not found.')}
                else {return res.end(data)};
        });
    }//3
    counter++;
    if (req.url === '/' + urlnames[counter]){
        res.writeHead(200, {'Content-Type': 'image/jpg' })
        //buscar imagen y guardarla -> 
        //buscar
        const filename = './images/' + filenames[counter];
        fs.readFile(filename, (err, data) => {
                if (err) {res.end('File not found.')}
                else {return res.end(data)};
        });
    }//4
    counter++;
    if (req.url === '/' + urlnames[counter]){
        res.writeHead(200, {'Content-Type': 'image/jpg' })
        //buscar imagen y guardarla -> 
        //buscar
        const filename = './images/' + filenames[counter];
        fs.readFile(filename, (err, data) => {
                if (err) {res.end('File not found.')}
                else {return res.end(data)};
        });
    }//5
    counter++;
    if (req.url === '/' + urlnames[counter]){
        res.writeHead(200, {'Content-Type': 'image/jpg' })
        //buscar imagen y guardarla -> 
        //buscar
        const filename = './images/' + filenames[counter];
        fs.readFile(filename, (err, data) => {
                if (err) {res.end('File not found.')}
                else {return res.end(data)};
        });
    }//6
   */
  else {   
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File not found.');
  }
}).listen(1337,'127.0.0.1', ()=> {console.log('listening port 1337')});