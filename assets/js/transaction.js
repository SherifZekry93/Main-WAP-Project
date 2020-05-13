let appUrl = "http://localhost:8080/MicroBank/";


var section1 = document.getElementById("sec1");
var section2 = document.getElementById("sec2");
var section3 = document.getElementById("sec3");
var section4 = document.getElementById("sec4");

function depositeMenu() {
    if (section2.className === 'hidden') {
        section1.className = 'hidden';
        section3.className = 'hidden';
        section4.className = 'hidden';
        section2.className = 'show';    
    }
}
function withdraweMenu() {
    if (section4.className === 'hidden') {
        section1.className = 'hidden';
        section2.className = 'hidden';
        section3.className = 'hidden';        
        section4.className = 'show';    
    }
}
function listTransactionMenu() {

    if (section3.className === 'hidden') {
        section2.className = "hidden";
        section1.className = "hidden";
        section4.className = 'hidden';
        section3.className = "show";

    }
}
function createAccountMenu() {
     if (section1.className === 'hidden') {
         section2.className = 'hidden';
         section3.className = 'hidden';
         section4.className = 'hidden';
         section1.className = 'show ';

     }
 }

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
    $("#deposit").on('submit', deposit);
    $("#withdraw").on('submit', withdraw);
}) ;

function display(res) {
    // console.log(JSON.stringify(myJson));
    let transactionList = "<tr>";
    for (let temp of res.data) {
        let date = +temp.date.year + "-" + temp.date.month + "-" + temp.date.day;

        transactionList += "<td>" + temp.accountNumber + "<td>" + temp.description + "</td>" + "<td>" + date + "</td>" + "<td>" + temp.transactionAmount + "</td>" + "</tr>";
    }
    $("#transactionBody").html(transactionList);
}
function errorFunction() {
    console.log("faild to save");
}


function searchByAccount() {

    event.preventDefault();
    let accountNumber= $("#inputNumber").val();
     $.get(appUrl + "transaction/"+accountNumber)
    .done(display)
    .fail(errorFunction)
    .always(function(){
        console.log("So, this happened.");

    });


    fetch(appUrl + "transaction/"+accountNumber, 
    {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(display(res));

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
    });

}

function withdraw(evt) {
    evt.preventDefault();
    let accountNumber = document.getElementById("accountNo").value;      
    let amount = document.getElementById("withdrawAmount").value;

    let obj = {
            "accountNumber": accountNumber,
            "amount": amount
    }

     fetch(appUrl+"transaction/withdraw", {

        method: "POST",
        body: JSON.stringify(obj),
               headers: {
         "Content-Type": "application/json"
        }
    }).then(function(res) {return res.json();}).then(function(data) {
        alert(JSON.stringify(data))
    });

}





