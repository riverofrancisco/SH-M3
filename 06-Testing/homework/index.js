const express = require('express');
/* const { arrayReplaceAt } = require('markdown-it/lib/common/utils'); */
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test/', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/product', (req, res) => {
  const {a, b} = req.body;
  if(typeof a !== 'number' || typeof b !== 'number') {return res.sendStatus(400)};
  return res.send({
    result: a * b,
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
 const {array, num} = req.body;
 let i = 0;
 let k = 1;
 while(i < array.length){
    while(k < array.length){
      if(array[i] !== array[k]){
        if(array[i] + array[k] === parseInt(num)){
          return res.send({
              result: true
          });}
      } k++;
    } i++;
      k = i+1;
};
return res.send({
  result: false
})
})

app.post('/numString', (req,res)=> {
  const {value} = req.body;
  if(typeof value === 'string' && value.length > 0){
    return res
    .status(200)
    .send({result: value.length})
  }
  res.sendStatus(400)
})

app.post('/pluck', (req,res)=> {
  const {array, property} = req.body;
  if(!Array.isArray(array) || property.length === 0) return res.sendStatus(400);
  else{
    let resultarray = array.map(obj => {return obj[property]})
    return res
    .send({result: resultarray})
  }
})



module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
