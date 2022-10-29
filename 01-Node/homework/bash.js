const commands = require('./commands/index.js');

const print = function(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ')
}

process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {

    let inputArray = data.toString().trim().split(' '); //Transforms the input into an array.
    let cmd = inputArray.shift() // Takes the first word at the console as command (cmd).

  if(commands.hasOwnProperty(cmd)){
    commands[cmd](inputArray, print);//executes the cmd function 
  } else {
    commands.def();
    process.stdout.write('\nprompt > ');
  }
});