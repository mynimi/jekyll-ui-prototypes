$(document).ready(function() {
    var pageItems = [];
    var pages = {};

    if(getCookie("pages")){
        console.log('pages cookie exists');
        var pages = JSON.parse(getCookie("pages"));

        $.each(pages, function(){
            pageItems.push('<tr><td>' + this.id + '</td><td>' + this.title + '</td><td>' + this.status + '</td><td><a class="editpage btn" href="editpage.html" data-edit-page-id="' + this.id + '">Edit</a><a class="deletepage btn" href="#" data-delete-page-id="' + this.id + '">Delete</a><a class="duplicatepage btn" href="#" data-duplicate-page-id="' + this.id + '">Duplicate</a></td></tr>');
        });
    } else{
        console.log('pages Cookie doesnt exist');
        $.getJSON("js/pages.json", function(json) {

            $.each(json, function() {
                var page = {};
                page.id = this.id;
                page.title = this.title;
                page.description = this.description;
                page.layout = this.layout;
                page.status = this.status;
                page.content = this.content;
                pages["page" + page.id] = page;
                pageItems.push('<tr><td>' + this.id + '</td><td>' + this.title + '</td><td>' + this.status + '</td><td><a class="editpage btn" href="editpage.html" data-edit-page-id="' + this.id + '">Edit</a><a class="deletepage btn" href="#" data-delete-page-id="' + this.id + '">Delete</a><a class="duplicatepage btn" href="#" data-duplicate-page-id="' + this.id + '">Duplicate</a></td></tr>');
            });

            setCookie("pages", JSON.stringify(pages), 1);
            pages = JSON.parse(getCookie("pages"));
        });
    }

    if(~window.location.pathname.indexOf("pages")){
        $('tbody').append(pageItems);
        $('table').on('click', '.editpage', function(e) {
            $(this).each(function() {
                var id = $(this).data('edit-page-id');
                pages = JSON.parse(getCookie("pages"));
                console.log(pages);
                var p = pages["page" + id];
                console.log(p.content);
                setCookie("currentEdit", JSON.stringify(p), 1);
            });
        });
        $('table').on('click', '.deletepage', function(e) {
            pages = JSON.parse(getCookie("pages"));
            var id = $(this).data('delete-page-id');
            var p = pages["page" + id];
            if (confirm('Are you sure your want to delete '+p.title+'?')) {
                delete pages["page" + id];
                setCookie("pages", JSON.stringify(pages), 1);
                location.reload();
            }
        });
        $('table').on('click', '.duplicatepage', function(e) {
            pages = JSON.parse(getCookie("pages"));
            var id = $(this).data('duplicate-page-id');
            var p = pages["page" + id];
            var pageCount = Object.keys(pages).length;

            pages["page"+(pageCount+1)] = p;

            pages["page"+(pageCount+1)].id = pageCount + 1;

            console.log(pages);

            setCookie("pages", JSON.stringify(pages), 1);
            location.reload();
        });
    }

    if (~window.location.pathname.indexOf("editpage")) {
        if (getCookie("currentEdit")) {
            var cp = JSON.parse(getCookie("currentEdit"));
            $('input[name="edit-title"]').val(cp.title);
            // $('textarea[name*="edit-content"]').val(cp.content);
            $('#edit-content-html').trumbowyg('html', cp.content);
            $('input[name="edit-description"]').val(cp.description);
            $('input[name="edit-layout"][value="' + cp.layout + '"]').prop('checked', true);
            $('.feat-img').append('<img src="img/' + cp.featuredImage + '">');
        }
        $('.publishedit').click(function(e) {
            var ce = {};
            var cp = JSON.parse(getCookie("currentEdit"));
            ce.id = cp.id;
            ce.title = $('input[name="edit-title"]').val();
            ce.description = $('input[name="edit-description"]').val();
            ce.layout = $('input[name="edit-layout"]:checked').val();
            ce.status = 'published';
            ce.content = $('#edit-content-html').trumbowyg('html');
            setCookie("currentEdit", JSON.stringify(ce), 1);
            pages = JSON.parse(getCookie("pages"));
            console.log(pages);
            pages['page' + ce.id] = ce;
            setCookie("pages", JSON.stringify(pages), 1);
        });

        $('.savedraft').click(function(e){
            var ce = {};
            var cp = JSON.parse(getCookie("currentEdit"));
            ce.id = cp.id;
            ce.title = $('input[name="edit-title"]').val();
            ce.description = $('input[name="edit-description"]').val();
            ce.layout = $('input[name="edit-layout"]:checked').val();
            ce.status = 'draft';
            ce.content = $('#edit-content-html').trumbowyg('html');
            setCookie("currentEdit", JSON.stringify(ce), 1);
            pages = JSON.parse(getCookie("pages"));
            console.log(pages);
            pages['page' + ce.id] = ce;
            setCookie("pages", JSON.stringify(pages), 1);
        });
    }

    if (~window.location.pathname.indexOf("newpage")) {
        $('.publishpage').click(function(e) {
            // e.preventDefault();

            var np = {};
            var pages = JSON.parse(getCookie("pages"));
            var pageCount = Object.keys(pages).length;

            np.id = pageCount + 1;

            if($('input[name="create-title"]').val() && $('input[name="create-description"]').val() && $('input[name="create-date"]').val() && $('input[name="create-layout"]:checked').val() && $('input[name="create-featimg"]').val() && $('input[name="create-tags"]').val() && $('textarea[name="create-content-html"]').val() ){
                np.title = $('input[name="create-title"]').val();
                np.description = $('input[name="create-description"]').val();
                np.layout = $('input[name="create-layout"]:checked').val();
                np.status = 'published';
                np.content = $('textarea[name*="create-content"]').trumbowyg('html');
                pages['page' + np.id] = np;
                console.log(pages);
                setCookie("pages", JSON.stringify(pages), 1);
            } else {
                alert('Fill Out All fields');
                e.preventDefault();
            }

        });

        $('.savepagedraft').click(function(e) {
            // e.preventDefault();

            var np = {};
            var pages = JSON.parse(getCookie("pages"));
            var pageCount = Object.keys(pages).length;

            np.id = pageCount + 1;

            if($('input[name="create-title"]').val() && $('input[name="create-description"]').val() &&  $('input[name="create-layout"]:checked').val() && $('textarea[name="create-content-html"]').val() ){
                np.title = $('input[name="create-title"]').val();
                np.description = $('input[name="create-description"]').val();
                np.layout = $('input[name="create-layout"]:checked').val();
                np.status = 'draft';
                np.content = $('textarea[name*="create-content"]').trumbowyg('html');
                pages['page' + np.id] = np;
                console.log(pages);
                setCookie("pages", JSON.stringify(pages), 1);
            } else {
                alert('Fill Out All fields');
                e.preventDefault();
            }
        });
    }


    if(~window.location.pathname.indexOf("navigation")){
        var pageElems = [];
        $.each(pages, function(){
            var id = 'edit-title-'+this.title,
                item  = '<div class="menu-element dragable">';
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
            pageElems.push(item);
        });
        $('.pages').append(pageElems);
    }

});
