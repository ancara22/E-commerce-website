
//Get Products from DB
//-----------------------------------------------------------------------------
async function requestDatabase(callback, filter = {
    method: 'POST',
    body: 'operation=request_items',
    headers: new Headers({
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    })
}) {
    await fetch("../php/requestData.php", filter).then(
        (respons) => {
            return respons.json();
        }
    ).then((data) => {
        callback(data);
    }).catch(() => {
        console.log('No result!');
    })

}

//Add product in the basket
//-----------------------------------------------------------------------------
function addTobasket() {
    let clickedId = event.target.dataset.productid;
    event.target.textContent = "✓";
    event.target.style.backgroundColor = 'rgb(88, 88, 250)';

    let basket = JSON.parse(sessionStorage.basket);   //get basket
    let exist = false;

    //Check if product exist in the basket, add +1
    for (let i = 0; i < basket.length; i++) {
        let element = basket[i];

        if (element[0] == clickedId) {
            element[1] += 1;
            exist = true;
        }
    }

    //If product doesnt exist in the basket, add a new product
    if (!exist) {
        basket.push([clickedId, 1]);
    }

    //Rewrite the basket
    sessionStorage.basket = JSON.stringify(basket);

    //Update the Basket box
    updateBasket();

}


