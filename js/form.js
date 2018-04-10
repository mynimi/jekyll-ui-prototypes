$(document).ready(function() {
    $('.wrap input, .wrap textarea').each(function() {
        var name = $(this).attr('name');
        if ($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file' || $(this).attr('type') == 'date') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
    });
    $('.wrap input, .wrap textarea').focus(function() {
        var name = $(this).attr('name');
        $('label[for="' + name + '"]').addClass('up');
        $(this).parent().addClass('focus');
    });
    $('.wrap input, .wrap textarea').blur(function() {
        var name = $(this).attr('name');
        if ($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file' || $(this).attr('type') == 'date') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
        $(this).parent().removeClass('focus');
    });

    $('.trumbowyg-box').prev('label').addClass('up');

});

$(document).keyup(function(e) {
    if (e.keyCode === 27){
        $('body').removeClass('popup-open');
        $('.popup').fadeOut();
        $('.behind-popup').remove();
    }
});
