$(document).foundation();
// need to reset to set scroll offset
$(document).ready(function() {
    var _headerHeightOffset = $('header').height();
    // preserve header offset
    function scrollToEl(scrollToSelector) {
        if (!scrollToSelector) {
            return;
        }
        var offset = $(scrollToSelector).offset();
        if (offset && offset.top) {
            $('html, body')
            .animate(
                {
                    scrollTop: offset.top - _headerHeightOffset 
                }
            );
        }
    }
    $('header a').click(function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        scrollToEl(href);
    });
});