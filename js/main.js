$(document).ready(function() {
    // init vars
    if (!getCookie('siteSettings')) {
        var siteSettings = {};
    }
    if (!getCookie('language')) {
        setCookie('language', 'en');
    }
    if (getCookie('language') == 'en') {
        $('[lang="en"]').css('display', 'inline-block');
        $('[lang="de"]').hide();
    } else {
        $('[lang="de"]').css('display', 'inline-block');
        $('[lang="en"]').hide();
    }

    var pathname = window.location.pathname; // Returns path only

    var posts = {};

    if (~pathname.indexOf("posts")) {
        $.getJSON("js/posts.json", function(json) {
            var items = [];
            // console.log(json);

            $.each(json, function() {
                var post = {};
                post.id = this.id;
                post.title = this.title;
                post.description = this.description;
                post.date = this.date;
                post.layout = this.layout;
                post.featuredImage = this.featuredImage;
                post.tags = this.tags;
                post.status = this.status;
                post.content = this.content;
                posts["post"+post.id] = post;
                items.push('<tr><td>'+this.id+'</td><td>'+this.title+'</td><td>'+this.tags+'</td><td>'+this.date+'</td><td>'+this.status+'</td><td><a class="editpost" href="edit.html" data-edit-post-id="'+this.id+'">Edit</a><a href="#">Delete</a><a href="#">Duplicate</a></td></tr>');
            });

            // console.log(posts);
            // console.log(JSON.stringify(posts));
            $('tbody').append(items);
            console.log(posts);
            console.log(JSON.stringify(posts));
            setCookie("posts", JSON.stringify(posts), 1);
            posts = JSON.parse(getCookie("posts"));
        });

        $('table').on('click', '.editpost', function(e){
            $(this).each(function(){
                // e.preventDefault();
                var id = $(this).data('edit-post-id');
                alert(id);
                posts = JSON.parse(getCookie("posts"));
                var p = posts["post"+id];
                console.log(p.title);
                setCookie("currentEdit", JSON.stringify(p), 1);
            });
        });

    }

    if (~pathname.indexOf("edit")) {
        if(getCookie("currentEdit")){
            $('.container').append(JSON.parse(getCookie("currentEdit")));
            var cp = JSON.parse(getCookie("currentEdit"));
            $('input[name="edit-title"]').val(cp.title);
        }
    }

    $('input[name="lang"][value="' + getCookie('language') + '"]').prop('checked', true);

    $('.saveappsettings').click(function() {
        var lang = $('input[name="lang"]:checked').val();
        setCookie('language', lang, 1);
        location.reload();
    });

    if (getCookie('siteSettings')) {
        var s = JSON.parse(getCookie("siteSettings"));
        console.log(s);
        $('input[name="directory-path"]').val(s.directory.toString());
        $('input[name="project-name"]').val(s.projectName);
        $('input[name="publish-platform"][value="' + s.publishPlatform + '"]').prop('checked', true);
        $('input[name="ftp-host"]').val(s.ftpHost);
        $('input[name="ftp-username"]').val(s.ftpUsername);
        $('input[name="ftp-password"]').val(s.ftpPassword);
        $('input[name="ftp-port"]').val(s.ftpPort);
        $('input[name="ftp-directory"]').val(s.ftpDirectory);
        $('input[name="github-username"]').val(s.gitHubUsername);
        $('input[name="github-password"]').val(s.gitHubPassword);
        $('input[name="github-project-url"]').val(s.gitHubProjectUrl);
    }
    $('.create').click(function() {
        var siteSettings = {};
        if ($('input[name="directory"]').length) {
            siteSettings.directory = $('input[name="directory"]').val();
        } else {
            var s = JSON.parse(getCookie("siteSettings"));
            siteSettings.directory = s.directory;
        }
        siteSettings.projectName = $('input[name="project-name"]').val();
        siteSettings.publishPlatform = $('input[name="publish-platform"]:checked').val();
        siteSettings.ftpHost = $('input[name="ftp-host"]').val();
        siteSettings.ftpUsername = $('input[name="ftp-username"]').val();
        siteSettings.ftpPassword = $('input[name="ftp-password"]').val();
        siteSettings.ftpPort = $('input[name="ftp-port"]').val();
        siteSettings.ftpDirectory = $('input[name="ftp-directory"]').val();
        siteSettings.gitHubUsername = $('input[name="github-username"]').val();
        siteSettings.gitHubPassword = $('input[name="github-password"]').val();
        siteSettings.gitHubProjectUrl = $('input[name="github-project-url"]').val();

        console.log(siteSettings);
        setCookie('siteSettings', JSON.stringify(siteSettings), 1);
    });

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

    $('.wrap input').each(function() {
        var name = $(this).attr('name');
        if ($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
    });
    $('.wrap input').focus(function() {
        var name = $(this).attr('name');
        $('label[for="' + name + '"]').addClass('up');
        $(this).parent().addClass('focus');
    });
    $('.wrap input').blur(function() {
        var name = $(this).attr('name');
        if ($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file') {
            $('label[for="' + name + '"]').addClass('up');
        } else {
            $('label[for="' + name + '"]').removeClass('up');
        }
        $(this).parent().removeClass('focus');
    });

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
