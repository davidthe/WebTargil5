function hideCatalogButton() {
    $('#flower_catalog').hide();
}

function hideManagment() {
    $('#list-group').hide();
}

function hideCatalog() {
    $('#catalog-con').hide();
}

function showCatalogButton() {
    let catBtn = $('#flower_catalog');
    catBtn.show();
    catBtn.click(function () {
        $.get("/catalog", function(data, status){
            loadHtmlToBody(data);
        });
    });
}

function showManagmentButton() {
    $('#categories').show();
}

function changeToLogoutButton() {
    // language=JQuery-CSS
    let lg_btn = $('#login_button_nav');
    if(lg_btn) { // turn to logout
        lg_btn.hide();
        $('#logout_button_nav').show();
        $('#logout_button_nav').click(function () {
            logout();
        });
    }

}

function showCatalog() {
    $('#catalog-container').show();
}

function hideWelcomePage() {
    $('#welcome_page').hide();
}

function showAllButtons() {
    showCatalogButton();
    //showCategories();
}

function hideCategories() {
    $('#categories').hide();
}

function loadHtmlToBody(data) {
    $('#dynamic-body').html(data);
}

/*function showCategories() {
    $('#categories').show();
    $('#users-man').click(function () {
        $.get("/users",function (data,status) {
            loadHtmlToBody(data);
        })
    });
    $('#branches-man').click(function () {
        $.get("/branches",function (data,status) {
            loadHtmlToBody(data);
        })
    });
}*/


$(function() {
    //hideManagment();
    //$('.col-md-3').hide();
    //hideCatalogButton();
    //hideCatalog();
    $('#logout_button_nav').hide();
    hideCategories();
    hideCatalogButton();
    $('#edit_branch').hide();
    $('#edit_user').hide();
    //$('#categories').hide();


});
