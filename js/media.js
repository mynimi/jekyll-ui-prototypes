var folder = "img/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) {
                $(".popup.media .content").append('<img class="media-file" src="'+ folder + val +'">');
            }
        });
    }
});
