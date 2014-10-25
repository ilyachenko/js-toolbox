// Inheritance

function Vehicle() {}

Vehicle.prototype.drive = function() {
    console.log('ррррр…');
}

function Car() {}

Car.prototype = new Vehicle();

Car.prototype.honk = function() {
    console.log('би-би');
}

var myCar = new Car();

myCar.honk(); // выведет «би-би»
myCar.drive(); // выведет «ррррр…»


// ------------------------
// Inheritance by Crockford
// ------------------------
console.log('------Inheritance by Crockford------');

Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var vehicle = {};

vehicle.drive = function() {
    console.log('ррррр…');
}

var car = Object.create(vehicle);

car.honk = function() {
    console.log('би-би');
}

var myCar1 = Object.create(car);
var myCar2 = Object.create(car);

myCar1.honk(); // выводит «би-би»
myCar1.drive(); // выводит «ррррр…»