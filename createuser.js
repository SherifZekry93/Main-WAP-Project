$(document).ready(function() {
    $("#forms").submit(function(event) {
        event.preventDefault();
        const uername = $('#createUsername').val();
        const password = $('#createPassword').val();
        const account = $('#createAccountNumber').val();
        const confirm = $('#confirmPassword').val();
        if (password === confirm) {
            const data = {
                userName: uername,
                accountNumber: account,
                password: password
            }
            fetch("http://localhost:8080/EBanking/user/", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(res) { return res.json(); }).then(res => redirect(res));


        } else {
            console.log("notmatch");
            $('p').append("Mis-match password!");
        }

    })

    function redirect(inputData) {
        if (inputData == true) {
            window.location = "userHome.html";
        } else {
            alert("User alrady exist!");
        }
    }
});