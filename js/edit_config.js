$(document).ready(function() {
    if (~window.location.pathname.indexOf("editconfig")) {
        if(getCookie('siteConfig')){
            var config = JSON.parse(getCookie("siteConfig"));
            $('input[name="title"]').val(config.title);
            $('input[name="url"]').val(config.url);
            $('input[name="desc"]').val(config.desc);
            $('input[name="author"]').val(config.author);
            $('input[name="insta"]').val(config.insta);
            $('input[name="twitter"]').val(config.twitter);
            $('input[name="fb"]').val(config.fb);
        }
    }

    $('.saveconfig').click(function() {
        var config = {};
        config.title = $('input[name="title"]').val();
        config.url = $('input[name="url"]').val();
        config.desc = $('input[name="desc"]').val();
        config.author = $('input[name="author"]').val();
        config.insta = $('input[name="insta"]').val();
        config.twitter = $('input[name="twitter"]').val();
        config.fb = $('input[name="fb"]').val();
        setCookie('siteConfig', JSON.stringify(config), 1);
        alert('Changes saved');
    });
    
});
