/*global $:false, jQuery:false */
(function ($) {
    "use strict";

    $.fn.createInfoBox = function (options) {
        var that = this;

        // default settings
        var settings = $.extend({
            'background': 'comp_plate_graybasic.png'
        }, options);

        var body = '<div class="content-wrapper"><div class="img"></div><div class="description"><span class="header"></span><span class="body"></span><div class="details"><span>show details</span></div></div></div><div class="navigation"><div class="left"><div class="btn-left btn-wrapper"><div class="arrow"></div><div class="text">Prev</div></div><div class="btn-right btn-wrapper"><div class="text">Next</div><div class="arrow"></div></div></div><div class="right"><div class="btn-right btn-wrapper"><div class="text">Find</div><div class="arrow"></div></div></div></div>';

        var createInfoBox = function (div, data) {
            var $infoBox = $(div), count = 0;

            //render dom
            $(div).css('background-image', "url('img/" + settings.background + "')");
            $(body).appendTo(div);

            var setDataToBox = function(){
                $infoBox.find('.img').css('background-image', "url('img/" + data[count].img + "')");
                $infoBox.find('.description .header').text(data[count].title);
                $infoBox.find('.description .body').text(data[count].description);
                $infoBox.find('.description .body').append('<div class="note">' + data[count].note + '</div>');
            };
            setDataToBox();

            $infoBox.find('.left .btn-left.btn-wrapper').click(function(){
                if (count !== 0) {
                    count--;
                }
                else {
                    count = data.length -1;
                }
                setDataToBox();
            });

            $infoBox.find('.left .btn-right.btn-wrapper').click(function(){
                if (count < data.length -1) {
                    count++;
                }
                else {
                    count = 0;
                }
                setDataToBox();
            });

            $infoBox.find('.right .btn-right.btn-wrapper').click(function(){
                window.open(data[count].productUrl);
            });

            $infoBox.find('.details>span').click(function(){
                if($infoBox.find('.img').height() !== 0){
                    $infoBox.find('.img').animate({
                        height: 0
                    }, 1000, function() {
                        $infoBox.find('.description .body').animate({
                            height: 210
                        }, 1000);
                    });
                }
                else {

                    if($infoBox.find('.img').height !== 0){
                        $infoBox.find('.description .body').animate({
                            height: 28
                        }, 1000, function() {
                            $infoBox.find('.img').animate({
                                height: 200
                            }, 1000);
                        });
                    }
                }
            });
        };

        var getData = function () {
            return $.ajax({
                url: options.data
            }).done(function (data) {
                $.each(that, function (i, v) {
                    createInfoBox(v, data);
                });
            });
        }();


    };
})(jQuery);