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
    fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err , data) => {
        if (err) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File not found.');
        }
        else {
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(data);
        }
    })

}).listen(1337,'127.0.0.1', ()=> {console.log('listening port 1337')});