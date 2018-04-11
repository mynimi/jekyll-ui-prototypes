
$('#edit-content-html').trumbowyg();
$('#create-content-html').trumbowyg();
var postItems = [];
var posts = {};

if(getCookie("posts")){
    // console.log('Posts cookie exists');
    var posts = JSON.parse(getCookie("posts"));

    $.each(posts, function(){
        var tags = "";
        for (i = 0; i < this.tags.length; i++) {
            tags += '<span class="tag">' + this.tags[i] + '</span>';
        }
        postItems.push('<tr><td>' + this.id + '</td><td>' + this.title + '</td><td>' + tags + '</td><td>' + this.date + '</td><td>' + this.status + '</td><td><a class="editpost btn" href="editpost.html" data-edit-post-id="' + this.id + '">Edit</a><a class="deletepost btn" href="#" data-delete-post-id="' + this.id + '">Delete</a><a class="duplicatepost btn" href="#" data-duplicate-post-id="' + this.id + '">Duplicate</a></td></tr>');
    });
} else{
    // console.log('Posts Cookie doesnt exist');
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
            postItems.push('<tr><td>' + this.id + '</td><td>' + this.title + '</td><td>' + tags + '</td><td>' + this.date + '</td><td>' + this.status + '</td><td><a class="editpost btn" href="editpost.html" data-edit-post-id="' + this.id + '">Edit</a><a class="deletepost btn" href="#" data-delete-post-id="' + this.id + '">Delete</a><a class="duplicatepost btn" href="#" data-duplicate-post-id="' + this.id + '">Duplicate</a></td></tr>');
        });

        setCookie("posts", JSON.stringify(posts), 1);
        posts = JSON.parse(getCookie("posts"));
    });
}

if(~window.location.pathname.indexOf("posts")){
    $('tbody').append(postItems);
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

if (~window.location.pathname.indexOf("editpost")) {
    if (getCookie("currentEdit")) {
        var cp = JSON.parse(getCookie("currentEdit"));
        $('input[name="edit-title"]').val(cp.title);
        // $('textarea[name*="edit-content"]').val(cp.content);
        $('#edit-content-html').trumbowyg('html', cp.content);
        $('input[name="edit-description"]').val(cp.description);
        $('input[name="edit-date"]').val(cp.date);
        $('input[name="edit-layout"][value="' + cp.layout + '"]').prop('checked', true);
        $('.feat-img').append('<img src="' + cp.featuredImage + '">');
        $('input[name="edit-tags"]').val(cp.tags);
    }
    $('.publishedit').click(function(e) {
        var ce = {};
        var cp = JSON.parse(getCookie("currentEdit"));
        ce.id = cp.id;
        ce.title = $('input[name="edit-title"]').val();
        ce.description = $('input[name="edit-description"]').val();
        ce.date = $('input[name="edit-date"]').val();
        ce.layout = $('input[name="edit-layout"]:checked').val();
        ce.featuredImage = $('.media-chooser img').attr('src');
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
        ce.featuredImage = $('.media-chooser img').attr('src');
        ce.tags = $('input[name="edit-tags"]').val().split(',');
        ce.status = 'draft';
        ce.content = $('#edit-content-html').trumbowyg('html');
        setCookie("currentEdit", JSON.stringify(ce), 1);
        posts = JSON.parse(getCookie("posts"));
        console.log(posts);
        posts['post' + ce.id] = ce;
        setCookie("posts", JSON.stringify(posts), 1);
    });
}

if (~window.location.pathname.indexOf("newpost")) {
    var date = new Date();
    $('input[type="date"]').val(date.toISOString().split('T')[0]);

    $('.publishpost').click(function(e) {
        // e.preventDefault();

        var np = {};
        var posts = JSON.parse(getCookie("posts"));
        var postCount = Object.keys(posts).length;

        np.id = postCount + 1;

        if($('input[name="create-title"]').val() && $('textarea[name="create-content-html"]').val() ){
            np.title = $('input[name="create-title"]').val();
            np.description = $('input[name="create-description"]').val();
            np.date = $('input[name="create-date"]').val();
            np.layout = $('input[name="create-layout"]:checked').val();
            np.featuredImage = $('.feat-img .img').attr('src');
            np.tags = $('input[name="create-tags"]').val().split(',');
            np.status = 'published';
            np.content = $('textarea[name*="create-content"]').trumbowyg('html');
            posts['post' + np.id] = np;
            console.log(posts);
            setCookie("posts", JSON.stringify(posts), 1);
        } else {
            alert('Add at least title and content');
            e.preventDefault();
        }

    });

    $('.savepostdraft').click(function(e) {
        // e.preventDefault();

        var np = {};
        var posts = JSON.parse(getCookie("posts"));
        var postCount = Object.keys(posts).length;

        np.id = postCount + 1;

        if($('input[name="create-title"]').val() && $('textarea[name="create-content-html"]').val() ){
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
            alert('Add at least title and content');
            e.preventDefault();
        }
    });
}
