// T124.
(function(prefix) {
  'use strict';
  if (typeof mmcore[prefix] === 'undefined') return;
  var Campaign = mmcore[prefix].Campaign;
  var utils = mmcore[prefix].utils;
  
  var campaign = new Campaign('T124_Loans_CalculatorProminence', ['T124A_Calc'], prefix);
  var testArea = 'main > .portlet-layout:first-child';

  if (!campaign.hasNonDefaultExperience()) {
    return;
  }

  createFunctionality();

  campaign.hideContent('body');
  utils.waitForElementArrival(testArea, {
    done: function() {
      campaign.renderMaxyboxes();
      utils.addClass(document.getElementsByTagName('body')[0], 'm' + campaign.prefix);
    },
    always: function() {
      campaign.showContent();
    },
    emergency: 5000
  });


  function createFunctionality() {
    campaign.addCalculator = function(variant) {
      var calculatorBox;
      variant = variant || '';

      addStyles();
      changeContent();
      appendIframe();

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
      function changeContent() {
        var image = document.getElementById('p_p_id_W030_Multimedia_Detail_WAR_W030_Multimedia_Detailportlet_INSTANCE_UIWWebY1I7Ko_');
        var info = document.createElement('div');
        info.innerHTML = 'With a Personal Loan, you can start turning your plans into reality. We offer loans from £1,000 to £20,000 to new and existing customers, so apply online today.';
        utils.addClass(info, 'mt124-info');
        image.parentNode.insertBefore(info, image);
      }
      function appendIframe() {
        var area = document.querySelector(testArea),
            iframeWrapper = document.createElement('div'),
            tableWrapper = document.createElement('div');
        
        iframeWrapper.innerHTML = '<iframe width="100%" height="100%" src="http://www.santander-products.co.uk/loans/personal-loans/calculator/upl/#t124-loans-calculator' + variant + '"' +
          ' id="mm_calc_iframe" scrolling="no" frameborder="no"></iframe>';
        iframeWrapper.id = 'mm_calc';
      }
    };
  }
}('t124'));