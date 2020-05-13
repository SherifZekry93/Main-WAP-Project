let apiUrl = "http://localhost:8080/MicroBank/"; 

$(document).ready(function(){

    $("#search").on("submit",doSearch);

});

function displaySearch(res){

    let transactionList = "<tr>";
    let balance = 0;
    for (let temp of res.data) {
        let date = +temp.date.year + "-" + temp.date.month + "-" + temp.date.day;
        transactionList += "<td>" + temp.accountNumber + "<td>" + temp.description + "</td>" + "<td>" + date + "</td>" + "<td>" + temp.transactionAmount + "</td>" + "</tr>";
        balance += temp.transactionAmount;
    }

    $("#tranasactionBody").html(transactionList);
    $("#balance-ammount").html(balance);
}

function doSearch(){
    event.preventDefault();
    
    let accountNo = sessionStorage.getItem("accountNo");

    let searchDate= $("#searchInput").val();
    let dates=searchDate.split("-");
    let datePath="?year="+dates[0]+"month="+dates[1]+"day="+dates[2];

    $.get(apiUrl + "transaction/"+accountNo)
    .done(displaySearch)
    .fail(function(){
        console.log("error in get search")
        })
    .always(function(){
        console.log("search is finished.");

    });

}

function errorFunction(){
console.log("error in get account balance")
}

function displayBalance(res){
    
    let balance=res.data.balance.toString();
    $("#balance-ammount").html(balance);
}