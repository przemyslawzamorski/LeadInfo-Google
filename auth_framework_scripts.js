/* ----funkcje fraeworka --*/

/*funkcja framework - pobiera okreslony typ danych*/
function get_date_type(asyncvalue, type, succesfunction, errorfunction) {
    $.ajax({
        type: 'GET',
        async: asyncvalue,
        url: window.serwer + "/rin/" + type,
        processData: true,
        data: {},
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            succesfunction(data);
        },
        error: function (data) {
            errorfunction(data);
        }
    });
}

/*funkcja framework - wykonuje operacje z podanymi danymi typu data: "{\"LEADYLEADID\":" + window.object.LEADID + " }\n" */
function execute_given_operation(operation, operation_data, succes_function, error_function, complete_function, done_function) {
    $.ajax({
        async: true,
        url: window.serwer + "/ope/" + operation,
        method: "POST",
        dataType: 'json',
        data: operation_data,
        success: function (data) {
            succes_function(data);
        },
        error: function (data) {
            error_function(data);
        },
        complete: function (data) {
            complete_function(data);
        }

    }).done(function (data) {
        done_function(data);
    });
}

/*funkcja framework -  obliczajaca roznice czasowo*/
function time_difference(time_given) {

    var leed_date = time_given;
    leed_date = leed_date.split(/(?:-| |:)+/);
    var correct_month = leed_date[1] - 1;
    var lead_time = new Date(leed_date[0], correct_month, leed_date[2],
        leed_date[3], leed_date[4], leed_date[5]);
    var current_time = new Date(Date.now());
    var diffMs = (lead_time - current_time );

    var diffSeconds = diffMs / 1000;
    var HH = diffSeconds / 3600;
    var MM = (diffSeconds % 3600) / 60;
    var DD = HH / 24;
    console.log(DD + '' + HH + ' ' + MM);

    if (DD != 0) {
        var time_status = parseInt(DD) + " dni";
    } else if (DD == 0 && HH != 0) {
        var time_status = parseInt(HH) + " godzin";
    } else {
        var time_status = parseInt(MM) + " minut";
    }
    return time_status;
}