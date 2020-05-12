$(document).ready(function(){
    $("#form").submit(function(event){
      console.log("Submited");
        event.preventDefault();
        const uername = document.getElementById("user").value;
        const password = document.getElementById("password").value;
        const data = {
            "userName":uername,
            "password":password
        } 
        const request = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json"
          }
        }
        console.log("REquest", request);

        fetch("http://localhost:8080/EBanking/user/login/", request).then(response=>response.json())
         .then(response=>redirect(response))
         });
      
      function redirect(inputData){
        if(inputData==true){
          window.location = "userHome.html";
        }
         else {
          alert("invalid username or password");
         }
      }
        });
  