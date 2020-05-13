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

    
    document.getElementById("accno").value = sessionStorage.getItem("accountNo");
    document.getElementById("acc").value = sessionStorage.getItem("accountNo");
    document.getElementById("accountNo").value = sessionStorage.getItem("accountNo");
    document.getElementById("inputNumber").value = sessionStorage.getItem("accountNo");

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

}

function addNewAccount() {

    const accno= $("#accno").val();
    const acctype= $("#acctype").val();
    const balance= $("#balance").val();
    const userName = sessionStorage.getItem("userName");
    const password = sessionStorage.getItem("password");

    let account = {
        type: acctype,
        accountNumber: accno,
        balance: balance,
        accountEntries: [],
        customer: {
            userName: userName,
            accountNumber: accno,
            password: password
        }
    }
    if(accno){
        sessionStorage.setItem("accountNo", accno);
    }
    
    document.getElementById("acc").value = sessionStorage.getItem("accountNo");
    document.getElementById("accountNo").value = sessionStorage.getItem("accountNo");
    document.getElementById("inputNumber").value = sessionStorage.getItem("accountNo");

    fetch(appUrl + "accounts/save", {

        method: "POST",
        body: JSON.stringify(account),
        headers: {"Content-Type": "application/json"}
    })
    .then(function(res) {return res.json();})
    .then(function(data) {
        $("#saveAccountMessage").html("Account No: " + accno + " Saved Successfully.");
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
    })
    .then(function(res) {return res.json();})
    .then(function(data) {
        $("#depositeMessage").html("Account No: " + accountNumber + " has been deposited with " + amount + " Dollars Successfully.");
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
    })
    .then(function(res) {return res.json();})
    .then(function(data) {
        $("#withdrawMessage").html("Account No: " + accountNumber + " has been withdraw transaction with " + amount + " Dollars Successfully.");
    });

}





