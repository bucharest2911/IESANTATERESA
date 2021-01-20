var Gpio = require('onoff').Gpio,
    led = new Gpio(17, 'out');

var myVar;
led.writeSync(1); 
myFunction();

function myFunction() {
  myVar = setTimeout(encender, 3000);
}

function encender() {
    console.log("ffa1")
  led.writeSync(0); 
  led.unexport();
  myVar = setTimeout(apagar, 3000);
  
}

function apagar() {
    console.log("ffa2")
    var Gpio = require('onoff').Gpio,
    led = new Gpio(17, 'out');
  led.writeSync(1); 
}

