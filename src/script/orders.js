
//Render orders
//-----------------------------------------------------------------------------
function renderOrders(data) {
    let orders_container = document.getElementById('orders-container');
    orders_container.innerHTML = `<h2 class='margin-auto'>My orders history</h2>`;

    data.forEach(order => {
        let id = order['_id'],
            date = order['date'],
            time = order['time'],
            total = order['total_cost'],
            products = order['products'];

        let productsArray = '';

        products.forEach(product => {
            let filter = {
                method: 'POST',
                body: `operation=request_items&product=${product['product_id']['$oid']}`,
                headers: new Headers({
                    'Accept': 'application/json, text/plain, */*',
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            }

            requestProduct(filter).then((data) => {
                let product_body = `<div class="product_o">
                                        <img class="product_img_o" src=${data[0].image_url}/>
                                        <div class="product_data_o">
                                            <div class="product_name_o">Name: ${data[0].name}</div>
                                            <div class="product_code_o">Code: ${data[0].product_code}</div>
                                            <div class="product_info_o">
                                                <span class="product_price_o">Price: ${data[0].price}$</span>
                                                <span class="product_quantity_o">Quantity: 1</span>
                                            </div>   
                                        </div>
                                    </div>  `;

                productsArray += product_body;
            });
        });

        setTimeout(() => {
            let body = `<div class="order_box">
                            <div class="order_info">
                                <div class="order_date">Date: ${date}  ${time}</div>
                                <div class="order_id">Order id: ${id.$oid}</div>
                            </div>
                            <div id="products_box"> ${productsArray}</div>
                            <div class="order_total">Total: ${total}$</div>
                        </div>`;

            orders_container.innerHTML += body;
        }, 2000);
    });
}

//Request orders from database
//-----------------------------------------------------------------------------
async function requestOrders(callback, filter) {
    await fetch("../php/requestData.php", filter)
        .then((respons) => {
            return respons.json();
        }).then((data) => {
            callback(data);
        }).catch(() => {
            console.log('No orders!');
        })
}

//Request products from database
//-----------------------------------------------------------------------------
async function requestProduct(filter) {
    return await fetch("../php/requestData.php", filter)
        .then((respons) => {
            return respons.json();
        }).catch(() => {
            console.log('No products!');
        })

}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
if (sessionStorage.getItem("logedIn") === 'false') {
    window.location = '../html/login.php';
} else {
    let userID = JSON.parse(sessionStorage.user)[0]._id['$oid'];

    let filter = {
        method: 'POST',
        body: `operation=request_orders&id=${userID}`,
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        })
    }

    requestOrders(renderOrders, filter);
}
