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
    var items = [];

    if(getCookie("posts")){
        console.log('Posts cookie exists');
        var postList = JSON.parse(getCookie("posts"));

        $.each(postList, function(){
            var tags = "";
            for (i = 0; i < this.tags.length; i++) {
                tags += '<span class="tag">' + this.tags[i] + '</span>';
            }
            items.push('<tr><td>' + this.id + '</td><td>' + this.title + '</td><td>' + tags + '</td><td>' + this.date + '</td><td>' + this.status + '</td><td><a class="editpost btn" href="edit.html" data-edit-post-id="' + this.id + '">Edit</a><a class="deletepost btn" href="#" data-delete-post-id="' + this.id + '">Delete</a><a class="duplicatepost btn" href="#" data-duplicate-post-id="' + this.id + '">Duplicate</a></td></tr>');
        });

        var count = 0;
        var i;

        for (i in postList) {
            if (postList.hasOwnProperty(i)) {
                count++;
            }
        }

        var listCount = Object.keys(postList).length;
        console.log(listCount);

        console.log(count);
        // TODO: Remove from Array
        // TODO: Add to Array of Object
        // TODO: Get Length of Array of Objects

    } else{
        console.log('Posts Cookie doesnt exist');
        $.getJSON("js/posts.json", function(json) {

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
                posts["post" + post.id] = post;
                var tags = "";
                for (i = 0; i < this.tags.length; i++) {
                    tags += '<span class="tag">' + this.tags[i] + '</span>';
                }
                items.push('<tr><td>' + this.id + '</td><td>' + this.title + '</td><td>' + tags + '</td><td>' + this.date + '</td><td>' + this.status + '</td><td><a class="editpost btn" href="edit.html" data-edit-post-id="' + this.id + '">Edit</a><a class="deletepost btn" href="#" data-delete-post-id="' + this.id + '">Delete</a><a class="duplicatepost btn" href="#" data-duplicate-post-id="' + this.id + '">Duplicate</a></td></tr>');
            });

            setCookie("posts", JSON.stringify(posts), 1);
            posts = JSON.parse(getCookie("posts"));
        });
    }

    if (~pathname.indexOf("posts")) {
        $('tbody').append(items);

        $('table').on('click', '.editpost', function(e) {
            $(this).each(function() {
                var id = $(this).data('edit-post-id');
                posts = JSON.parse(getCookie("posts"));
                console.log(posts);
                var p = posts["post" + id];
                console.log(p.content);
                setCookie("currentEdit", JSON.stringify(p), 1);
            });
        });
        $('table').on('click', '.deletepost', function(e) {
            posts = JSON.parse(getCookie("posts"));
            var id = $(this).data('delete-post-id');
            var p = posts["post" + id];
            if (confirm('Are you sure your want to delete '+p.title+'?')) {
                delete posts["post" + id];
                setCookie("posts", JSON.stringify(posts), 1);
                location.reload();
            }
        });
        $('table').on('click', '.duplicatepost', function(e) {
            posts = JSON.parse(getCookie("posts"));
            var id = $(this).data('duplicate-post-id');
            var p = posts["post" + id];
            var postCount = Object.keys(posts).length;

            posts["post"+(postCount+1)] = p;

            posts["post"+(postCount+1)].id = postCount + 1;

            console.log(posts);

            setCookie("posts", JSON.stringify(posts), 1);
            location.reload();
        });
    }

    if (~pathname.indexOf("edit")) {
        if (getCookie("currentEdit")) {
            var cp = JSON.parse(getCookie("currentEdit"));
            $('input[name="edit-title"]').val(cp.title);
            $('textarea[name*="edit-content"]').val(cp.content);
            $('input[name="edit-description"]').val(cp.description);
            $('input[name="edit-date"]').val(cp.date);
            $('input[name="edit-layout"][value="' + cp.layout + '"]').prop('checked', true);
            $('.feat-img').append('<img src="img/' + cp.featuredImage + '">');
            $('input[name="edit-tags"]').val(cp.tags);
        }
    }

    if (~pathname.indexOf("new")) {
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
        ce.content = $('textarea[name*="edit-content"]').val();
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
        ce.content = $('textarea[name*="edit-content"]').val();
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

        if($('input[name="create-title"]').val() && $('input[name="create-description"]').val() && $('input[name="create-date"]').val() && $('input[name="create-layout"]:checked').val() && $('input[name="create-featimg"]').val() && $('input[name="create-tags"]').val() && ( $('textarea[name="create-content-wysiwyg"]').val() || $('textarea[name="create-content-markdown"]').val() || $('textarea[name="create-content-html"]').val() ) ){
            np.title = $('input[name="create-title"]').val();
            np.description = $('input[name="create-description"]').val();
            np.date = $('input[name="create-date"]').val();
            np.layout = $('input[name="create-layout"]:checked').val();
            np.featuredImage = $('input[name="create-featimg"]').val().split('\\').pop();
            np.tags = $('input[name="create-tags"]').val().split(',');
            np.status = 'published';
            np.content = $('textarea[name*="create-content"]').val();
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

        if($('input[name="create-title"]').val() && $('input[name="create-description"]').val() && $('input[name="create-date"]').val() && $('input[name="create-layout"]:checked').val() && $('input[name="create-featimg"]').val() && $('input[name="create-tags"]').val() && ( $('textarea[name="create-content-wysiwyg"]').val() || $('textarea[name="create-content-markdown"]').val() || $('textarea[name="create-content-html"]').val() ) ){
            np.title = $('input[name="create-title"]').val();
            np.description = $('input[name="create-description"]').val();
            np.date = $('input[name="create-date"]').val();
            np.layout = $('input[name="create-layout"]:checked').val();
            np.featuredImage = $('input[name="create-featimg"]').val().split('\\').pop();
            np.tags = $('input[name="create-tags"]').val().split(',');
            np.status = 'draft';
            np.content = $('textarea[name*="create-content"]').val();
            posts['post' + np.id] = np;
            console.log(posts);
            setCookie("posts", JSON.stringify(posts), 1);
        } else {
            alert('Fill Out All fields');
        }

    });

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
