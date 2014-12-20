(function () {
    'use strict';

    var DependencyManager = function () {
        this.requiredClasses = {};
    };

    DependencyManager.prototype.waitForAllDependenciesInClasses = function (arr, cb) {
        var myVar = setInterval(function () {
            myTimer();
        }, 1000);

        function myTimer() {
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                var currentKey = arr[i];
                if (typeof dm.requiredClasses[currentKey] === "undefined") {
                    return;
                }
                array.push(dm.requiredClasses[currentKey]);
            }
            clearInterval(myVar);
            cb.apply(null, array);
        }
    };

    DependencyManager.prototype.require = function (arr, cb) {
        for (var i = 0; i < arr.length; i++) {
            dm.readFile(arr[i]);
        }
        dm.waitForAllDependenciesInClasses(arr, cb);
    };

    DependencyManager.prototype.readFile = function(name){
        if(dm.requiredClasses.name) return;

        var s = document.createElement('script');
        s.src = name + ".js";
        s.type = 'text/javascript';
        try {
            document.head.appendChild(s);
        }
        catch (e) {

        }
    };

    var dm = new DependencyManager();

    window.define = function (name, arr, cb) {
        if(arr.length === 0){
            if (typeof dm.requiredClasses[name] === "undefined") {
                dm.requiredClasses[name] = cb();
            }
        }
        else {
            var array = [name].concat(arr);
            for (var i = 0; i < arr.length; i++) {
                if (!dm.requiredClasses[arr[i]]){
                    dm.readFile(arr[i]);
                }
            }

            var myVar = setInterval(function () {
                myTimer(name);
            }, 1000);

            var myTimer = function(name) {
                var array = [];
                for (var i = 0; i < arr.length; i++) {
                    var currentKey = arr[i];
                    if (typeof dm.requiredClasses[currentKey] === "undefined") {
                        return;
                    }
                    array.push(dm.requiredClasses[currentKey]);
                }
                clearInterval(myVar);

                dm.requiredClasses[name] = cb.apply(null, array);
            };

        }
    };

    window.require = dm.require;
})();