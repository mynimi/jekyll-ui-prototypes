$(document).ready(function() {
    $(".dragable").draggable({
        revert: true,
        helper: "clone",
        cursor: "move",
        revertDuration: 0
    });

    $('.areas .area').droppable({
        accept: ".dragable",
        activeClass: "ui-state-highlight",
        drop: function(event, ui) {
            var $item = $(ui.draggable);
            if (!$item.hasClass('clone')) {
                $item = $item.clone().addClass('clone');
                $item.draggable({
                    revert: true,
                    cursor: "move",
                    revertDuration: 0
                });
            }
            $(this).addClass('has-drop').append($item);
        }
    }).sortable({
        items: ".dragable",
        sort: function() {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $(this).removeClass("ui-state-default");
        }
    });
});
