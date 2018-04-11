$('.wrap input, .wrap textarea').each(function() {
    styleInput($(this), 'inital');
});
$('.wrap input, .wrap textarea').focus(function() {
    styleInput($(this), 'focus');
});
$('.wrap input, .wrap textarea').blur(function() {
    styleInput($(this), 'blur');
});

$('.trumbowyg-box').prev('label').addClass('up');

$(document).keyup(function(e) {
    if (e.keyCode === 27){
        $('body').removeClass('popup-open');
        $('.popup').fadeOut();
        $('.behind-popup').remove();
    }
});


function styleInput(e, a){
    console.log(a);
    var name = e.attr('name');

    if(a == 'initial' || 'blur'){
        if (e.attr('placeholder') || e.val() || e.attr('type') == 'file' || e.attr('type') == 'date') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
    }
    if (a == 'focus') {
        $('label[for="' + name + '"]').addClass('up');
        e.parent().addClass('focus');
    }
    if(a == 'blur'){
        e.parent().removeClass('focus');
    }
}
