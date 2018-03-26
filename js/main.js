
$(document).ready(function(){
    // init vars
    if(!getCookie('siteSettings')){
        var siteSettings = {};
    }

    if(getCookie('siteSettings')){
        var s = JSON.parse(getCookie("siteSettings"));
        console.log(s);
        $('input[name="directory-path"]').val(s.directory.toString());
        $('input[name="project-name"]').val(s.projectName);
        $('input[name="publish-platform"][value="'+s.publishPlatform+'"]').prop('checked', true);
        $('input[name="ftp-host"]').val(s.ftpHost);
        $('input[name="ftp-username"]').val(s.ftpUsername);
        $('input[name="ftp-password"]').val(s.ftpPassword);
        $('input[name="ftp-port"]').val(s.ftpPort);
        $('input[name="ftp-directory"]').val(s.ftpDirectory);
        $('input[name="github-username"]').val(s.gitHubUsername);
        $('input[name="github-password"]').val(s.gitHubPassword);
        $('input[name="github-project-url"]').val(s.gitHubProjectUrl);
    }
    $('.create').click(function(){
        var siteSettings = {};
        if($('input[name="directory"]').length){
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

    $('[data-togglepopup]').each(function(){
        $(this).click(function(){
            var popupClass = $(this).data('togglepopup');
            $('.'+popupClass).fadeToggle();
            $('body').toggleClass('popup-open');
            $('body').append('<div class="behind-popup"></div>');
        });
    });
    $('body').on('click tap', '.behind-popup', function(){
        $('body').removeClass('popup-open');
        $('.popup').fadeOut();
        $(this).remove();
    });

    $('.wrap input').each(function(){
        var name = $(this).attr('name');
        if($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file'){
            $('label[for="'+name+'"]').addClass('up');
        } else{
            $('label[for="'+name+'"]').removeClass('up');
        }
    });
    $('.wrap input').focus(function(){
        var name = $(this).attr('name');
        $('label[for="'+name+'"]').addClass('up');
        $(this).parent().addClass('focus');
    });
    $('.wrap input').blur(function(){
        var name = $(this).attr('name');
        if($(this).attr('placeholder') || $(this).val() || $(this).attr('type') == 'file'){
            $('label[for="'+name+'"]').addClass('up');
        } else{
            $('label[for="'+name+'"]').removeClass('up');
        }
        $(this).parent().removeClass('focus');
    });

});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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
