
//Render Products
//-----------------------------------------------------------------------------
function renderProducts(productsList) {
    let dataJson = productsList;
    let productsBox = document.getElementsByClassName("products_box")[0];
    productsBox.innerHTML = '';

    dataJson.forEach(product => {
        let name = product.name.toLowerCase();
        name = name[0].toUpperCase() + name.substring(1);

        //Product body
        let body = `
            <div class="product_o">
                <img class="product_img_o" src="${product.image_url}"/>
                <div class="product_data">
                    <div class="product_name"> 
                        <span>Name: ${name}</span>
                    </div>
                    <span class="product_code">Code: ${product.product_code}</span>
                    <div class="product_info"
                        <span class="product_price">Price: ${product.price}$</span>
                        <span class="product_stock">Stock: ${product.stock_count}</span>
                    </div>
                    <button class="product_edit_btn"  data-productid=${product._id.valueOf().$oid} onclick="editElement()">Edit</button>
                </div>
                
            </div>`;

        productsBox.innerHTML += body;    //Insert the product HTML on the page
    });
};

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

//Update
//-----------------------------------------------------------------------------
async function updateDatabase(data) {
    await fetch("../php/updateData.php", data)
        .then((respons) => {
            console.log(respons.status);
        })
}

//Edit product button function
//-----------------------------------------------------------------------------
function editElement() {
    let clickedId = event.target.dataset.productid,
        box = document.getElementById("edit_box_background"),
        img = document.getElementById("edit_box_image"),
        img_url_input = document.getElementById("edit_image"),
        name_input = document.getElementById("edit_name"),
        code_input = document.getElementById("edit_code"),
        price_input = document.getElementById("edit_price"),
        stock_input = document.getElementById("edit_stock"),
        description_input = document.getElementById("edit_description");

    img.src = "https://www.pulsar-agency.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png";
    img_url_input.value = " ";
    name_input.value = " ";
    code_input.value = " ";
    price_input.value = " ";
    stock_input.value = " ";
    description_input.value = " ";

    box.style.display = "block";
    stopScrolling();

    requestDatabase((data) => {
        let arrayData = data;

        arrayData.forEach(item => {
            if (item._id.$oid == clickedId) {

                let current_img = item.image_url,
                    current_name = item.name,
                    current_code = item.product_code,
                    current_price = item.price,
                    current_stock = item.stock_count,
                    current_description = item.details;

                img.src = current_img;
                img_url_input.value = current_img;
                name_input.value = current_name;
                code_input.value = current_code;
                price_input.value = current_price;
                stock_input.value = current_stock;
                description_input.value = current_description;

            }
        });

    });
    //Close_____________________________________________________________________
    let close_btn = document.getElementById("close_btn");

    close_btn.addEventListener("click", (ev) => {
        let box = document.getElementById("edit_box_background");
        box.style.display = "none";
        enableScrolling();
    });

    //Save______________________________________________________________________
    let save_btn = document.getElementById('save_btn');

    save_btn.addEventListener('click', () => {
        let stock_input = document.getElementById("edit_stock");

        let getImg_url_value = img_url_input.value,
            getName_value = name_input.value,
            getCode_value = code_input.value,
            getPrice_value = price_input.value,
            getStock_value = stock_input.value,
            getDescription_value = description_input.value,
            getId = clickedId;

        updateDatabase({
            method: 'POST',
            body: `operation=update_item&id=${getId}&stock_count=${getStock_value}&name=${getName_value}&price=${getPrice_value}&product_code=${getCode_value}&image_url=${getImg_url_value}&details=${getDescription_value}`,
            headers: new Headers({
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        });

        requestDatabase(renderProducts);
        box.style.display = "none";
        enableScrolling();
    })

    //___________________________________________________________________________

}


//MAIN CODE/ FUNCTIONS EXECUTION
//-----------------------------------------------------------------------------
requestDatabase(renderProducts);


///Search bar
//-----------------------------------------------------------------------------
let search_input = document.querySelector('.search_panel input');
document.querySelector('.search_panel button').disabled = true;

search_input.addEventListener('input', () => {
    let name = `name=${search_input.value}`;
    if (name == 'name=') { name = '' }

    requestDatabase(renderProducts, {
        method: 'POST',
        body: name,
        headers: new Headers({
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        })
    });


})








