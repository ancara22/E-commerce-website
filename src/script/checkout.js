//Place an Order
//-----------------------------------------------------------------------------
async function placeOrder(data) {
    await fetch("../php/insertData.php", data)
        .then((response) => response.text())
        .then((data) => {
            if (data == 'true') { return true; }
        })
}

//Update user data
//-----------------------------------------------------------------------------
async function updateUserData(data) {
    await fetch("../php/updateData.php", data)
        .then((response) => response.text())
        .then((data) => console.log(data))
}

//stop scrolling 
//-----------------------------------------------------------------------------
function stopScrolling() {
    document.body.classList.add("stop-scrolling");
}

//Enable scrolling
//-----------------------------------------------------------------------------
function enableScrolling() {
    document.body.classList.remove("stop-scrolling");
}

//Render Checkout products
//-----------------------------------------------------------------------------
function renderCheckout() {
    let checkoutList = document.getElementById('product_list'),
        total_box = document.getElementById('total_s'),
        totalPrice = 0;

    //Checking if basket exist and it is not empty, else print the message
    if (sessionStorage.basket === undefined || JSON.parse(sessionStorage.basket).length == 0) {
        checkoutList.innerHTML = `<span id='empty_msg'>No products in the Basket</span>`
    } else {
        let basketData = JSON.parse(sessionStorage.basket);

        //Render products from the basket
        basketData.forEach(product => {
            //Request data
            requestDatabase((respons) => {
                respons.forEach(item => {
                    if (item._id.$oid == product[0]) {
                        //Get product data
                        let img = item.image_url,
                            name = item.name,
                            price = item.price;

                        totalPrice += (price * product[1]);    //Calculate total price

                        //HTMl Product body
                        let body = `<div class="product_co">
                                        <img class="product_img_co" src="${img}"/>
                                        <div class="product_data_co">
                                            <div class="product_name_co">Name: ${name}</div>
                                            <div class="product_info_co">
                                                <span class="product_price_co">Price: ${price}$</span>
                                                <span class="product_quantity_co">Quantity: ${product[1]}</span>
                                            </div>
                                        </div>
                                    </div>`;

                        checkoutList.innerHTML += body;             //Insert Product HtML
                        sessionStorage.totalPrice = totalPrice;     //Save total price in sessionstore
                        total_box.textContent = 'Total: ' + totalPrice + '$';   //Show total price on the page
                    }
                });
            });
        });
    }
}

//Add Close functionallity to a button
//-----------------------------------------------------------------------------
function addCloseFunction(body) {
    let close_btn = document.getElementById("close_btn");

    //Add close event
    close_btn.addEventListener("click", (ev) => {
        let box = document.getElementById("user_box_background"),
            box_content = document.getElementById("user_box");

        box.style.display = "none";   //Hide box
        enableScrolling();  //Enable scrolling after box closing
        box_content = body;
    });

}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

//If user is not logged in, send him to login page
if (sessionStorage.logedIn == 'false') {
    window.location = '../html/login.php';
}


//Calls
//-----------------------------------------------------------------------------
renderCheckout();


//Defines
let user_box = document.getElementById('user_box_background'),
    box = document.getElementById('user_box'),
    checkout_btn = document.querySelector('#checkout_btn_page button'),

    //Checkout HTML box
    box_body = `<button id="close_btn">X</button>
                <div >
                    <label for="name">Name:</label>
                    <input id="user_name" name="name" type="text" require>
                </div>
                <div>
                    <label for="surname">Surname:</label>
                    <input id="user_surname" name="surname" type="text" require>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input id="user_email" name="email" type="text" require>
                </div>
                <div>
                    <label for="address">Address:</label>
                    <input id="user_address" name="address" type="text" require>
                </div>
                <button id="buy_btn">Buy</button>`;


//Add event to cheackout button
checkout_btn.addEventListener('click', () => {
    box.innerHTML = box_body;       //Insert the HTML code on the page
    stopScrolling();                //Stop scrolling
    addCloseFunction(box_body);     //Add close functionality
    user_box.style.display = 'block';   //Show the box

    //Get inputs
    let user_name = document.getElementById('user_name'),
        user_surname = document.getElementById('user_surname'),
        user_email = document.getElementById('user_email'),
        user_address = document.getElementById('user_address'),
        buy_btn = document.getElementById('buy_btn');

    //Get user data from sessionstorage
    let user = JSON.parse(sessionStorage.user)[0],
        basket = JSON.parse(sessionStorage.basket);

    //Set inputs values
    user_name.value = user.name;
    user_surname.value = user.surname;
    user_email.value = user.email;
    user_address.value = user.address;


    //Add a event to BUY button
    buy_btn.addEventListener('click', () => {
        let user = JSON.parse(sessionStorage.user)[0];

        //Update user data in database
        updateUserData({
            method: 'POST',
            body: `operation=update_user&id=${user._id.$oid}&name=${user_name.value}&surname=${user_surname.value}&email=${user_email.value}&address=${user_address.value}`,
            headers: new Headers({
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        });

        //Get new user data from inputs
        user.name = user_name.value;
        user.surname = user_surname.value;
        user.email = user_email.value;
        user.address = user_address.value;

        //set new user data
        sessionStorage.user = JSON.stringify([user]);

        //Insert order in database
        if (basket.length > 0) {
            let basket_data = [];
            let sum = parseFloat(sessionStorage.totalPrice);

            basket.forEach(product => {
                basket_data.push([product[1], product[0]])
            });

            let today = new Date(),
                today_date = today.toJSON().slice(0, 10).replace(/-/g, '/'),
                time = today.getHours() + ":" + today.getMinutes();

            let order = {
                customer_id: "" + user._id.$oid,
                shipping_address: user_address.value,
                date: today_date,
                time: time,
                products: JSON.stringify(basket_data),
                total_cost: sum
            }

            let placeStatus = placeOrder({
                method: 'POST',
                body: `operation=insert_order&customer_id=${order.customer_id}&shipping_address=${order.shipping_address}&date=${order.date}&time=${order.time}&products=${order.products}&total_cost=${order.total_cost}`,
                headers: new Headers({
                    'Accept': 'application/json, text/plain, */*',
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            });

            if (placeStatus) {
                sessionStorage.basket = JSON.stringify([]);
                setTimeout(() => {
                    window.location = '../html/orders.php';
                }, 1000)
            }

            box.innerHTML = `
                <h1 id='message_order'>Succes. Order placed!</h1>`;

        } else {
            //Change the box HTML
            box.innerHTML = `
                <button id="close_btn">X</button>
                <h1 id='message_order' style='color: red'>Basket is Empty!</h1>`;
            addCloseFunction(box_body);
        }
    })
})