
//Render Products
//-----------------------------------------------------------------------------
function renderProducts(productsList) {
    let productsBox = document.getElementById("products_box");
    productsBox.innerHTML = '';

    productsList.forEach(product => {
        let name = product.name.toLowerCase();
        name = name[0].toUpperCase() + name.substring(1);

        let body = `
                <div class="product">
                    <img class="product_img" src="${product.image_url}"/>
                    <div class="product_data">
                        <div class="product_name"><span>${name}</span></div>
                        <div class="product_code">${product.product_code}</div>
                        <div class="product_price">${product.price}$</div>
                        <button class="product_buy_btn"  data-productid=${product._id.valueOf().$oid} onclick='addTobasket()'>Buy</button>
                    </div>
                </div>`;
        productsBox.innerHTML += body;
    });
}

//Products sorting and rendering
//-----------------------------------------------------------------------------
function sortData() {
    requestDatabase(function (data) {
        let sortedArray = arrangeData(data);
        renderProducts(sortedArray);
    });
}

//Products sorting by selected option
//-----------------------------------------------------------------------------
function arrangeData(data) {
    let sort_input = document.getElementById('sort_input');
    let sortOption = sort_input.value;
    let sorted;

    if (sortOption == "-1") {
        sorted = data.sort((x, y) => x.price - y.price)
    } else if (sortOption == "1") {
        sorted = data.sort((y, x) => x.price - y.price)
    } else if (sortOption == "2") {
        sorted = data.sort((x, y) => x.name.toLowerCase() > y.name.toLowerCase() ? 1 : -1)
    } else if (sortOption == "-2") {
        sorted = data.sort((y, x) => x.name.toLowerCase() > y.name.toLowerCase() ? 1 : -1)
    } else {
        sorted = data;
    }

    return sorted;
}


//Calls
//-----------------------------------------------------------------------------
requestDatabase(renderProducts);

//Show search pannel
document.querySelector('.search_panel').style.display = 'flex';

