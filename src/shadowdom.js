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
            var frame, body, now, id,
                root = $(this);
            if (root.hasClass('has-shadowdom') && root.data('shadowdom-id')) {
                frame = $('#'+ root.data('shadowdom-id'), root);
            }
            else {
                now   = new Date();
                id    = "shadowdom-" + now.getTime() + now.getMilliseconds();
                frame = $('<iframe class="shadowdom-container" />').attr('id', id).prependTo(root);
                frame.contents().append($('<div id="test2">test</div>'))
                root.data('shadowdom-id', id).addClass('has-shadowdom');
            }
            body = frame.contents().find('body');
            injectCSS(body);
            return body;
        }
    });

})(jQuery);
