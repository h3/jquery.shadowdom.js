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
                if (!frame.get(0)) {
                    root.removeClass('has-shadowdom')
                    $(this).data('shadowdom-id', false)
                    return root.shadowdom();
                }
            }
            else {
                now   = new Date();
                id    = "shadowdom-" + now.getTime() + now.getMilliseconds();
                frame = $('<iframe src="about:blank" class="shadowdom-container"><script>alert("what");</script></iframe>').attr('id', id).prependTo(root);
                root.data('shadowdom-id', id).addClass('has-shadowdom');

                frame.find('html, body').css({margin:0,padding:0});

            }
            body = frame.contents()
                    .find('body');
            injectCSS(body);
            return body;
        }
    });

})(jQuery);
