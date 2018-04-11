if(~window.location.pathname.indexOf("prev")){
    if(getCookie('siteConfig')){
        var config = JSON.parse(getCookie("siteConfig"));
        $('.site-title').append('<h1>'+config.title+'</h1>');
    }
    if (getCookie('themeOptions')) {
        var o = JSON.parse(getCookie("themeOptions"));
        $('body').addClass(o.layout);
        var style = '<style>';
            style += 'html, body{';
            style += 'font-size: '+o.fontSize+'px;';
            style += 'background-color: '+o.bgColor+';';
            style += 'color: '+o.mainColor+';';
            style += '}';
            style += '.site-title{';
            style += 'color: '+o.bgColor+';';
            style += '}';
            style += '.btn{';
            style += 'background: '+o.primary+';';
            style += 'color: white;';
            style += '}';
            style += '.btn:hover{';
            style += 'background: '+o.secondary+';';
            style += 'color: white;';
            style += '}';
            style += 'a{';
            style += 'color: '+o.primary+';';
            style += '}';
            style += 'a:hover{';
            style += 'color: '+o.secondary+';';
            style += '}';
            style += 'article, .widget{border: 2px solid '+o.primary+'}';
            style += '.main-wrapper{';
            style += 'max-width: '+o.maxWidth+'px;';
            style += 'width: '+o.containerWidth+'%;';
            style += '}';
            style += '.header{';
            style += 'background-image: url('+o.header+');';
            style += '}';
            style += '</style>';
        $('body').prepend(style);

    }

    if(getCookie("sidebar")){
        var i,
            sidebar = JSON.parse(getCookie("sidebar"));
        console.log(sidebar);
        $.each(sidebar, function(i){
            var counter = parseInt(i),
                item = '<div class="'+this.type+' widget">';
                item += '<h3 class="title">';
                item += this.title;
                item += '</h3>';
            if(this.type == 'fb'){
                item += '<div class="fb-page" data-href="'+this.url+'" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="'+this.url+'" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>'
            }
            if(this.type == 'html'){
                item += this.content;
            }
                item += '</div>';
            $('.sidebar').append(item);
        });
    }

    if(getCookie("posts")){
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
                    article += '<img src="'+this.featuredImage+'">';
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
    }

    $('.frontend-posts').append(postItems);


    if(~window.location.pathname.indexOf("post")){
        if (getCookie("currentEdit")) {

            var cp = JSON.parse(getCookie("currentEdit"));
            var o = JSON.parse(getCookie("themeOptions"));

            console.log(cp);
            console.log(cp.date);

            // $('body').removeClass(o.layout);
            // $('body').addClass(cp.layout);
            if(cp.status == 'published'){
                var article  = '<article>';
                    article += '<span class="date">'+cp.date+'</span>';
                    if(cp.featuredImage){
                        article += '<img src="'+cp.featuredImage+'">';
                    }
                    article += '<div class="content">';
                    article += '<div class="post-title">';
                    article += '<h2>'+cp.title+'</h2>';
                    article += '</div>';
                    // article += '<div class="post-tags"><i class="fas fa-tag"></i>'+cp.tags+'</div>';
                    article += '<div class="post-content">'+cp.content+'</div>';
                    article += '</div></article>';
                    $('.frontend-post').append(article);
            }
        } else {
            console.log('no current endit');
        }
    }
    if(~window.location.pathname.indexOf("page")){
        if (getCookie("currentEdit")) {

            var cp = JSON.parse(getCookie("currentEdit"));
            var o = JSON.parse(getCookie("themeOptions"));

            console.log(cp);
            console.log(cp.date);
            if(cp.status == 'published'){

            // $('body').removeClass(o.layout);
            // $('body').addClass(cp.layout);
            var article  = '<article>';
                article += '<div class="content">';
                article += '<div class="page-title">';
                article += '<h2>'+cp.title+'</h2>';
                article += '</div>';
                // article += '<div class="post-tags"><i class="fas fa-tag"></i>'+cp.tags+'</div>';
                article += '<div class="page-content">'+cp.content+'</div>';
                article += '</div></article>';
                $('.frontend-page').append(article);
            }
        } else {
            console.log('no current endit');
        }
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
                    item += '<i class="fas fa-angle-down"></i></span>';
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
        $('.parent').not($(this)).children('children').slideUp();
        $(this).children('.children').slideToggle();
    });
}
