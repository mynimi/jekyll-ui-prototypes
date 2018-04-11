$(document).ready(function() {
    if (getCookie('themeOptions')) {
        var o = JSON.parse(getCookie("themeOptions"));
        $('body').addClass(o.layout);
    }

    var posts = JSON.parse(getCookie("posts"));
    var postItems = [];
    $.each(posts, function(){
        var tags = "";
        for (i = 0; i < this.tags.length; i++) {
            tags += '<span class="tag">' + this.tags[i] + '</span>';
        }
        var article  = '<article>';
            article += '<span class="date">'+this.date+'</span>';
            if(this.featuredImage){
                article += '<img src="img/'+this.featuredImage+'">';
            }
            article += '<div class="content">';
            article += '<div class="post-title">';
            article += '<h2>'+this.title+'</h2>';
            article += '</div>';
            article += '<div class="post-tags"><i class="fas fa-tag"></i>'+tags+'</div>';
            article += '<div class="post-content">'+this.content+'</div>';
            article += '<span class="btn">Read More</span>';
            article += '</div></article>';
        postItems.push(article);
    });

    $('.frontend-posts').append(postItems);

    if (getCookie("currentEdit")) {
        var cp = JSON.parse(getCookie("currentEdit"));
        var o = JSON.parse(getCookie("themeOptions"));
        $('body').removeClass(o.layout);
        $('body').addClass(cp.layout);
        var article  = '<article>';
            article += '<span class="date">'+cp.date+'</span>';
            if(cp.featuredImage){
                article += '<img src="img/'+cp.featuredImage+'">';
            }
            article += '<div class="content">';
            article += '<div class="post-title">'
            article += '<h2>'+cp.title+'</h2>';
            article += '</div>';
            article += '<div class="post-tags"><i class="fas fa-tag"></i>'+cp.tags+'</div>';
            article += '<div class="post-content">'+cp.content+'</div>';
            article += '</div></article>';
            $('.frontend-post').append(article);
    }

    if(getCookie("navigation")){
        var i,
            nav = JSON.parse(getCookie("navigation"));
        // console.log(getCookie('navigation'));

        $.each(nav, function(i){
            var counter = parseInt(i),
                children = this.children,
                kids = "", item = "";
                if(this.parent){
                    item = '<span class="parent">';
                } else{
                    item = '<a href="'+this.url+'">';
                }
                if(this.parent){
                    item += '<span>';
                }
                item += this.title;
                if(this.parent){
                    item += '</span>';
                    item += '<span class="children">';
                    $.each(children, function(i){
                        kids  += '<a href="'+this.url+'">'+this.title+'</a>';
                        // console.log(kids);
                    });
                    item += kids;
                    item += '</span>';
                }
                if(this.parent){
                    item += '</span>';
                }else{
                    item += '</a>';
                }
            $('.navbar').append(item);
        });
    }

    $('.parent .children').hide();
    $('.parent').click(function(){
        $('.parent .children').slideUp();
        $(this).children('.children').slideDown();
    });
});
