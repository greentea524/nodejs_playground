var fs = require('fs');
var rs = fs.createReadStream('./demofile.html');
rs.on('open', function () {
  console.log('The file ./demofile.html is open');
});
// var rs = fs.createReadStream('./demofile.text');
// rs.on('open', function () {
//   console.log('The file is open');
// });
var filename = './demofile.txt';
fs.readFile(filename, function(err, data) {
    if (err) {
        console.log('404: File '+filename+' not found');
    }else{
        console.log('The file '+filename+' is open');
    }

});

var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');
