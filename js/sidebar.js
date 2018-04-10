$(document).ready(function() {
    $('.alertme').click(function(){
        var sbWidgets = $('.sidebar-drop').children('div');
        $('.pastehere').append(sbWidgets);
        console.log(sbWidgets);
    });

    $(".slides").sortable({
         placeholder: 'slide-placeholder',
        axis: "y",
        revert: 150,
        start: function(e, ui){

            placeholderHeight = ui.item.outerHeight();
            ui.placeholder.height(placeholderHeight + 15);
            $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);

        },
        change: function(event, ui) {

            ui.placeholder.stop().height(0).animate({
                height: ui.item.outerHeight() + 15
            }, 300);

            placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));

            $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
                height: 0
            }, 300, function() {
                $(this).remove();
                placeholderHeight = ui.item.outerHeight();
                $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
            });

        },
        stop: function(e, ui) {

            $(".slide-placeholder-animator").remove();
            var slideOrder = [];
            $('.slides').children().each(function(){
                var txt = $(this).text();
                slideOrder.push(txt);
            });
            console.log(slideOrder);
        },
    });

});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
