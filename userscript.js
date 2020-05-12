$(document).ready(function () {
  $("#formsignin").submit(function (event) {
    console.log("Submited");
    event.preventDefault();
    const uername = document.getElementById("enterUsername").value;
    const password = document.getElementById("enterPassword").value;
    const data = {
      "userName": uername,
      "password": password
    }
    const request = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log("REquest", request);

    fetch("http://localhost:8080/MicroBank/user/login/", request).then(response => response.json())
      .then(response => {
          redirect(response)
      }
      )
  });
  function redirect(success) {
    if (success == true) {
      window.location = "userHome.html?username="+document.getElementById("enterUsername").value;
    }
    else {
      alert("username or password are incorrect!");
    }
  }
});

