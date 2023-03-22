<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $navBarStyle.$indexStyle;
    $scripts = $functionsScript.$ordersScript.$navScript;

    //Page Body
    $pageBody = <<<XML
        <div id='orders-container'></div>
    XML;

    //Render
    renderPage("Orders", $links, $scripts, $pageBody);
?>
