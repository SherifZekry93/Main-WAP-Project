$(function() {
    console.log("have you ever come to this");
    $("#transfer").on('submit', payhandler);
})

function payhandler(evt) {
    evt.preventDefault();

    let account = document.getElementById("account").value;
    let amount = document.getElementById("amount").value;

    let obj =  {
        "rcv": account,
        "amount": amount
    }

    //    $.post("http://localhost:8080/EBanking/accounts/pay/", {
         
    //          data: {
    //              "rcv": account,
    //              "amount": amount
    //          }
    //     }).done(function(response) {console.log(response)}).fail(function(response)
    //     { console.log(response)});
    


    fetch("http://localhost:8080/EBanking/accounts/pay/", {

        method: "POST",
        body: JSON.stringify(obj),
               headers: {
         "Content-Type": "application/json"
        }
    }).then(function(res) {return res.json();}).then(function(data) {
        alert(JSON.stringify(data))
    })

}