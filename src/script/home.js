
//Render recommendations
//-----------------------------------------------------------------------------
function renderRecomendations(data) {
    let products_box = document.getElementById('products_box');
    let randomData = [];

    for (let i = 0; i <= 3; i++) {
        let idx = Math.floor(Math.random() * (0 - data.length + 1) + data.length);
        randomData.push(data[idx])
    }

    products_box.innerHTML = '';

    randomData.forEach(product => {
        let name = product.name.toLowerCase();
        name = name[0].toUpperCase() + name.substring(1);

        let body = `<div class="product">
                        <img class="product_img" src="${product.image_url}"/>
                        <div class="product_data">
                            <div class="product_name"><span>${name}</span></div>
                            <div class="product_code">${product.product_code}</div>
                            <div class="product_price">${product.price}$</div>
                            <button class="product_buy_btn"  data-productid=${product._id.valueOf().$oid} onclick='addTobasket()'>Buy</button>
                        </div>
                    </div>`;

        products_box.innerHTML += body;
    });
}

//Request data and render recomendations
//-----------------------------------------------------------------------------
requestDatabase(renderRecomendations);



