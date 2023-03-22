
let fname = document.getElementById('name_regist'),
    surname = document.getElementById('surname_regist'),
    password = document.getElementById('password_regist'),
    repeat_password = document.getElementById('repeat_password_regist'),
    email_regist = document.getElementById('email_regist'),
    address = document.getElementById('address_regist'),
    message = document.getElementById('message'),
    registration_btn = document.getElementById('registration_btn');


//Create a new account
//-----------------------------------------------------------------------------
async function createAccount(data) {
    await fetch("../php/user.php", data)
        .then((response) => response.text())
        .then((text) => {
            console.log("/" + text + "/");
            if (text == '\nSucces!') {
                message.textContent = text;
                message.style.color = 'green';
                setTimeout(() => {
                    window.location = "../html/login.php";
                }, 2000)
            } else {
                message.textContent = text;
                message.style.color = 'red';
            }
        });
}

//Registration button functionality
//-----------------------------------------------------------------------------
registration_btn.addEventListener('click', (ev) => {
    ev.preventDefault();
    message.textContent = '';

    let fname_v = fname.value,
        surname_v = surname.value,
        password_v = password.value,
        repeat_ps_v = repeat_password.value,
        address_v = address.value,
        email_v = email_regist.value;

    if (fname_v != '' && surname_v != '' && password_v != ''
        && repeat_ps_v != '' && address_v != '') {
        createAccount({
            method: 'POST',
            body: `operation=new_user&name=${fname_v}&surname=${surname_v}&password=${password_v}&repeat_password=${repeat_ps_v}&address=${address_v}&email=${email_v}`,
            headers: new Headers({
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        });
    } else {
        message.textContent = 'Compleate all inputs please!';
        message.style.color = 'red';
    }
});


