
$(document).ready(function(){
    $('#logout').click(function(){
  fetch("http://localhost:8080/MicroBank/user/logout/",{
    method: "POST",
        headers: {
    "Content-Type": "application/json"
}
    }).then(res => res.json()).then(function(res) {
        redirect(res);
    })  
});
});
function redirect(res){
    if(res == true){
        sessionStorage.clear();
        
        window.location = "index.html";
        alert("you have logout successfully!")
    }
    else{
        alert("something wrong please try again!")
    }
}