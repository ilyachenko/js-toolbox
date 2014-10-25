/*global console: false, require: false, module */

(function () {
    'use strict';

    module.exports = {
        foo: function () {
            this.bar('FOO');
        },
        bar: function (arg) {
            console.log(arg);
        }
    };

})();

