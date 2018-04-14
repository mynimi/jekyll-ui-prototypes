$('header b').click(function(){
    if(confirm('Do you Really Want to Delete All Things You Changed?')){
        document.cookie = 'themeOptions' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'sidebar' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'siteSettings' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'skin' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'language' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'posts' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'postsTotal' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'currentEdit' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'pages' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'pagesTotal' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'navigation' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
        document.cookie = 'siteConfig' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT, path=/;';
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
