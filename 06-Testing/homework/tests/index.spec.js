const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').send({a: 1, b: 2}).expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').send({a: 2, b: 3}).expect(200));
    it('responds with 400 if nothing is sent', () => agent.post('/product').expect(400));
    it('responds with 400 if "a" or "b" are not a number', () => agent.post('/product').send({a: 'ajchba', b: 3}).expect(400)); 
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 0, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(0);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [], num: 0}).expect(200));
    it('responds with and object with result `true`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    it('Devuelve "false" si no se puede hacer la suma', () => 
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 4})
        .then((res) => {
              expect(res.body.result).toEqual(false)}))
    it('No debe sumar dos veces el mismo numero', () => 
      agent.post('/sumArray')
        .send({array: [2,5,7,7], num: 14})
        .then((res) => {
              expect(res.body.result).toEqual(false)}))
  
    it('No debe sumar dos veces el mismo elemento del array', () => 
    agent.post('/sumArray')
      .send({array: [2,5,9,10,32], num: 18})
      .then((res) => {
            expect(res.body.result).toEqual(false)}))
    });

  describe('POST /numString', ()=> {
    it('responds with 200', ()=> agent.post('/numString').send({value: 'string'}).expect(200));
    it('responds 4 when it sends "hola".', ()=> {
      agent.post('/numString')
      .send({value: 'hola'})
      .then((res)=> expect(res.body.result).toBe(4))});
    it('Sent status 400 if the string sent is a number', ()=> agent.post('/numString').send({value: 14}).expect(400));
    it('Sent status 400 if the string is empty', ()=> agent.post('/numString').send({value: ''}).expect(400))
    it('Sent status 400 if the string sent is boolean', ()=> agent.post('/numString').send({value: false}).expect(400));
    it('Sent status 400 if the string is function', ()=> agent.post('/numString').send({value: ()=>{}}).expect(400))
    
  })


  describe('POST /pluck', ()=> {
    it('responds with 200', ()=> agent.post('/pluck').send({array: [], property: 'property'}).expect(200));
    it('Send status 400 if array is not an array', ()=> 
    agent.post('/numString')
    .send({array: 5, property: 'queso'})
    .expect(400));
    it('Send status 400 if the porperty is empty', ()=> 
    agent.post('/numString')
    .send({
            array: [{queso: 'Cheddar'},{queso: 'Dambo'},{queso: 'Parmesano'}], 
            property: ''
          })
    .expect(400)
    )
    it('responds array with the values includes into property sent by argument', ()=> {
      agent.post('/pluck')
      .send({array: [{queso: 'Cheddar'},{queso: 'Dambo'},{queso: 'Parmesano'}], property : 'queso'})
      .then((res)=> expect(res.body.result).toEqual(['Cheddar', 'Dambo', 'Parmesano']))});

  });

});

