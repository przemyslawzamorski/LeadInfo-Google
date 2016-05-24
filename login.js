function check_server() {
    window.serwer = localStorage.getItem("server");
    if (window.serwer) {
        $("#serwer_name").empty();
        $("#login_form").css("display", "block");
        $("#serwer_form").css("display", "none");
        $("#serwer_name").append(window.serwer);
    } else {
        $("#serwer_form").css("display", "block");
        $("#login_form").css("display", "none");
    }
}

function add_serwer() {
    localStorage.removeItem('server');
    window.serwer_data = $("#serwer_form").serializeArray();
    var server_name = serwer_data[0].value;
    localStorage.setItem("server", server_name);
    check_server();
    $("#load_assign_gif").css("display", "none");
}

function change_serwer() {
    $("#load_assign_gif").css("display", "none");
    $("#serwer_form").css("display", "block");
    $("#login_form").css("display", "none");
    $("#login_error").css("display", "none");
    if (window.serwer) {
        $("#back-button").css("display", "inline-block");
    } else {
        $("#back-button").css("display", "none");
    }
}


function back_to_login() {
    $("#serwer_form").css("display", "none");
    $("#login_form").css("display", "block");

}


function log_in() {

    window.login_data = $("#login_form").serializeArray();
    window.username = login_data[0].value.toUpperCase();
    window.password = login_data[1].value;
    if (window.password == "" && window.username == "") {
        window.username = "a";
        window.password = "a";
    }

    var serwer_url = window.serwer;
    var index = serwer_url.indexOf("/");
    index = index + 1;
    window.header = serwer_url.substr(0, index);
    window.rest_url = serwer_url.substr(index + 1);
    $.ajax({
        type: 'GET',
        async: true,
        crossOrigin: true,
        dataType: "json",
        url: window.header + window.username + ":" + window.password + "@" + window.rest_url + "/rin/mob_leady?resultsPerPage=100",
        data: {},

        beforeSend: load_start(),
        success: function (data) {
            window.test = data;
            console.log("autoryzowano");
            $("#login_error").css("display", "none");
            $("#leeds-content").load('auth_app.html');
            $("#leeds-content").css("display", "block");
            $("#login").css('display', "none");
            $("#contact_info_load").remove();
        },
        error: function (xhr,err) {
            console.log("nie autoryzowano");
            $("#login_error").css("display", "block");

            $("#password").val('');
            $("#username").val('');
            $("#contact_info_load").remove();
        }
    });
}

function load_start() {
    $("#login_form").append(' <div id="contact_info_load" class="col-centered" style="text-align: center; padding-top: 15px;"><img src="ajax-loader.gif" ></div>');
}


