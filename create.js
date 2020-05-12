
let appUrl = "http://localhost:8080/MicroBank/";

$(function() {
    console.log("have you ever come to this");
    $("#create").on('submit', payhandler);
    $("#deposit").on('submit', deposit);
})


function deposit(evt) {
    evt.preventDefault();
      let accno = document.getElementById("acc").value;
      console.log("halooo" + accno);
    let amount = document.getElementById("amount").value;

    let obj = {
            "accno": accno,
            "amount": amount
    }

     fetch(appUrl+"accounts/deposit", {

        method: "POST",
        body: JSON.stringify(obj),
               headers: {
         "Content-Type": "application/json"
        }
    }).then(function(res) {return res.json();}).then(function(data) {
        alert(JSON.stringify(data))
    })

}
function payhandler(evt) {
    evt.preventDefault();

    let account = document.getElementById("accno").value;
    let acctype = document.getElementById("acctype").value;
    let balance = document.getElementById("balance").value;

    let obj =  {
        "balance": balance,
        "type": acctype,
        "accountNumber": account
    }

    //    $.post("http://localhost:8080/EBanking/accounts/pay/", {
         
    //          data: {
    //              "rcv": account,
    //              "amount": amount
    //          }
    //     }).done(function(response) {console.log(response)}).fail(function(response)
    //     { console.log(response)});
    


    fetch(appUrl + "accounts/save", {

        method: "POST",
        body: JSON.stringify(obj),
               headers: {
         "Content-Type": "application/json"
        }
    }).then(function(res) {return res.json();}).then(function(data) {
        alert(JSON.stringify(data))
    })

}