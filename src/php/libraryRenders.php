<?php

    //Styles Links
    $indexStyle = '<link rel="stylesheet" href="../styles/index.css">';
    $navBarStyle = '<link rel="stylesheet" href="../styles/navBar.css">';
    $cmsStyle = '<link rel="stylesheet" href="../styles/cms.css">';

    //Scripts links
    $cmsScript = '<script src="../script/cms.js"></script>';
    $cmsLoginScript = '<script src="../script/cms-login.js"></script>';
    $checkoutScript = '<script src="../script/checkout.js"></script>';
    $homeScript = '<script src="../script/home.js"></script>';
    $navScript = '<script src="../script/navBar.js"></script>';
    $functionsScript = '<script src="../script/functions.js"></script>';
    $loginScript = '<script src="../script/login.js"></script>';
    $ordersScript = '<script src="../script/orders.js"></script>';
    $registrationScript = '<script src="../script/registration.js"></script>';
    $productsScript = '<script src="../script/products.js"></script>';


    //Render HTML open
    //@params, page title, style links
    function renderHtmlTop($title, $links) {
        $top = <<<XML
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    $links
                    <title>$title</title>
                </head>
            <body>
        XML;

        echo $top;
    }

    //Render HTML close
    //@params, script links
    function renderHtmlBottom($scripts) {
        $bottom = <<<XML
            $scripts
            </body>
            </html>
        XML;

        echo $bottom;
    }

    //Render Navigation bar
    function renderNavBar() {
        $nav = <<<XML
            <div id="navigation_bar">
            <a href="home.php"><div class="logo"></div></a>
                <div id="products_link"><a href="products.php">Products</a></div>
                <form action="" class="search_panel">
                    <input type="text" placeholder='Type'>
                    <button  type="submit">Search</button>
                </form>
                <div id="user_icon">
                    <div class="icon"></div>
                    <span>User</span>
                    <div id="drop_user">
                        <div id='login_btn_div'><a href="./login.php">Login</a></div>
                        <div id='logout_btn_div'><a href="" id='logout_btn'>Logout</a></div>
                    </div>
                </div>
                <a href="./orders.php">
                    <div id="orders_icon">
                        <div class="icon"></div>
                        <span>Orders</span>
                    </div>
                </a>
                <div id="basket_icon">
                    <a href="./checkout.php">
                        <div class="icon"></div>
                    </a>
                    <span>Basket</span>
                    <div id="drop_basket">
                        <div id="basket_title">Basket</div>
                        <div id="line"></div>
                        <div id="basket_list"></div>
                        <div id="line"></div>
                        <div id="checkout_summary">
                            <div id="total_sum">Total: 0$</div>
                            <div id="checkout_btn">
                                <a href="./checkout.php"><button>Checkout</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        XML;

        echo $nav;
    }

    //Render foorer
    function renderFooter() {
        $footer = <<<XML
            <div id="footer">
                <ul>
                    <li><a href="./home.php">Home</a></li>
                    <li><a href="./products.php">Products</a></li>
                    <li><a href="./cms.php">CMS</a></li>
                </ul>
                <ul>
                    <li><a href="./login.php">Login</a></li>
                    <li><a href="./registration.php">Registration</a></li>
                    <li><a href="./checkout.php">Basket</a></li>
                </ul>
                <ul id="copywriting">
                    <li>Copywriting 2023</li>
                </ul>
            </div>
        XML;

        echo $footer;
    }

    //Render HTML body in a container id
    //@params, html body
    function renderBody($html) {
        $body = <<<XML
            <div id="container">$html</div>
        XML;

        echo $body;
    }

    //Render full html page
    //@params, title, style links, script links, page body
    function renderPage($title, $links, $scripts, $pageBody) {
        renderHtmlTop($title, $links);
        renderNavBar();
        renderBody($pageBody);
        renderFooter();
        renderHtmlBottom($scripts);
    }

?>