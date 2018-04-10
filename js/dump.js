
$(document).ready(function() {

    $('#edit-content-html').trumbowyg();
    $('#create-content-html').trumbowyg();


    if (~window.location.pathname.indexOf("edit")) {
        if (getCookie("currentEdit")) {
            var cp = JSON.parse(getCookie("currentEdit"));
            $('input[name="edit-title"]').val(cp.title);
            // $('textarea[name*="edit-content"]').val(cp.content);
            $('#edit-content-html').trumbowyg('html', cp.content);
            $('input[name="edit-description"]').val(cp.description);
            $('input[name="edit-date"]').val(cp.date);
            $('input[name="edit-layout"][value="' + cp.layout + '"]').prop('checked', true);
            $('.feat-img').append('<img src="img/' + cp.featuredImage + '">');
            $('input[name="edit-tags"]').val(cp.tags);
        }
    }

    if (~window.location.pathname.indexOf("new")) {
        var date = new Date();
        $('input[type="date"]').val(date.toISOString().split('T')[0]);
    }

    $('.publishedit').click(function(e) {
        var ce = {};
        var cp = JSON.parse(getCookie("currentEdit"));
        ce.id = cp.id;
        ce.title = $('input[name="edit-title"]').val();
        ce.description = $('input[name="edit-description"]').val();
        ce.date = $('input[name="edit-date"]').val();
        ce.layout = $('input[name="edit-layout"]:checked').val();
        if ($('input[name="edit-featimg"]').val()) {
            console.log('Featured image changed');
            ce.featuredImage = $('input[name="edit-featimg"]').val().split('\\').pop();
        } else {
            ce.featuredImage = cp.featuredImage;
        }
        ce.tags = $('input[name="edit-tags"]').val().split(',');
        ce.status = 'published';
        ce.content = $('#edit-content-html').trumbowyg('html');
        setCookie("currentEdit", JSON.stringify(ce), 1);
        posts = JSON.parse(getCookie("posts"));
        console.log(posts);
        posts['post' + ce.id] = ce;
        setCookie("posts", JSON.stringify(posts), 1);
    });

    $('.savedraft').click(function(e){
        var ce = {};
        var cp = JSON.parse(getCookie("currentEdit"));
        ce.id = cp.id;
        ce.title = $('input[name="edit-title"]').val();
        ce.description = $('input[name="edit-description"]').val();
        ce.date = $('input[name="edit-date"]').val();
        ce.layout = $('input[name="edit-layout"]:checked').val();
        if ($('input[name="edit-featimg"]').val()) {
            console.log('Featured image changed');
            ce.featuredImage = $('input[name="edit-featimg"]').val().split('\\').pop();
        } else {
            ce.featuredImage = cp.featuredImage;
        }
        ce.tags = $('input[name="edit-tags"]').val().split(',');
        ce.status = 'draft';
        ce.content = $('#edit-content-html').trumbowyg('html');
        setCookie("currentEdit", JSON.stringify(ce), 1);
        posts = JSON.parse(getCookie("posts"));
        console.log(posts);
        posts['post' + ce.id] = ce;
        setCookie("posts", JSON.stringify(posts), 1);
    });

    $('.publishpost').click(function(e) {
        // e.preventDefault();

        var np = {};
        var posts = JSON.parse(getCookie("posts"));
        var postCount = Object.keys(posts).length;

        np.id = postCount + 1;

        if($('input[name="create-title"]').val() && $('input[name="create-description"]').val() && $('input[name="create-date"]').val() && $('input[name="create-layout"]:checked').val() && $('input[name="create-featimg"]').val() && $('input[name="create-tags"]').val() && $('textarea[name="create-content-html"]').val() ){
            np.title = $('input[name="create-title"]').val();
            np.description = $('input[name="create-description"]').val();
            np.date = $('input[name="create-date"]').val();
            np.layout = $('input[name="create-layout"]:checked').val();
            np.featuredImage = $('input[name="create-featimg"]').val().split('\\').pop();
            np.tags = $('input[name="create-tags"]').val().split(',');
            np.status = 'published';
            np.content = $('textarea[name*="create-content"]').trumbowyg('html');
            posts['post' + np.id] = np;
            console.log(posts);
            setCookie("posts", JSON.stringify(posts), 1);
        } else {
            alert('Fill Out All fields');
        }

    });

    $('.savepostdraft').click(function(e) {
        // e.preventDefault();

        var np = {};
        var posts = JSON.parse(getCookie("posts"));
        var postCount = Object.keys(posts).length;

        np.id = postCount + 1;

        if($('input[name="create-title"]').val() && $('input[name="create-description"]').val() && $('input[name="create-date"]').val() && $('input[name="create-layout"]:checked').val() && $('input[name="create-featimg"]').val() && $('input[name="create-tags"]').val() && $('textarea[name="create-content-html"]').val() ){
            np.title = $('input[name="create-title"]').val();
            np.description = $('input[name="create-description"]').val();
            np.date = $('input[name="create-date"]').val();
            np.layout = $('input[name="create-layout"]:checked').val();
            np.featuredImage = $('input[name="create-featimg"]').val().split('\\').pop();
            np.tags = $('input[name="create-tags"]').val().split(',');
            np.status = 'draft';
            np.content = $('textarea[name*="create-content"]').trumbowyg('html');
            posts['post' + np.id] = np;
            console.log(posts);
            setCookie("posts", JSON.stringify(posts), 1);
        } else {
            alert('Fill Out All fields');
        }

    });


    if (~window.location.pathname.indexOf("themeoptions")) {
        if(!getCookie('themeOptionsInitial')){
            var toInitial = {};
            toInitial.fontSize = $('input[name="root-font-size"]').val();
            toInitial.containerWidth = $('input[name="main-container-width"]').val();
            toInitial.maxWidth = $('input[name="main-max-width"]').val();
            toInitial.gutter = $('input[name="gutter-width"]').val();
            toInitial.bgColor = $('input[name="background-color"]').val();
            toInitial.mainColor = $('input[name="main-color"]').val();
            toInitial.primary = $('input[name="primary-color"]').val();
            toInitial.secondary = $('input[name="scnd-color"]').val();
            toInitial.logo = $('input[name="logo"]').val();
            toInitial.favicon = $('input[name="favicon"]').val();
            toInitial.header = $('input[name="header"]').val();
            toInitial.layout = $('input[name="main-layout"]:checked').val();
            setCookie('themeOptionsInitial', JSON.stringify(toInitial), 1);
            if(!getCookie('themeOptions')){
                setCookie('themeOptions', JSON.stringify(toInitial), 1);
            }
        }
    }

    if (getCookie('themeOptions')) {
        var o = JSON.parse(getCookie("themeOptions"));
        $('input[name="root-font-size"]').val(o.fontSize);
        $('input[name="main-container-width"]').val(o.containerWidth);
        $('input[name="main-max-width"]').val(o.maxWidth);
        $('input[name="gutter-width"]').val(o.gutter);
        $('input[name="background-color"]').val(o.bgColor);
        $('input[name="main-color"]').val(o.mainColor);
        $('input[name="primary-color"]').val(o.primary);
        $('input[name="scnd-color"]').val(o.secondary);
        $('input[name="logo"]').val(o.logo);
        $('input[name="favicon"]').val(o.favicon);
        $('input[name="header"]').val(o.header);
        $('input[name="main-layout"][value="' + o.layout + '"]').prop('checked', true);
    }
    $('.saveoptions').click(function() {
        var tO = {};
        tO.fontSize = $('input[name="root-font-size"]').val();
        tO.containerWidth = $('input[name="main-container-width"]').val();
        tO.maxWidth = $('input[name="main-max-width"]').val();
        tO.gutter = $('input[name="gutter-width"]').val();
        tO.bgColor = $('input[name="background-color"]').val();
        tO.mainColor = $('input[name="main-color"]').val();
        tO.primary = $('input[name="primary-color"]').val();
        tO.secondary = $('input[name="scnd-color"]').val();
        tO.logo = $('input[name="logo"]').val();
        tO.favicon = $('input[name="favicon"]').val();
        tO.header = $('input[name="header"]').val();
        tO.layout = $('input[name="main-layout"]:checked').val();
        setCookie('themeOptions', JSON.stringify(tO), 1);
        alert('Changes saved');
    });

    $('.resetoptions').click(function(){
        var o = JSON.parse(getCookie("themeOptionsInitial"));
        $('input[name="root-font-size"]').val(o.fontSize);
        $('input[name="main-container-width"]').val(o.containerWidth);
        $('input[name="main-max-width"]').val(o.maxWidth);
        $('input[name="gutter-width"]').val(o.gutter);
        $('input[name="background-color"]').val(o.bgColor);
        $('input[name="main-color"]').val(o.mainColor);
        $('input[name="primary-color"]').val(o.primary);
        $('input[name="scnd-color"]').val(o.secondary);
        $('input[name="logo"]').val(o.logo);
        $('input[name="favicon"]').val(o.favicon);
        $('input[name="header"]').val(o.header);
        $('input[name="main-layout"][value="' + o.layout + '"]').prop('checked', true);
    });


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


    $('[data-togglepopup]').each(function() {
        $(this).click(function() {
            var popupClass = $(this).data('togglepopup');
            $('.' + popupClass).fadeToggle();
            $('body').toggleClass('popup-open');
            $('body').append('<div class="behind-popup"></div>');
        });
    });
    $('body').on('click tap', '.behind-popup', function() {
        $('body').removeClass('popup-open');
        $('.popup').fadeOut();
        $(this).remove();
    });


    $('.wrap input, .wrap textarea').each(function() {
        var name = $(this).attr('name');
        if ($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file' || $(this).attr('type') == 'date') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
    });
    $('.wrap input, .wrap textarea').focus(function() {
        var name = $(this).attr('name');
        $('label[for="' + name + '"]').addClass('up');
        $(this).parent().addClass('focus');
    });
    $('.wrap input, .wrap textarea').blur(function() {
        var name = $(this).attr('name');
        if ($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file' || $(this).attr('type') == 'date') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
        $(this).parent().removeClass('focus');
    });

    $('.trumbowyg-box').prev('label').addClass('up');

    $('.publishsite').click(function(){
        alert('Page Published');
    });
});


$(document).keyup(function(e) {
    if (e.keyCode === 27){
        $('body').removeClass('popup-open');
        $('.popup').fadeOut();
        $('.behind-popup').remove();
    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) { // returns first occurence and stops
            return item.split("=")[0] == param && (param = item.split("=")[1]);
        });
    return param;
}

$(document).ready(function() {
    $('.alertme').click(function(){
        var sbWidgets = $('.sidebar-drop').children('div');
        $('.pastehere').append(sbWidgets);
    });
    console.log(sbWidgets);
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
