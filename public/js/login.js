
//when document is ready
$(function () {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;


    function afterFailedLogin() {
        $('.close').click();
    }

    function afterSuccessLogin() {
        $('.close').click();

    }

    $("form").submit(function () {
        switch (this.id) {

            case "add-catalog-form":

                var src1 = $('#add_src').val();
                var src2 = $('#add_url').val();
                var file = document.getElementById('img_file').files[0];

                let catalog = {
                    name: $("#add_name").val(),
                    price: $("#add_price").val() + '$',
                    color: $('#add_color').val(),
                    src:"images/"+file.name
                };
                // if (typeSrc == "file_src") { //תמונה מהמחשב
                    imgFileF = $("#img_file").val();

                    if (file) {                                              // Do we have the file?

                        var xhr = new XMLHttpRequest();
                        if (xhr.upload) {                               // Does the browser know to upload? (AJAX2)

                            xhr.open("POST", "/catalog/upload", true);
                            xhr.setRequestHeader("X_FILENAME", file.name);   // Add the file name to the header
                            xhr.onload = function () {
                                if (xhr.status === 200) {
                                } else{
                                    alert('An error occurred! '+ xhr.status);}
                            };
                            xhr.send(file);                              // And now sending the file
                        } else {
                            alert("upload2");
                        }
                    }
                    else {
                        alert("לא נבחר קובץ");
                    }
                // }
                $.post("/catalog/add_catalog", catalog, function (data, status) {
                    dismissModal('myModal3');
                    loadHtmlToBody(data);
                    $('.close').click();
                });
                break;

            case "add-branch-form":
                let branch = {
                    name: $("#add_nameB").val(),
                    address: $("#add_address").val(),
                    phone: $('#add_phone').val(),
                    src:$('#add_srcB').val()
                };
                $.post("/branch/add_branch", branch, function (data, status) {
                    dismissModal('myModal4');
                    loadHtmlToBody(data);
                    $('.close').click();
                });
                break;


            case "add-user-form":
                let user = {
                    username: $("#add_username").val(),
                    password: $("#add_password").val(),
                    type: $('#add_type').val(),
                    flag:1
                };
                $.post("/users/add_user", user, function (data, status) {
                    dismissModal('myModal2');
                    loadHtmlToBody(data);
                    $('.close').click();
                });
                break;

            case "edit-user-form":
                let edituser = {
                    username: $("#edit_username").val(),
                    password: $("#edit_password").val(),
                    type: $('#edit_type').val(),
                    flag:1
                };
                $.post("/edit_user", edituser, function (data, status) {
                    dismissModal('editModal');
                    loadHtmlToBody(data);
                    $('.close').click();
                });
                break;

            case "login-form":
                var $lg_username = $('#login_username').val();
                var $lg_password = $('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error", () => afterFailedLogin());
                } else {
                    $.post("/index/login",
                        {
                            username: $lg_username,
                            pass: $lg_password,
                        },
                        function (data, status) {
                            if (data != "BAD") {
                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK",function () {
                                    // afterSuccessLogin();
                                    $('.close').click();
                                    // showAllButtons();
                                    $('#flower_catalog').show();
                                    $(".modal-backdrop.fade.show").hide();
                                    //$('#dynamic-body').clearCache();
                                    changeToLogoutButton();
                                    if(data.type=='MANAGER')
                                    {
                                        $('#edit_branch').show();
                                        $('#edit_user').show();
                                    }
                                    if(data.type=='WORKER')
                                    {
                                        $('#edit_user').show();
                                    }
                                });
                                //enableCatalogButton();
                            } else {
                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username or password is Incorrect", () => afterFailedLogin());

                            }
                        });

                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });


    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({height: $newH}, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText, callb) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function (cb) {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
            setTimeout(cb, 100);
        }, $msgShowTime, callb);
    }
    $("#removebuton").click(function () {
        debugger;
        var username = $('#usernamevalue').val();
        $.post("/remove_user",username, function (data, status) {
            loadHtmlToBody(data);
        });
    });
});

function logout() {
    $.get('/logout',function (data,status) {
        $('#logout_button_nav').hide();
        $('#login_button_nav').show();
        hideCategories();
        loadHtmlToBody(data);
    });
}



