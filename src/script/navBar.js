
//Switch Login/Logout buttons
//-----------------------------------------------------------------------------
function buttonsSwitch() {
    let login_btn_div = document.getElementById('login_btn_div'),
        logout_btn_div = document.getElementById("logout_btn_div");

    //Switch buttons Login/Logout
    if (sessionStorage.logedIn == 'true') {
        logout_btn_div.style.display = 'block';
        login_btn_div.style.display = 'none';
    } else {
        logout_btn_div.style.display = 'none';
        login_btn_div.style.display = 'block';
    }
}

//Update Basket content
//-----------------------------------------------------------------------------
function updateBasket() {
    let basketData = JSON.parse(sessionStorage.basket);
    let basketBox = document.getElementById('basket_list');
    let totalPrice_box = document.getElementById('total_sum');

    let userSession = JSON.parse(sessionStorage.userSession);

    userSession.products = basketData;
    sessionStorage.userSession = JSON.stringify(userSession);

    basketBox.innerHTML = '';
    let totalPrice = 0;

    //Render items in the basket
    basketData.forEach(product => {
        requestDatabase((data) => {
            data.forEach(item => {
                if (item._id.$oid == product[0]) {

                    let img = item.image_url,
                        name = item.name,
                        price = item.price;

                    totalPrice += (price * product[1]);

                    //Item HTML
                    let body = `<div class="product_bsk">
                                    <img class="product_img_bsk" src="${img}"/>
                                    <div class="product_data_bsk">
                                        <div class="product_name_bsk">Name: ${name}</div>
                                        <div class="product_info_bsk">
                                            <span class="product_price_bsk">Price: ${price}$</span>
                                            <span class="product_quantity_bsk">Quantity: ${product[1]}</span>
                                        </div>
                                    </div>
                                </div>`;

                    //Insert Item HTML in the basket
                    basketBox.innerHTML += body;
                }
            });
            //Insert total price in the basket
            totalPrice_box.innerHTML = "Total: " + totalPrice + "$";

        });
    });



}

//Insert user session in database
//-----------------------------------------------------------------------------
async function insertCardHistory(data) {
    await fetch("../php/insertData.php", data)
        .then((response) => response.text())
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

//Create a empty Basket
//-----------------------------------------------------------------------------
if (sessionStorage.getItem("basket") === null) {
    sessionStorage.basket = JSON.stringify([]);
}

//Set default logedIn status false
if (sessionStorage.getItem("logedIn") === null) {
    sessionStorage.logedIn = false;
}


let today = new Date(),
    today_date = today.toJSON().slice(0, 10).replace(/-/g, '/'),
    time = today.getHours() + ":" + today.getMinutes();

let userSession = {
    customer_id: 'undefined',
    shipping_address: "undefined",
    date: today_date,
    time: time,
    products: [],
    search: []
}

if (sessionStorage.getItem("userSession") === null) {
    sessionStorage.userSession = JSON.stringify(userSession);
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
document.querySelector('.search_panel button').disabled = true;
let search_input = document.querySelector('.search_panel input'),
    logout_btn = document.getElementById('logout_btn');
let products_nr = 0;

//Search functionality
search_input.addEventListener('input', () => {
    let name = `name=${search_input.value}`;
    if (name == 'name=') { name = '' }

    requestDatabase(renderProducts, {
        method: 'POST',
        body: `operation=request_items&${name}`,
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        })
    });

    setTimeout(() => {
        let product = document.getElementsByClassName('product');

        if (products_nr == 0) {
            products_nr = product.length;
        }

        let userSession = JSON.parse(sessionStorage.userSession);

        if (product.length < products_nr && !userSession.search.includes(search_input.value) && product.length !== products_nr && search_input.value.length > 4) {
            userSession.search.push(search_input.value);
            sessionStorage.userSession = JSON.stringify(userSession);
        }
    }, 1000)

})

//Logout functionality
logout_btn.addEventListener('click', () => {
    sessionStorage.user = '[{"status": false}]';
    sessionStorage.logedIn = false;
    logout_btn_div.style.display = 'none';
    login_btn_div.style.display = 'block';
    window.location = '../html/home.php';
})

let post = {
    method: 'POST',
    body: `operation=insert_session&userSession=${sessionStorage.userSession}`,
    headers: new Headers({
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    })
}


//Insert user session on page unload
window.addEventListener('unload', () => {
    insertCardHistory(post);
});

//Calls
updateBasket();
buttonsSwitch();