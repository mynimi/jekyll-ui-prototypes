$('[data-togglepopup]').each(function() {
    $(this).click(function() {
        var popupClass = $(this).data('togglepopup');
        $('.' + popupClass).fadeToggle();
        $('body').toggleClass('popup-open');
        $('body').append('<div class="behind-popup"></div>');
    });
});
$('body').on('click tap', '.behind-popup, .close', function() {
    $('body').removeClass('popup-open');
    $('.popup').fadeOut();
    $('.behind-popup').remove();
});

$('.popup').prepend('<span class="close"><i class="fas fa-times"></i></span>');
