(function () {
    'use strict';

    var DependencyManager = function () {
        this.requiredClasses = {};
        this.requiredCb = {};
    };

    DependencyManager.prototype.waitForAllDependenciesInClasses = function (arr) {
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
            dm.requiredCb[arr.toString()].apply(null, array);
        }
    };

    var dm = new DependencyManager();

    window.define = function (name, arr, cb) {

        //if (arr.length === 0) {
            if (typeof dm.requiredClasses[name] === "undefined") {
                dm.requiredClasses[name] = cb();
            }
        //}
//        else {
//            var myVar = setInterval(function () {
//                myTimer(arr, cb);
//            }, 1000);
//        }
//
//        function myTimer(arr, cb) {
//            var array = [];
//            for (var i = 0; i < arr.length; i++) {
//                debugger
//                var currentKey = arr[i];
//                if (typeof dm.requiredClasses[currentKey] === "undefined") {
//                    return;
//                }
//                array.push(dm.requiredClasses[currentKey]);
//            }
//            clearInterval(myVar);
//            dm.requiredCb[arr.toString()].apply(null, array);
//        }
    };

    window.require = function (arr, cb) {
        dm.requiredCb[arr.toString()] = cb;

        for (var i = 0; i < arr.length; i++) {
            var s = document.createElement('script');
            s.src = arr[i] + ".js";
            s.type = 'text/javascript';
            try {
                document.head.appendChild(s);
            }
            catch (e) {

            }
        }
        dm.waitForAllDependenciesInClasses(arr);
    };
})();