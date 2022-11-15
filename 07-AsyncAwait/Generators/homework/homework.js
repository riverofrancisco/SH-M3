function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let number = 1;
  while(number <= max || !max) {
        let returnedMessage = [];
        
        if(number % 3 !== 0 && number % 5 !== 0) yield number;
        
        if(number % 3 === 0){
          returnedMessage.push('Fizz')}
        
        if(number % 5 === 0){
          returnedMessage.push('Buzz')}
        
        if(returnedMessage.length > 0){
          yield returnedMessage.join(' ')
        };
        
        number = number + 1;
  }

}
let a = fizzBuzzGenerator(100)

console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())

module.exports = fizzBuzzGenerator;
