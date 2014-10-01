/* global mmcore, $ */

(function() {
    'use strict';

    /**
     * Set Action snippet (c) Dyachenko
     * @param actionName
     * @param actionValue
     * @param actionAttr
     * @constructor
     */
    function SetAction(actionName, actionValue, actionAttr) {
        this.actionName = actionName;
        this.actionValue = actionValue;
        this.actionAttr = actionAttr || false;
    }

    SetAction.prototype.deffered = function() {
        mmcore.$Action(this.actionName, this.actionValue, this.actionAttr);
    };
    SetAction.prototype.push = function() {
        if (Object.prototype.toString.call(this.actionAttr) === '[object Array]') {
            for (var i = 0; i < this.actionAttr.length; i++) {
                mmcore.SetAction(this.actionName, this.actionValue, this.actionAttr[i]);
            }
        } else {
            mmcore.SetAction(this.actionName, this.actionValue, this.actionAttr);
        }
        mmcore._async = true;
        mmcore.SetPageID('event');
        mmcore.CGRequest();
    };

    /* Track Action */
    new SetAction('T14_Clickthrough', 1).push();

    /* Track Deffered Action */
    new SetAction('T14_Edit_Cover', 1, 'attr').deffered();

})();