let appUrl = "http://localhost:8080/MicroBank/";

$(document).ready(function () {

    // $.get(appUrl + "transaction/")
    //     .done(display)
    //     .fail(errorFunction)
    //     .always(function () {
    //     });
    $("#searchByAccount").on("submit", searchByAccount);
    $("#create").submit(function(event) {
            event.preventDefault();
           addNewAccount(); 
        }
    );
    $("#deposit").on('submit', deposit);
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

    fetch(appUrl + "accounts/save", {

        method: "POST",
        body: JSON.stringify(account),
        headers: {"Content-Type": "application/json"}
    })
    .then(function(res) {return res.json();})
    .then(function(data) {
        alert(JSON.stringify(data))
    });

}

function deposit(evt) {
    evt.preventDefault();
      let accountNumber = document.getElementById("acc").value;
      console.log("halooo" + accountNumber);
    let amount = document.getElementById("amount").value;

    let obj = {
            "accountNumber": accountNumber,
            "amount": amount
    }

     fetch(appUrl+"transaction/deposit", {

        method: "POST",
        body: JSON.stringify(obj),
               headers: {
         "Content-Type": "application/json"
        }
    }).then(function(res) {return res.json();}).then(function(data) {
        alert(JSON.stringify(data))
    })

}





