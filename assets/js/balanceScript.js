let apiUrl = "http://localhost:8080/MicroBank/"; 

$(document).ready(function(){

    let accountNo = sessionStorage.getItem("accountNo");


    $.ajax({
        url: apiUrl + "accounts/"+accountNo,  
        success:function(data) {
            displayBalance(data); 
        }
      });

    // $.get(apiUrl + "accounts/"+accountNo)
    // .complete(displayBalance)
    // .fail(function(){
    //     console.log("error in get account balance")
    //     })
    // .always(function(){
    //     console.log("get balance is finished.");

    // });

//     fetch(apiUrl + "accounts/"+accountNo,
//     {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//     })
//   .then(response => {displayBalance(response)})
//   .then(data => console.log(data));

    $("#search").on("submit",doSearch);

});

function displaySearch(res){

    let transactionList = "<tr>";
    for (let temp of res.data) {
        let date = +temp.date.year + "-" + temp.date.month + "-" + temp.date.day;

        transactionList += "<td>" + temp.accountNumber + "<td>" + temp.description + "</td>" + "<td>" + date + "</td>" + "<td>" + temp.transactionAmount + "</td>" + "</tr>";
    }

    $("#tranasactionBody").html(transactionList);
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