$(document).ready(function() {
    // TODO: Cookie Shit
    
    $('#edit-content-html-widget').trumbowyg();

    $('.area').on('click', '.widget .delete', function(){
        if (confirm('delete item?')) {
            $(this).parent().remove();
        }
    });

    $('.area').on('click', '.widget .edit', function(){
        $(this).siblings('.widget-config').slideToggle();
    });

    $('.area').on('click', '.widget .apply', function(){
        $(this).parent().slideToggle();
    });

    $('.savesidebar').click(function(){
        var sidebar = {},
            i;
        $('.sidebar-areas .area').each(function(){

        });

    });
});
