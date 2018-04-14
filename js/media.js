$('.popup.media .content').on('click', '.media-file', function(){
    var MediaSrc = $(this).attr('src');
    $('.behind-popup').click();
    $('.media-chooser img').attr('src', MediaSrc);
    $('input').change();
});
