const fs = require('fs');
const request = require('request');

const pwd = (inputArray, print) => {
    print(process.cwd());
};

const date = (inputArray, print) => {
    print(Date());
};

const def = (inputArray, print) => {
    print('command not found.');
}

const ls = (inputArray, print) => {
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {//It could be done with a .join() too
          process.stdout.write(file.toString() + ' | ');
        })
        process.stdout.write("\nprompt > ");
      });
};


const echo = (inputArray, print) => {
        print(inputArray.join(' '))
}

const cat = (inputArray, print) => {
    fs.readFile(inputArray[0], 'utf8', function(err, data) {
        if (err) throw err;
        print(data);
    })
}

const head = (inputArray, print) => {
    fs.readFile(inputArray[0], 'utf8', function(err, data) {
        if (err) throw err;
        let lines = 8;
        if (inputArray[1]) lines = inputArray[1];
        print(data.split('\n').splice(0,lines).join('\n'));//divides the file for lines.

    })
}

const tail = (inputArray, print) => {
    fs.readFile(inputArray[0], 'utf8', function(err, data) {
        if (err) throw err;
        let lines = -8;
        if (inputArray[1]) lines = inputArray[1];
        print(data.split('\n').splice(-lines).join('\n'));//divides the file for lines.

    })
}

const curl = (inputArray, print) => {
    request(inputArray[0], function (err, data) {
        if(err) throw err;
        print(data.body);
    })
    }


module.exports = {
         pwd,
         date,
         def,
         ls,
         echo,
         cat,
         head,
         tail,
         curl
    };