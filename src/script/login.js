let email_input = document.getElementById("email_input"),
    password_input = document.getElementById("password_input"),
    login_btn = document.getElementById("login_btn"),
    message_box = document.getElementById("message");


//Check user database for Email - Password combination
//-----------------------------------------------------------------------------
async function checkUserData(data) {
    await fetch("../php/user.php", data)
        .then((response) => response.json())
        .then((data) => {
            if (data[0]['status'] != false) {
                sessionStorage.user = JSON.stringify(data);
                sessionStorage.logedIn = true;
                message_box.textContent = 'Welcome!';
                message.style.color = 'green';

                let userSession = JSON.parse(sessionStorage.userSession);
                userSession.customer_id = data[0]['_id']['$oid'];
                userSession.shipping_address = data[0]['address'];
                sessionStorage.userSession = JSON.stringify(userSession);

                buttonsSwitch();
                setTimeout(() => {
                    window.location = '../html/products.php';
                }, 1000);
            } else {
                message_box.textContent = 'Incorrect email or password';
                message.style.color = 'red';
            }
        }).catch((e) => {
            message_box.textContent = "Error!";
            message.style.color = 'red';
        })
}

//Login button functionality
//-----------------------------------------------------------------------------
login_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let email = email_input.value,
        password = password_input.value;

    message_box.textContent = "";

    if (email != "" && password != "") {
        checkUserData({
            method: 'POST',
            body: `operation=login_user&email=${email}&password=${password}`,
            headers: new Headers({
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
    } else {
        message_box.textContent = 'Compleate all inputs please!';
        message.style.color = 'red';
    }
});