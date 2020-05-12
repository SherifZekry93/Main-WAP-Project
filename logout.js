
$(document).ready(function(){
    $('#logout').click(function(){
  fetch("http://localhost:8080/MicroBank/user/logout/",{
    method: "POST",
        headers: {
    "Content-Type": "application/json"
}
    }).then(res => res.json()).then(function(res) {
        // window.location = "index.html";
    } )  
});
});