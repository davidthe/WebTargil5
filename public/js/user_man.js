function openEditUser(userid) {
    //let user = eval($('#edit-btn').id);
    $.post("/get_user", {id: userid}, function (data, status) {
        let user = data;
        $('#EditUserModal').modal('toggle');
        $('#edit-user-username').text(user.username);
        $('#edit-user-pass').text(user.password);
        $('#editMenu').text(user.type);
        $('#edit-user-btn').click(() => {
            let user = {
                username: $("#edit-user-username").val(),
                password: $("#edit-user-pass").val(),
                type: $('#editMenu').val()
            };
            $.post("/edit_user", user, function (data, status) {
                dismissModal('EditUserModal');
                loadHtmlToBody(data);
            });
        });
    });

}

function initDropbox() {
    $("#add-user-type").children().each(function () {
        $(this).click(function () {
            $("#addMenu").text($(this).text());
            $("#addMenu").val($(this).text());
        });
    });
}

function dismissModal(modalid) {
    $("#" + modalid).modal('hide');
}


function addUser() {

}

function initcatalog() {
    $("#flower_catalog").click(function () {
        $.get("/catalog/get_catalog", function (data, status) {
            loadHtmlToBody(data);
        });
    });
}

function initContact() {
    $("#contact_button").click(function () {
        $.get("/get_contact", function (data, status) {
            loadHtmlToBody(data);
        });
    });
}


// function addUser() {
//     $("#addUser").click(function () {
//         $.get("/add_user", function (data, status) {
//             loadHtmlToBody(data);
//         });
//     });
// }

function initBranch() {
    $("#edit_branch").click(function () {
        $.get("/branch/get_branch", function (data, status) {
            loadHtmlToBody(data);
        });
    });
}

function initUser() {
    $("#edit_user").click(function () {
        $.get("/users/get_user", function (data, status) {
            loadHtmlToBody(data);
        });
    });
}
function initAbout() {
    $("#about_button").click(function () {
        $.get("/get_about", function (data, status) {
            loadHtmlToBody(data);
        });
    });
}

function refresh_users(username) {
    $.get("/users/get_user", {id:username}, function (data, status) {
        loadHtmlToBody(data);
    });
}

function remove_user_Function(username) {
    $.post("/users/remove_user", {id:username}, function (data, status) {
        loadHtmlToBody(data);
    });
}

function promote_user_Function(username) {
    $.post("/users/promote_user", {id:username}, function (data, status) {
        loadHtmlToBody(data);
    });
}

function add_user_Function() {
    $.get("add_user_link", function (data, status) {
        loadHtmlToBody(data);
    });
    $('#editModal2').modal('show');
}

$(function () {
    initDropbox();
    initcatalog();
    initContact();
    initBranch();
    initUser();
    initAbout();
});