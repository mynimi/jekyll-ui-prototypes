$(document).ready(function(){
    if (!getCookie('siteSettings')) {
        var siteSettings = {};
    }

    // LANGUAGE
    //----------
    // if language not set, set to english, else get cookie
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

    $('input[name="lang"][value="' + getCookie('language') + '"]').prop('checked', true);

    // SKIN
    //------
    if(getCookie('skin')){
        var skin = getCookie('skin');
        $('link[rel="stylesheet"]').attr('href', 'css/'+skin+'.css');
    }

    $('input[name="skin"][value="' + getCookie('skin') + '"]').prop('checked', true);

    $('.saveappsettings').click(function() {
        var lang = $('input[name="lang"]:checked').val();
        var skin = $('input[name="skin"]:checked').val();
        setCookie('language', lang, 1);
        setCookie('skin', skin, 1);
        location.reload();
    });

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
    
});
