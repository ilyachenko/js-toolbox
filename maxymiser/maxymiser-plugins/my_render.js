/* global mmcore */

(function (prefix) {
    'use strict';
    if (typeof mmcore[prefix] === 'undefined') {
        return;
    }
    var Campaign = mmcore[prefix].Campaign;
    var utils = mmcore[prefix].utils;

    var campaign = new Campaign('T15_CampaignName', ['T15_element'], prefix);
    var testArea = 'body';

    if (!campaign.hasNonDefaultExperience()) {
        return;
    }

    campaign.hideContent('body');
    createFunctionality();

    utils.waitForElementArrival('#globalFooter', {
        done: function () {
            campaign.renderMaxyboxes();
            utils.addClass(document.getElementsByTagName('body')[0], 'm' + campaign.prefix);
        },
        always: function () {
            campaign.showContent();
        },
        emergency: 5000
    });


    function createFunctionality() {
        campaign.addCalculator = function (html) {
            var variant = $('<div/>').html(html).contents(); // variant.find('.mt15clone')
        };
    }
}('t15'));