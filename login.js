function check_server() {
    window.serwer = localStorage.getItem("server");
    window.serwer_display = localStorage.getItem("server_name");
    if (window.serwer) {
        $("#serwer_name").empty();
        $("#login_form").css("display", "block");
        $("#serwer_form").css("display", "none");
        $("#serwer_name").append(window.serwer_display);
    } else {
        $("#serwer_form").css("display", "block");
        $("#login_form").css("display", "none");
    }
}

function add_serwer() {
    $("#server_error").css("display", "none");
    $("#no_server").css("display", "none");
    localStorage.removeItem('server');
    localStorage.removeItem('server_name');
    window.serwer_data = $("#serwer_form").serializeArray();
    /*nazwa serwera*/
    var server_name = serwer_data[0].value;


    if (server_name.indexOf("https://") > -1) {
        localStorage.setItem("server", server_name);
        localStorage.setItem("server_name", server_name);
        console.log(server_name);
        check_server();
        $("#load_assign_gif").css("display", "none");

    } else {
        $.ajax({
            type: 'GET',
            contentType: "text/xml",
            url: "http://www.fastdata.com.pl/kontrahenci/config.xml",
            success: function (data) {
                url_port = 0;
                console.log(data);
                var kontrahents = data.getElementsByTagName("kontrahent");
                var server_name_upper = server_name.toUpperCase();

                /*przeszukuje kontrahentow w wyszukiwaniu kodu */
                for (var i = 0; i < kontrahents.length; i++) {

                    if (server_name_upper == kontrahents[i].getElementsByTagName("kod")[0].innerHTML) {
                        url_port = kontrahents[i].getElementsByTagName("port")[0].innerHTML;
                    }

                }

                /*jezelei istnieje taki kod to*/
                if (url_port) {
                    var full_server_url = "https://" + server_name_upper + ".fastdata.com.pl:" + url_port;
                    console.log(full_server_url);
                    localStorage.setItem("server", full_server_url);
                    localStorage.setItem("server_name", server_name);
                    check_server();
                    $("#load_assign_gif").css("display", "none");



                } else {
                    $("#no_server").css("display", "block");

                }


            },
            error: function (xhr, err) {
                $("#server_error").css("display", "block");

            }
        });
    }


    /*check_server();
     $("#load_assign_gif").css("display", "none");
     var index = window.serwer.indexOf("/");
     index = index + 1;
     window.header = window.serwer.substr(0, index);
     window.rest_url = window.serwer.substr(index + 1);*/
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

    /*pobranie serwera*/
    window.serwer = localStorage.getItem("server");

    var index = window.serwer.indexOf("/");
    index = index + 1;
    window.header = window.serwer.substr(0, index);
    window.rest_url = window.serwer.substr(index + 1);

    window.login_data = $("#login_form").serializeArray();
    window.username = login_data[0].value.toUpperCase();
    window.password = login_data[1].value;
    if (window.password == "" && window.username == "") {
        window.username = "a";
        window.password = "a";
    }


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
        error: function (xhr, err) {
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


