(function(){
    'use strict';

    var DependencyManager = function(){
        this.classes = {};
        this.addClasses = function(newClass, cb){
            this.classes[newClass] = cb;
        };
    };

    DependencyManager.prototype.getClasses = function(arr){
        var bodyArr = [];
        for(var i=0;i<arr.length;i++){
            var name = arr[i];
            if (this.classes[name]){
                bodyArr.push(this.classes[name]());
            }
        }
        return bodyArr;
    };

    var dm = new DependencyManager();
    window.define = function(name, arr, cb){
        dm.addClasses(name, cb);
    };

    window.require = function(arr, cb){
        var bodyArr = dm.getClasses(arr);
        cb.apply(null, bodyArr);
    };

})();