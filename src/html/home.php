<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $indexStyle.$navBarStyle;
    $scripts = $functionsScript.$homeScript.$navScript;

    //Page Body
    $pageBody = <<<XML
        <div id="advertise">
            <img src="../img/boss.jpg" alt="">
        </div>
        <div id="about">
            <h3>PRESCRIPTION GLASSES & SUNGLASSES</h3>
            <p>Working with luxury fashion brands and trusted eyewear suppliers from across the world, we stock a wide range of glasses and sunglasses styles, from timeless classics to the latest trends – so whatever you are looking for, we have it.</p>
        </div>
        <div class="line"></div>
        <div id="recomendations">
            <h3>SHOP OUR BEST SELLERS</h3>
            <div id="products_box"></div>
        </div>
    XML;

    //Render
    renderPage("Sunstop", $links, $scripts, $pageBody);
?>
