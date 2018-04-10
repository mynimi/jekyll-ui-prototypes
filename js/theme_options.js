$(document).ready(function() {
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
    }
});