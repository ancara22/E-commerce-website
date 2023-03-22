<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $navBarStyle.$indexStyle;
    $scripts = $functionsScript.$navScript.$checkoutScript;

    //Page Body
    $pageBody = <<<XML
        <span id="title" class='margin-auto'>Basket</span>
        <div id="product_list" class='margin-auto'></div>
        <div id="line"></div>
        <div id="checkout_s" class='margin-auto'>
            <div id="total_s">Total: 0$</div>
            <div id="checkout_btn_page">
                <button>Checkout</button>
            </div>
        </div>
        <div id="user_box_background">
            <div id="user_box" >
            </div>
        </div>
    XML;

    //Render
    renderPage("Checkout", $links, $scripts, $pageBody);
?>

