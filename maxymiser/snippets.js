/* global mmcore, $ */

(function() {
    'use strict';

    /**
     * Set Action snippet (c) Dyachenko
     * @class
     * @param {string} actionName
     * @param {number} actionValue
     * @param {string} [actionAttr]
     */
    var SetAction = function(actionName, actionValue, actionAttr) {
        this.actionName = actionName;
        this.actionValue = actionValue;
        this.actionAttr = actionAttr || "";
    };

    SetAction.prototype.deffered = function() {
        mmcore.$Action(this.actionName, this.actionValue, this.actionAttr);
    };
    SetAction.prototype.push = function (callback) {
        if (Object.prototype.toString.call(this.actionAttr) === '[object Array]') {
            for (var i = 0; i < this.actionAttr.length; i++) {
                mmcore.SetAction(this.actionName, this.actionValue, this.actionAttr[i]);
            }
        } else {
            mmcore.SetAction(this.actionName, this.actionValue, this.actionAttr);
        }
        mmcore._async = true;
        mmcore.SetPageID('event');
        mmcore.CGRequest(callback || {});
    };

    /* Track Action */
    new SetAction('T14_Clickthrough', 1).push();

    /* Track Deffered Action */
    new SetAction('T14_Edit_Cover', 1, 'attr').deffered();
    
    /* Track Deffered Action with array */
    new SetAction('T14_Edit_Cover', 1, ['attr1', 'attr2', 'attr3']).deffered();

})();


(function() {
    /*
    * Добавление стилей от Худика
    */
'use strict';
function addStyles() {
        var css = (function() {
          /*
          #_W022_Information_Detail_WAR_W022_Information_Detailportlet_INSTANCE_DNEizvsGu4TX__VIEW {
            display: none;
          }
          #mm_calc {
            width: 100%;
            height: 350px;
            margin: 20px 0 10px 0;
          }
          #mm_purpose_wrapper {
            position: relative;
            width: 950px;
            height: 70px;
            margin: -80px 0 0 0;
            padding: 0 0 20px 0;
          }
          #mm_applink {
            width: 149px;
            height: 53px;
            display: block;
            background: url("https://service.maxymiser.net/cm/images-eu/1/1/1/D4BDF8E0C7F57C79D4DE9CE92441E368AE4CA74386016A749A67C0EBB9E13143/santander-products-co-uk/T124-Loans-CalculatorProminence/ctaApplyNow.png") no-repeat 0 0 transparent;
            color: transparent;
            position: absolute;
            right: 0;
            top: -5px;
          }
          #mm_applink:hover {
            color: transparent;
          }
          #p_p_id_W030_Multimedia_Detail_WAR_W030_Multimedia_Detailportlet_INSTANCE_UIWWebY1I7Ko_ {
            display: none;
          }
          .mt124-info {
            font-size: 1.6em;
            font-weight: normal;
          }

          #column-3 {
            display: none;
          }
          .envolve2 {
            width: 100%;
          }
          .mt124-hidden {
            visibility: hidden;
          }

          .promo.expand {
            min-height: 0;
          }
          */
        } + '').match(/\/\*([\s\S]+)\*\//)[1];
        var style = document.createElement('style');
        var head = document.head || document.getElementsByTagName('head')[0];

        style.type = 'text/css';
        style.id = 'm' + campaign.prefix +'-styles';

        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
      }
});