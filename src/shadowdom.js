/* 
 * jquery.shadowdom.js - v 0.0.1
 * author: Maxime Haineault <max@motion-m.ca>
 *
 *
 * */

(function () {

    var injectCSS = function(el) {
        $('link[type="text/css+shadowdom"]').each(function(){
            var link = $(this);
            if (!link.attr('id')) {
                $('<link type="text/css" rel="stylesheet" />').attr('href', link.attr('href')).insertAfter(el);
            }
        });
        $('style[type="text/css+shadowdom"]').each(function(){
            var block = $(this);
            if (!block.attr('id')) {
                $('<style type="text/css" />').insertAfter(el).text(block.text());
            }
        });
        return el;
    };

    $.extend($.fn, {
        shadowdom: function () {
            var now, id, 
                frame = $(this),
                body  = frame.contents().find('body');

            if (!frame.hasClass('shadowdom')) {
                now = new Date();
                frame.attr('id', 'shadowdom-' + now.getTime() + now.getMilliseconds())
                     .attr('frameborder', 0)
                     .addClass('shadowdom');
                body.html(frame.text())
                injectCSS(body);
            }

            return body;
        }
    });

})(jQuery);
