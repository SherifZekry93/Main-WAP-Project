
$(document).ready(function () {

    $.get("http://localhost:8080/EBanking/transaction/")
        .done(display)
        .fail(errorFunction)
        .always(function () {
        });
    $("#searchByAccount").on("submit", searchByAccount);

});

function display(data) {
    // console.log(JSON.stringify(myJson));
    let transactionList = "<tr>";
    for (let temp of data) {
        let date = +temp.date.year + "-" + temp.date.month + "-" + temp.date.day;

        transactionList += "<td>" + temp.accountNumber + "<td>" + temp.transactionId + "</td>" + "<td>" + date + "</td>" + "<td>" + temp.transactionAmount + "</td>" + "</tr>";
    }
    $("#transactionBody").html(transactionList);
}
function errorFunction() {
    console.log("hi")
}


function searchByAccount(data) {

    event.preventDefault();
    let accountNumber= $("#inputNumber").val();
     $.get("http://localhost:8080/EBanking/transaction/"+accountNumber)
    .done(display)
    .fail(errorFunction)
    .always(function(){
        console.log("So, this happened.");

    });
}

