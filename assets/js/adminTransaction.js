let appUrl = "http://localhost:8080/MicroBank/";

$(document).ready(function () {

    // $.get(appUrl + "transaction/")
    //     .done(display)
    //     .fail(errorFunction)
    //     .always(function () {
    //     });
    $("#searchByAccount").on("submit", searchByAccount);
    $("#createAccountForm").submit(function(event) {
            event.preventDefault();
           addNewAccount(); 
        }
    );
}) ;

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
    console.log("faild to save");
}


function searchByAccount(data) {

    event.preventDefault();
    let accountNumber= $("#inputNumber").val();
     $.get(appUrl + "transaction/"+accountNumber)
    .done(display)
    .fail(errorFunction)
    .always(function(){
        console.log("So, this happened.");

    });
}

function addNewAccount() {

    const accno= $("#accno").val();
    const acctype= $("#acctype").val();
    const balance= $("#balance").val();
    let account = {
        type: acctype,
        accountNumber: accno,
        balance: balance,
        accountEntries: [],
        customer: {
            userName: "ahmad",
            accountNumber: accno,
            password: "123"
        }
    }

    $.post(appUrl + "accounts/save", account)
    .done(alert("Account saved successfully." + data))
    .fail(errorFunction)
    .always(function(){
        console.log("accounts save called.");
    });
}

function saveSuccessed(data)
{
    alert("Account saved successfully." + data);
}





