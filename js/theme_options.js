if (!getCookie('themeOptionsInitial')) {
    var toInitial = {};
    toInitial.fontSize = 16;
    toInitial.containerWidth = 80;
    toInitial.maxWidth = 1400;
    toInitial.gutter = 20;
    toInitial.bgColor = '#f8f8f8';
    toInitial.mainColor = '#3b3b3e';
    toInitial.primary = '#bbd0e9';
    toInitial.secondary = '#333333';
    toInitial.header = '';
    toInitial.layout = 'full';
    setCookie('themeOptionsInitial', JSON.stringify(toInitial), 1);
    if (!getCookie('themeOptions')) {
        setCookie('themeOptions', JSON.stringify(toInitial), 1);
    }
}

if (~window.location.pathname.indexOf("themeoptions")) {
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
        $('.media-chooser img').attr('src', o.header);
        $('input[name="main-layout"][value="' + o.layout + '"]').prop('checked', true);
        $('input[name="create-layout"][value="' + o.layout + '"]').prop('checked', true);
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
        tO.header = $('.media-chooser img').attr('src');;
        tO.layout = $('input[name="main-layout"]:checked').val();
        setCookie('themeOptions', JSON.stringify(tO), 1);
        // alert('Changes saved');
        $( 'iframe' ).attr( 'src', function ( i, val ) { return val; });

    });

    $('.resetoptions').click(function() {
        var o = JSON.parse(getCookie("themeOptionsInitial"));
        $('input[name="root-font-size"]').val(o.fontSize);
        $('input[name="main-container-width"]').val(o.containerWidth);
        $('input[name="main-max-width"]').val(o.maxWidth);
        $('input[name="gutter-width"]').val(o.gutter);
        $('input[name="background-color"]').val(o.bgColor);
        $('input[name="main-color"]').val(o.mainColor);
        $('input[name="primary-color"]').val(o.primary);
        $('input[name="scnd-color"]').val(o.secondary);
        $('.media-chooser img').attr('src', o.header);
        $('input[name="main-layout"][value="' + o.layout + '"]').prop('checked', true);
    });

    $('input').on('change', function(){
        $('.saveoptions').click();
    });
    // $('.media-chooser img').attr('src').on('change', function(){
    //     $('.saveoptions').click();
    // });
}
