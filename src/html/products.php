<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style Links
    $links = $navBarStyle.$indexStyle;
    $scripts = $functionsScript.$productsScript.$navScript;

    //Page Body
    $pageBody = <<<XML
        <h1>Products</h1>
        <div id="sort_div">
            <label for="sort">Sort:</label>   
            <select name="sort" id="sort_input" onchange="sortData()">
                <option value="no">---</option>
                <option value="-1">Price: Low - Hight</option>
                <option value="1">Price: Hight - Low</option>
                <option value="2">Name: A - Z</option>
                <option value="-2">Name: Z - A</option>
            </select>
        </div>
        <div id="products_box">
            
        </div>

    XML;
    
    //Render
    renderPage("Products", $links, $scripts, $pageBody);
?>
