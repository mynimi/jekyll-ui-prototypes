$('[data-togglepopup]').each(function() {
    $(this).click(function() {
        var popupClass = $(this).data('togglepopup');
        $('.' + popupClass).fadeToggle();
        $('body').toggleClass('popup-open');
        $('body').append('<div class="behind-popup"></div>');
    });
});
$('body').on('click tap', '.behind-popup', function() {
    $('body').removeClass('popup-open');
    $('.popup').fadeOut();
    $(this).remove();
});
