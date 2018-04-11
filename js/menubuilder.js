if (~window.location.pathname.indexOf("navigation")) {
    if(getCookie("navigation")){
        console.log('nav cookie exists');
        var i,
            nav = JSON.parse(getCookie("navigation"));
        console.log(getCookie('navigation'));

        $.each(nav, function(i){
            var counter = parseInt(i),
                id = 'edit-title-'+this.title,
                item  = '<div class="menu-element dragable ui-draggable ui-draggable-handle ui-sortable-handle clone">';
                item += '<span class="title">';
                item += this.title;
                item += '</span>';
                item += '<span class="edit"><i class="fas fa-edit"></i></span>';
                item += '<span class="delete"><i class="fas fa-trash-alt"></i></span>';
                item += '<div class="edit-name">';
                item += '<div class="wrap">'
                item += '<label for="'+id+'">display as</label>';
                item += '<input type="text" name="'+id+'" id="'+id+'" value="'+this.title+'">';
                item += '</div>';
                item += '<span class="btn apply">apply</span>';
                item += '</div>';
                item += '</div>';
            $('.menu-areas .area:nth-of-type('+counter+')').append(item);
            if(this.parent){
                console.log(this.title);
                console.log(this.children);
                var children = this.children;
                $.each(children, function(i){
                    console.log(this.title);
                    var id = 'edit-title-'+this.title,
                        item  = '<div class="menu-element dragable ui-draggable ui-draggable-handle ui-sortable-handle clone">';
                        item += '<span class="title">';
                        item += this.title;
                        item += '</span>';
                        item += '<span class="edit"><i class="fas fa-edit"></i></span>';
                        item += '<span class="delete"><i class="fas fa-trash-alt"></i></span>';
                        item += '<div class="edit-name">';
                        item += '<div class="wrap">'
                        item += '<label for="'+id+'">display as</label>';
                        item += '<input type="text" name="'+id+'" id="'+id+'" value="'+this.title+'">';
                        item += '</div>';
                        item += '<span class="btn apply">apply</span>';
                        item += '</div>';
                        item += '</div>';
                    $('.menu-areas .area:nth-of-type('+counter+')').append(item);
                });
            }
            console.log(counter);
        });
    } else {

    }
    $('.savenav').click(function(){
        var nav = {},
            i;
        $('.menu-areas .area').each(function(i){
            var item = {};
            if($(this).children('.menu-element').length){
                var mE = $(this).children('.menu-element:nth-child(2)');
                item.title = mE.find('input[name*="edit-title"]').val();
                item.url = '#';
                nav[i+1] = item;
                if($(this).children('.menu-element').length > 1){
                    item.parent = true;
                    var children = {};
                    $(this).children('.menu-element').each(function(i){
                        var child = {};
                        if(i != 0){
                            child.title = $(this).find('input[name*="edit-title"]').val();
                            child.url = '#';
                            children[i] = child;
                        }
                    });
                    item.children = children;
                } else{
                    item.parent = false;
                }
            }
        });
        setCookie("navigation", JSON.stringify(nav), 1);
        nav = JSON.parse(getCookie("navigation"));
        alert('saved');
    });


    $('.area').on('click', '.menu-element .delete', function(){
        if (confirm('delete item?')) {
            $(this).parent().remove();
        }
    });

    $('.area').on('click', '.menu-element .edit', function(){
        $(this).siblings('.edit-name').slideToggle();
    });
    $('.area').on('click', '.menu-element .apply', function(){
        var val = $(this).parent().find('input').val();
        $(this).parent().parent().find('.title').text(val);
        $(this).parent().slideToggle();
    });

}
