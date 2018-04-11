// TODO: Cookie Shit

if(getCookie("sidebar")){
    var i,
        sidebar = JSON.parse(getCookie("sidebar"));
    $.each(sidebar, function(i){
        var counter = parseInt(i),
            item = '<div class="'+this.type+' widget dragable ui-draggable ui-draggable-handle clone">';
            item += '<h3>';
        if(this.type == 'fb'){
            item += '<span lang="en">Facebook Page</span><span lang="de">Facebook Seite</span>';
        }
        if(this.type == 'html'){
            item += 'Text';
        }
            item += '</h3>';
            item += '<span class="edit"><i class="fas fa-edit"> </i></span>';
            item += '<span class="delete"><i class="fas fa-trash-alt"> </i></span>';
            item += '<div class="widget-config">';
        if(this.type == 'fb'){
            item += '<div class="wrap">';
            item += '<label for="fb-widget-title'+this.id+'">';
            item += '<span lang="en">Title</span><span lang="de">Titel</span>';
            item += '</label>';
            item += '<input name="fb-widget-title'+this.id+'" id="fb-widget-title'+this.id+'" type="text" value="'+this.title+'">';
            item += '</div>';
            item += '<div class="wrap">';
            item += '<label for="fb-url'+this.url+'">URL</label>';
            item += '<input name="fb-url'+this.url+'" id="fb-url'+this.url+'" type="url" value="'+this.url+'">';
            item += '</div>';
        }
        if(this.type == 'html'){
            item += '<div class="wrap">';
            item += '<label for="edit-title-html-widget'+this.id+'">';
            item += '<span lang="en">Title</span><span lang="de">Titel</span>';
            item += '</label>';
            item += '<input name="edit-title-html-widget'+this.id+'" id="edit-title-html-widget'+this.id+'" type="text" value="'+this.title+'">';
            item += '</div>';
            item += '<div class="wrap">';
            item += '<label for="edit-content-html-widget'+this.id+'">HTML</label>';
            item += '<textarea name="edit-content-html-widget'+this.id+'" id="edit-content-html-widget'+this.id+'">'+this.content+'</textarea>';
            item += '</div>';
        }
            item += '<span class="btn savesidebar"><span lang="en">Apply</span><span lang="de">Speichern</span></span>';
            item += '</div>'
            item += '</div>';
        $('.sidebar-areas .area').append(item);
    });
}
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

$('.area').on('focus', '.widget input, .widget textarea', function(){
    styleInput($(this), 'focus');
});
$('.area').on('blur', '.widget input, .widget textarea', function(){
    styleInput($(this), 'blur');
});


$('.area').on('click', '.savesidebar', function(){
    alert('save');
    var sidebar = {},
        i;
    $('.sidebar-areas .area').each(function(){
        if($(this).children('.widget').length){
            var item = {};
            $(this).children('.widget').each(function(){
                var classes = $(this).attr('class');
                if(classes.indexOf("fb") >= 0){
                    item.type = 'fb';
                }
                if(classes.indexOf("html") >= 0){
                    item.type = 'html';
                }
                var inputs = $(".area .clone").draggable("widget").find('input');
                inputs.each(function(){
                    if($(this).is('[name*="title"]')){
                        item.title = $(this).val();
                    }

                    if(item.type == 'fb'){
                        if($(this).is('[type="url"]')){
                            item.url = $(this).val();
                        }
                    }
                    if(item.type == 'html'){
                        if($(this).is('[name*="content"]')){
                            item.content = $(this).val();
                        }
                    }
                });
                sidebar[i+1] = item;
                console.log(item);
            });
        }
    });
    console.log(sidebar);
    setCookie("sidebar", JSON.stringify(sidebar), 1);
});
