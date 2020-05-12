$(document).ready(function() {
    $("#formsignup").submit(function(event) {
        event.preventDefault();
        const uername = $('#createUsername').val();
        const password = $('#createPassword').val();
        const account = $('#createAccountNumber').val();
        const confirm = $('#confirmPassword').val();
        console.log(uername);
        console.log(password);
        console.log(account);
        console.log(confirm);
        
        if (password === confirm) {
            const data = {
                userName: uername,
                accountNumber: account,
                password: password
            }
            fetch("http://localhost:8080/MicroBank/user/signUp", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(res) { return res.json(); }).then(res => redirect(res)).catch(err =>{
                console.log("here is the error"+err)
            });


        } else {
            console.log("notmatch");
            $('p').append("Mis-match password!");
        }

    })

    function redirect(success) {
        if (success == true) {
            window.location = "userHome.html";
        } else {
            alert("error");
        }
    }
});