/*global console: false, require: false */

(function () {
    'use strict';

    var Q = require('q');

    function getData(arg) {
        var deferred = Q.defer();
        setTimeout(function(){
            console.log(arg);
            deferred.resolve(arg + '123');
        }, Math.random() * 1000);
        return deferred.promise;
    }

    function saveToFile(arg) {
        var deferred = Q.defer();
        setTimeout(function(){
            console.log(arg);
            deferred.resolve(arg + '.txt');
        }, Math.random() * 1000);
        return deferred.promise;
    }

    var allPromise = Q.all([ getData('ABC').then(saveToFile), getData('XYZ').then(saveToFile) ]);
    allPromise.then(function (arg) {
        console.log(arg + ' was saved!');
    });

})();

